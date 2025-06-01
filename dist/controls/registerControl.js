"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGet = exports.handlePost = void 0;
const authService_1 = require("../services/authService");
const handlePost = async (req, res) => {
    const { nome, cpf, email, password, cep, data_nascimento, tem_carro, cargo_id, } = req.body;
    try {
        const token = await (0, authService_1.registerUser)({
            nome,
            cpf,
            email,
            password,
            cep,
            data_nascimento,
            tem_carro,
            cargo_id,
        });
        res.status(201).json({ token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(503).send(error.message);
        }
        else {
            res.status(503).send("Erro desconhecido");
        }
    }
};
exports.handlePost = handlePost;
const handleGet = (req, res) => {
    res.status(200).send("<h1> Rota Registro </h1>");
};
exports.handleGet = handleGet;
