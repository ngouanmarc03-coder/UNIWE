import PushSubscription from "../models/PushSubscription.js";

export function getPublicKey(req, res) {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY || "" });
}

export async function subscribe(req, res) {
  const { endpoint, keys } = req.body;
  if (!endpoint || !keys?.p256dh || !keys?.auth) {
    return res.status(400).json({ message: "Abonnement invalide" });
  }

  await PushSubscription.findOneAndUpdate(
    { endpoint },
    { endpoint, keys },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(201).json({ message: "Abonné" });
}

export async function unsubscribe(req, res) {
  const { endpoint } = req.body;
  if (endpoint) {
    await PushSubscription.deleteOne({ endpoint });
  }
  res.json({ message: "Désabonné" });
}
