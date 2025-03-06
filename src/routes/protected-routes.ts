import express from "express";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/get-user-data", auth, (_req, res) => {
  res.send("DEU BOM");
});

router.post("/no-auth", (_req, res) => {
  res.send("DEU BOM");
});

export default router;
