export function makeCrud(Model, { publicFilter = {} } = {}) {
  return {
    async listPublic(req, res) {
      const items = await Model.find(publicFilter).sort({ order: 1, createdAt: -1 });
      res.json(items);
    },

    async listAdmin(req, res) {
      const items = await Model.find().sort({ order: 1, createdAt: -1 });
      res.json(items);
    },

    async create(req, res) {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    },

    async update(req, res) {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ message: "Introuvable" });
      res.json(item);
    },

    async remove(req, res) {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: "Introuvable" });
      res.json({ message: "Supprimé" });
    },
  };
}
