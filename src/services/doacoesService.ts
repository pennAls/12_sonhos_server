import prisma from "../prismaClient";

interface Doacao {
  valor_doacao?: number;
  data_doacao: Date;
  observacao?: string;
  doador_id: string;
}
export const getDoacoesbyId = async (id: number) => {
  const doacoes = await prisma.doacao.findMany({
    where: {
      doador_id: id,
    },
  });
  return doacoes;
};

export const addDoacoesbyId = async ({
  valor_doacao,
  data_doacao,
  observacao,
  doador_id,
}: Doacao) => {
  await prisma.doacao.create({
    data: {
      valor_doacao: valor_doacao,
      data_doacao: data_doacao,
      observacao: observacao,
      doador_id: parseInt(doador_id),
    },
  });
};

export const putDoacoesbyId = async (id: string) => {};

export const deleteDoacoesbyId = async (id: string) => {
  const tobeDeletedDoacao = await prisma.doacao.delete({
    where: {
      doacao_id: parseInt(id),
    },
  });
  return tobeDeletedDoacao;
};
