import prisma from "../prismaClient";

export const getAllDonors = async () => {
  const allDonors = await prisma.usuario.findMany({
    where: { cargo_id: 8 },
  });

  return allDonors;
};
