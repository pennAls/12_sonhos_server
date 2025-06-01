import { Request, Response } from "express";
import {
  addDoacoesbyId,
  deleteDoacoesbyId,
  getDoacoesbyId,
  putDoacoesbyId,
} from "../services/doacoesService";

const handleGetbyId = async (req: Request, res: Response) => {
  const usuario_id = req.params.id;
  try {
    if (usuario_id) {
      const doacoes = await getDoacoesbyId(parseInt(usuario_id));
      res.json(doacoes);
    } else {
      res.json({
        message:
          "ID de usuário inválido, não foi possível puxar o histórico de doações",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(503).send(error.message);
    } else {
      res.status(503).send("Erro desconhecido");
    }
  }
};

const handlePostbyId = async (req: Request, res: Response) => {
  const usuario_id = req.params.id;
  try {
    await addDoacoesbyId(usuario_id);
  } catch (error) {
    if (error instanceof Error) {
      res.status(503).send(error.message);
    } else {
      res.status(503).send("Erro desconhecido");
    }
  }
};
const handlePutbyId = async (req: Request, res: Response) => {
  const usuario_id = req.params.id;
  try {
    await putDoacoesbyId(usuario_id);
  } catch (error) {
    if (error instanceof Error) {
      res.status(503).send(error.message);
    } else {
      res.status(503).send("Erro desconhecido");
    }
  }
};
const handleDeletebyId = async (req: Request, res: Response) => {
  const usuario_id = req.params.id;
  try {
    await deleteDoacoesbyId(usuario_id);
  } catch (error) {
    if (error instanceof Error) {
      res.status(503).send(error.message);
    } else {
      res.status(503).send("Erro desconhecido");
    }
  }
};

export { handleGetbyId, handleDeletebyId, handlePutbyId, handlePostbyId };
