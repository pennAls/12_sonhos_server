"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(401).json({ message: "Token não fornecido" });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Token Inválido" });
            return;
        }
        const payload = decoded;
        req.usuario_id = payload.id;
        next();
    });
};
exports.default = authMiddleware;
