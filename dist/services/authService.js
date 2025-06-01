"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../prismaClient"));
const registerUser = async ({ nome, cpf, email, password, data_nascimento, cargo_id, tem_carro, cep, }) => {
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    const user = await prismaClient_1.default.usuario.create({
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
    const token = jsonwebtoken_1.default.sign({ id: user.usuario_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
};
exports.registerUser = registerUser;
const loginUser = async ({ email, password, }) => {
    const user = await prismaClient_1.default.usuario.findUnique({
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
    const passwordIsValid = bcryptjs_1.default.compareSync(password, user.usuario_senha);
    if (!passwordIsValid) {
        return { success: false, reason: "INVALID_PASSWORD" };
    }
    const token = jsonwebtoken_1.default.sign({ id: user.usuario_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return { success: true, token: token };
};
exports.loginUser = loginUser;
