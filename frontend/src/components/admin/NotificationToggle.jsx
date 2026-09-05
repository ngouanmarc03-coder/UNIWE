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
  const [error, setError] = useState("");

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
    check().catch((err) => {
      setStatus("off");
      setError(err?.message || "Erreur inconnue au chargement");
    });
  }, []);

  async function enable() {
    setBusy(true);
    setError("");
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("denied");
        return;
      }
      const { data } = await api.get("/admin/push/public-key");
      if (!data.publicKey) {
        throw new Error("Clé VAPID absente côté serveur (variables Railway manquantes ?)");
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(data.publicKey),
      });
      await api.post("/admin/push/subscribe", sub.toJSON());
      setStatus("on");
    } catch (err) {
      setStatus("off");
      setError(err?.response?.data?.message || err?.message || "Échec de l'activation");
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    setBusy(true);
    setError("");
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await api.post("/admin/push/unsubscribe", { endpoint: sub.endpoint });
        await sub.unsubscribe();
      }
      setStatus("off");
    } catch (err) {
      setError(err?.message || "Échec de la désactivation");
    } finally {
      setBusy(false);
    }
  }

  if (status === "unsupported") {
    return (
      <p className="flex items-center gap-3 px-4 py-3 text-xs text-sand/40">
        <BellOff size={16} /> Notifications non supportées sur ce navigateur
      </p>
    );
  }

  if (status === "denied") {
    return (
      <p className="flex items-center gap-3 px-4 py-3 text-xs text-sand/40">
        <BellOff size={16} /> Notifications bloquées (réglages du navigateur)
      </p>
    );
  }

  if (status === "checking") {
    return (
      <p className="flex items-center gap-3 px-4 py-3 text-xs text-sand/30">
        <Bell size={16} /> Vérification...
      </p>
    );
  }

  return (
    <div>
      <button
        onClick={status === "on" ? disable : enable}
        disabled={busy}
        className="flex items-center gap-3 rounded-none px-4 py-3 text-sm text-sand/60 hover:bg-sand/10 disabled:opacity-50 w-full text-left"
      >
        {status === "on" ? <BellRing size={18} className="text-accent-light" /> : <Bell size={18} />}
        {busy ? "Chargement..." : status === "on" ? "Notifications activées" : "Activer les notifications"}
      </button>
      {error && <p className="px-4 pb-2 text-xs text-red-400 break-words">{error}</p>}
    </div>
  );
}
