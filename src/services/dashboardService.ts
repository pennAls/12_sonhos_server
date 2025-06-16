import prisma from "../prismaClient";

export const getAllDonors = async () => {
<<<<<<< Updated upstream
  const allDonors = await prisma.doador.findMany({});
=======
  const allDonors = await prisma.usuario.findMany({
    where: { cargo_id: 7 },
  });
>>>>>>> Stashed changes

  return allDonors;
};
