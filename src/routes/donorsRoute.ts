import { Router } from "express";
import {
  handleDeletebyId,
  handlePutbyId,
  handleRegister,
} from "../controls/donorControl";

const router = Router();

router.post("/register", handleRegister);
router.put("/edit", handlePutbyId);
router.delete("/delete/:id", handleDeletebyId);

export default router;
