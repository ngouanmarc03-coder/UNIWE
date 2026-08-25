import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";

export function makePublicRouter(controller) {
  const router = Router();
  router.get("/", controller.listPublic);
  return router;
}

export function makeAdminRouter(controller) {
  const router = Router();
  router.use(requireAuth);
  router.get("/", controller.listAdmin);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.remove);
  return router;
}
