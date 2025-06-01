import { Router } from "express";
import { handleGet } from "../controls/dashboardControl";
const router = Router();

router.get("", handleGet);

export default router;
