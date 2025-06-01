"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGet = void 0;
const db_1 = __importDefault(require("../db"));
const handleGet = (req, res) => {
    const getAllDonors = db_1.default.prepare(`SELECT * FROM usuario WHERE cargo_id = ?`);
    const donors = getAllDonors.all(7);
    res.json(donors);
};
exports.handleGet = handleGet;
