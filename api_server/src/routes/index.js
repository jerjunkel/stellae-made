import { Router } from "express";

const router = new Router();

router.get("/search", (req, res) => {
  res.send("Hello from search route");
});

export default router;
