import prisma from "../prismaClient";

interface DonorData {
  doador_nome: string;
  doador_email: string;
  doador_cpf: string;
  data_nascimento: Date;
  doador_cep: string;
  tem_carro: boolean;
}

export const registerDonor = async ({
  doador_nome,
  doador_email,
  doador_cep,
  doador_cpf,
  data_nascimento,
  tem_carro,
}: DonorData) => {
  await prisma.doador.create({
    data: {
      doador_nome: doador_nome,
      doador_cpf: doador_cpf,
      doador_email: doador_email,
      data_nascimento: data_nascimento,
      doador_cep: doador_cep,
      tem_carro: tem_carro,
    },
  });
};

export const addDoacoesbyId = async (id: string) => {};

export const putDoacoesbyId = async (id: string) => {};

export const deleteDoadorbyId = async (id: string) => {
  const toBeDeletedDonor = await prisma.doador.delete({
    where: {
      doador_id: parseInt(id),
    },
  });
  return toBeDeletedDonor;
};
