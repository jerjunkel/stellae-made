import { Router } from "express";
import controller from "../controllers/index.js";

const router = new Router();
router.get("/search", controller.findImageByQuery);

export default router;
