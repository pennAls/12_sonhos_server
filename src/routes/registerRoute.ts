import { Router } from "express";
import { handlePost, handleGet } from "../controls/registerControl";
const router = Router();

router.post("/register", handlePost);
router.get("/register", handleGet);

export default router;
