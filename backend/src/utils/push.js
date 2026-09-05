import webpush from "web-push";
import PushSubscription from "../models/PushSubscription.js";

let configured = false;

function configure() {
  if (configured) return;
  if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(
      process.env.VAPID_SUBJECT || "mailto:admin@example.com",
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
    configured = true;
  }
}

export async function notifyAdmins({ title, body }) {
  configure();
  if (!configured) return;

  const subscriptions = await PushSubscription.find();
  const payload = JSON.stringify({ title, body });

  await Promise.all(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: sub.keys },
          payload
        );
      } catch (err) {
        // Abonnement expiré ou invalide : on le retire silencieusement.
        if (err.statusCode === 404 || err.statusCode === 410) {
          await PushSubscription.deleteOne({ _id: sub._id });
        }
      }
    })
  );
}
