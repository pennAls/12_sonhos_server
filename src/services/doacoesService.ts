import prisma from "../prismaClient";

export const getDoacoesbyId = async (id: number) => {
  const doacoes = await prisma.doacao.findMany({
    where: {
      doador_id: id,
    },
  });
  return doacoes;
};

export const addDoacoesbyId = async (id: string) => {};

export const putDoacoesbyId = async (id: string) => {};

export const deleteDoacoesbyId = async (id: string) => {};
