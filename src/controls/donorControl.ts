import { Request, Response } from "express";
import { deleteDoadorbyId, registerDonor } from "../services/donorsService";

const handleRegister = async (req: Request, res: Response) => {
  const {
    doador_nome,
    doador_email,
    doador_cpf,
    data_nascimento,
    doador_cep,
    tem_carro,
  } = req.body;
  try {
    if (req.body) {
      await registerDonor({
        doador_nome,
        data_nascimento,
        doador_cep,
        doador_cpf,
        doador_email,
        tem_carro,
      });
      res.status(201).json({ message: "Doador Cadastrado com Sucesso" });
    } else {
      res.status(400).json({
        message: "Não foi Possível Cadastrar o Doador",
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
const handlePutbyId = async (req: Request, res: Response) => {};
const handleDeletebyId = async (req: Request, res: Response) => {
  const donor_id = req.params.id;
  try {
    if (donor_id) {
      const { doador_nome } = await deleteDoadorbyId(donor_id);
      res
        .status(200)
        .json({ message: `Doador ${doador_nome} deletado com Sucesso` });
    }
  } catch (error) {
    res.status(503).json({ message: "Não foi Possível deletar o Doador" });
  }
};

export { handleDeletebyId, handlePutbyId, handleRegister };
