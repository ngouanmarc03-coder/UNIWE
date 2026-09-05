import { useEffect, useState } from "react";
import { Bell, BellRing, BellOff } from "lucide-react";
import api from "../../api/client";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export default function NotificationToggle() {
  const [status, setStatus] = useState("checking"); // checking | unsupported | denied | off | on
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    async function check() {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        setStatus("unsupported");
        return;
      }
      if (Notification.permission === "denied") {
        setStatus("denied");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      setStatus(sub ? "on" : "off");
    }
    check().catch(() => setStatus("unsupported"));
  }, []);

  async function enable() {
    setBusy(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("denied");
        return;
      }
      const { data } = await api.get("/admin/push/public-key");
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(data.publicKey),
      });
      await api.post("/admin/push/subscribe", sub.toJSON());
      setStatus("on");
    } catch {
      setStatus("off");
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    setBusy(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await api.post("/admin/push/unsubscribe", { endpoint: sub.endpoint });
        await sub.unsubscribe();
      }
      setStatus("off");
    } finally {
      setBusy(false);
    }
  }

  if (status === "unsupported") return null;

  if (status === "denied") {
    return (
      <p className="flex items-center gap-3 px-4 py-3 text-xs text-sand/40">
        <BellOff size={16} /> Notifications bloquées (réglages du navigateur)
      </p>
    );
  }

  if (status === "checking") return null;

  return (
    <button
      onClick={status === "on" ? disable : enable}
      disabled={busy}
      className="flex items-center gap-3 rounded-none px-4 py-3 text-sm text-sand/60 hover:bg-sand/10 disabled:opacity-50"
    >
      {status === "on" ? <BellRing size={18} className="text-accent-light" /> : <Bell size={18} />}
      {status === "on" ? "Notifications activées" : "Activer les notifications"}
    </button>
  );
}
