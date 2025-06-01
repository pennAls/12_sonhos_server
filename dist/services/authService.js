"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const registerUser = ({ nome, cpf, email, password }) => {
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    const insertUser = db_1.default.prepare(`INSERT INTO usuario (usuario_nome, usuario_cpf, usuario_email, usuario_senha) VALUES (?, ?, ?, ?)`);
    const result = insertUser.run(nome, cpf, email, hashedPassword);
    const token = jsonwebtoken_1.default.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
};
exports.registerUser = registerUser;
const loginUser = ({ email, password }) => {
    const getUser = db_1.default.prepare(`SELECT * FROM usuario WHERE usuario_email = ?`);
    const user = getUser.get(email);
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
