import { Router } from "express";
import {
  handleDeletebyId,
  handleGetbyId,
  handlePostbyId,
  handlePutbyId,
} from "../controls/doacoesControl";
import permissionMiddleware from "../middleware/permissionMiddleware";

const router = Router();

router.get("/doacoes/:id", handleGetbyId);
router.post("/doacoes/:id", permissionMiddleware, handlePostbyId);
router.put("/doacoes/:id", permissionMiddleware, handlePutbyId);
router.delete("/doacoes/:id", permissionMiddleware, handleDeletebyId);
export default router;
