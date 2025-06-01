import prisma from "../prismaClient";

export const getAllDonors = async () => {
  const allDonors = await prisma.usuario.findMany({
    where: {
      cargo_id: 8,
    },
    include: {
      endereco: {
        select: {
          estado: true,
          cidade: true,
          bairro: true,
          cep: true,
        },
      },
    },
    select: {
      usuario_id: true,
      usuario_nome: true,
      usuario_cpf: true,
      data_nascimento: true,
      endereco_id: true,
      usuario_email: true,
      tem_carro: true,
      cargo_id: true,
      endereco: true,
    },
  });

  return allDonors;
};
