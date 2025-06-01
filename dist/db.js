"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_sqlite_1 = require("node:sqlite");
const db = new node_sqlite_1.DatabaseSync(":memory:");
//Execute SQL statements from strigns
db.exec(`PRAGMA foreign_keys = ON;`);
db.exec(`
    CREATE TABLE endereco (
        endereco_id INTEGER PRIMARY KEY AUTOINCREMENT,
        estado TEXT NOT NULL,
        cidade TEXT NOT NULL,
        bairro TEXT NOT NULL,
        cep CHAR(8) NOT NULL,
        observacao TEXT
    );
`);
db.exec(`
    CREATE TABLE cargo (
        cargo_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_cargo TEXT NOT NULL
    );
`);
db.exec(`
     INSERT INTO cargo (nome_cargo) VALUES 
        ('Presidente'),
         ('Vice-presidente'),
         ('Tesoureira'),
         ('Primeiro Secretário'),
         ('Organizador'),
         ('Colaborador'),
         ('Doador');

`);
db.exec(`
    CREATE TABLE usuario (
        usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_nome TEXT NOT NULL,
        usuario_cpf CHAR(11) NOT NULL,
        data_nascimento DATE,
        endereco_id INTEGER,
        usuario_email TEXT UNIQUE NOT NULL,
        tem_carro BOOLEAN DEFAULT 0,
        cargo_id INTEGER,
        usuario_senha TEXT NOT NULL,
        FOREIGN KEY (endereco_id) REFERENCES endereco(endereco_id),
        FOREIGN KEY (cargo_id) REFERENCES cargo(cargo_id)
    );
`);
db.exec(`INSERT INTO usuario (
    usuario_nome,
    usuario_cpf,
    data_nascimento,
    endereco_id,
    usuario_email,
    tem_carro,
    cargo_id,
    usuario_senha
) VALUES
(
    'João Silva',
    '12345678901',
    '1990-01-01',
    NULL,
    'joao@example.com',
    0,
    7,
    'senha_hash1'
),
(
    'Maria Oliveira',
    '23456789012',
    '1985-05-12',
    NULL,
    'maria@example.com',
    1,
    7,
    'senha_hash2'
),
(
    'Carlos Souza',
    '34567890123',
    '1992-09-30',
    NULL,
    'carlos@example.com',
    0,
    7,
    'senha_hash3'
);
`);
exports.default = db;
