import { Router } from "express";
import { handleGet, handlePost } from "../controls/loginControl";
const router = Router();

router.post("/login", handlePost);
router.get("/login", handleGet);

export default router;
