import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient";

interface RegisterData {
  nome: string;
  cpf: string;
  email: string;
  password: string;
  data_nascimento: string;
  tem_carro: boolean;
  cep: string;
  cargo_id: number;
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
  data_nascimento,
  cargo_id,
  tem_carro,
  cep,
}: RegisterData) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await prisma.usuario.create({
    data: {
      usuario_nome: nome,
      usuario_email: email,
      usuario_cpf: cpf,
      usuario_senha: hashedPassword,
      data_nascimento: data_nascimento,
      tem_carro: tem_carro,
      usuario_cep: cep,
      cargo_id: cargo_id,
    },
  });

  const token = jwt.sign(
    { id: user.usuario_id, cargo: cargo_id, nome: nome },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

type LoginResult =
  | { success: true; token: string }
  | { success: false; reason: "USER_NOT_FOUND" | "INVALID_PASSWORD" };

export const loginUser = async ({
  email,
  password,
}: LoginData): Promise<LoginResult> => {
  const user = await prisma.usuario.findUnique({
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

  const token = jwt.sign(
    { id: user.usuario_id, cargo: user.cargo_id, nome: user.usuario_nome },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  return { success: true, token: token };
};
