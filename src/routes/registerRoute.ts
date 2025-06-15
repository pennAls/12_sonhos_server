import { Router } from "express";
import { handlePost } from "../controls/registerControl";
const router = Router();

router.post("/register", handlePost);

export default router;
