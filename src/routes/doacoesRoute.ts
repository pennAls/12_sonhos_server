import { Router } from "express";
import {
  handleDeletebyId,
  handleGetbyId,
  handlePost,
  handlePutbyId,
} from "../controls/doacoesControl";
import permissionMiddleware from "../middleware/permissionMiddleware";

const router = Router();

router.get("/doacoes/:id", handleGetbyId);
router.post("/doacoes/:id", handlePost);
router.put("/doacoes/:id", permissionMiddleware, handlePutbyId);
router.delete("/doacoes/:id", handleDeletebyId);
export default router;
