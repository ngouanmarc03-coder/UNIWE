import Settings from "../models/Settings.js";

async function getOrCreateSettings() {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  return settings;
}

export async function getPublicSettings(req, res) {
  const settings = await getOrCreateSettings();
  res.json(settings);
}

export async function getSettings(req, res) {
  const settings = await getOrCreateSettings();
  res.json(settings);
}

export async function updateSettings(req, res) {
  const settings = await getOrCreateSettings();
  Object.assign(settings, req.body);
  await settings.save();
  res.json(settings);
}
