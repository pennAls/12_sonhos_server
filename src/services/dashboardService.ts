import prisma from "../prismaClient";

export const getAllDonors = async () => {
  const allDonors = await prisma.doador.findMany({});

  return allDonors;
};
