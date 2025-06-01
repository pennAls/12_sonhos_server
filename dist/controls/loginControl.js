"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGet = exports.handlePost = void 0;
const authService_1 = require("../services/authService");
const handlePost = (req, res) => {
    const { email, password } = req.body;
    try {
        const result = (0, authService_1.loginUser)({ email, password });
        if (!result.success) {
            if (result.reason === "USER_NOT_FOUND") {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            if (result.reason === "INVALID_PASSWORD") {
                return res.status(401).json({ message: "Senha inválida" });
            }
        }
        else {
            return res.status(200).json({ token: result.token });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(503).send(error.message);
        }
        else {
            return res.status(503).send("Erro desconhecido");
        }
    }
};
exports.handlePost = handlePost;
const handleGet = (req, res) => {
    res.status(200).send("<h1> Rota Login</h1>");
};
exports.handleGet = handleGet;
