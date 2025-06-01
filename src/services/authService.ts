import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient";

interface RegisterData {
  nome: string;
  cpf: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async ({
  nome,
  cpf,
  email,
  password,
}: RegisterData) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await prisma.usuario.create({
    data: {
      usuario_nome: nome,
      usuario_email: email,
      usuario_cpf: cpf,
      usuario_senha: hashedPassword,
    },
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return token;
};

type LoginResult =
  | { success: true; token: string }
  | { success: false; reason: "USER_NOT_FOUND" | "INVALID_PASSWORD" };

export const loginUser = async ({
  email,
  password,
}: LoginData): Promise<LoginResult> => {
  const user = await prisma.user.findUnique({
    where: {
      usuario_email: email,
    },
  });

  if (!user) {
    return { success: false, reason: "USER_NOT_FOUND" };
  }

  if (!user.usuario_senha || typeof user.usuario_senha !== "string") {
    return { success: false, reason: "INVALID_PASSWORD" };
  }

  const passwordIsValid = bcrypt.compareSync(password, user.usuario_senha);
  if (!passwordIsValid) {
    return { success: false, reason: "INVALID_PASSWORD" };
  }

  const token = jwt.sign({ id: user.usuario_id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return { success: true, token: token };
};
