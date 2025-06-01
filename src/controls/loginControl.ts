import type { Request, Response } from "express";
import { loginUser } from "../services/authService";
const handlePost = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser({ email, password });

    if (!result.success) {
      if (result.reason === "USER_NOT_FOUND") {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
      if (result.reason === "INVALID_PASSWORD") {
        res.status(401).json({ message: "Senha inválida" });
      }
    } else {
      res.status(200).json({ token: result.token });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(503).send(error.message);
    } else {
      res.status(503).send("Erro desconhecido");
    }
  }
};

const handleGet = (req: Request, res: Response) => {
  res.status(200).send("<h1> Rota Login</h1>");
};
export { handlePost, handleGet };
