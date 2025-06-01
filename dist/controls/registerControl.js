"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGet = exports.handlePost = void 0;
const authService_1 = require("../services/authService");
const handlePost = (req, res) => {
    const { nome, cpf, email, password } = req.body;
    try {
        const token = (0, authService_1.registerUser)({ nome, cpf, email, password });
        return res.status(201).json({ token });
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
    res.status(200).send("<h1> Rota Registro </h1>");
};
exports.handleGet = handleGet;
