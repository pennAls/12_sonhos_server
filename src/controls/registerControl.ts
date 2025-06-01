import type { Request, Response } from "express";
import { registerUser } from "../services/authService";

const handlePost = async (req: Request, res: Response) => {
  const {
    nome,
    cpf,
    email,
    password,
    cep,
    data_nascimento,
    tem_carro,
    cargo_id,
  } = req.body;

  try {
    const token = await registerUser({
      nome,
      cpf,
      email,
      password,
      cep,
      data_nascimento,
      tem_carro,
      cargo_id,
    });
    res.status(201).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(503).send(error.message);
    } else {
      res.status(503).send("Erro desconhecido");
    }
  }
};

const handleGet = (req: Request, res: Response) => {
  res.status(200).send("<h1> Rota Registro </h1>");
};

export { handlePost, handleGet };
