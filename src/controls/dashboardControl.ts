import type { Request, Response } from "express";
import { getAllDonors } from "../services/dashboardService";

const handleGet = async (req: Request, res: Response) => {
  const donors = await getAllDonors();
  res.json(donors);
};
export { handleGet };
