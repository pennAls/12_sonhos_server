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
    INSERT INTO endereco (estado, cidade, bairro, cep, observacao)
VALUES ('SP', 'São Paulo', 'Vila Mariana', '04002000', 'Próximo ao metrô Ana Rosa');
`);
db.exec(`
    CREATE TABLE cargo (
        cargo_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_cargo TEXT NOT NULL
    );
`);
db.exec(`
   CREATE TABLE doacao (
    doacao_id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    data_doacao DATE,
    valor_doacao INTEGER ,
    observacao TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id)
);
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
db.exec(`
    INSERT INTO cargo (nome_cargo) VALUES 
        ('Suporte'),
        ('Presidente'),
        ('Vice-presidente'),
        ('Tesoureira'),
        ('Primeiro Secretário'),
        ('Organizador'),
        ('Colaborador'),
        ('Doador');         
     `);
db.exec(`
    INSERT INTO usuario (
        usuario_nome,
        usuario_cpf,
        data_nascimento,
        endereco_id,
        usuario_email,
        tem_carro,
        cargo_id,
        usuario_senha
)
    VALUES
(
    'Suporte',
    '12345678901',
    '1990-01-01',
    NULL,
    'suporte@gmail.com',
    0,
    7,
    '123'
),
(
    'Maria Oliveira',
    '23456789012',
    '1985-05-12',
    1,
    'maria@example.com',
    1,
    8,
    'senha_hash2'
),
(
    'Carlos Souza',
    '34567890123',
    '1992-09-30',
    1,
    'carlos@example.com',
    0,
    8,
    'senha_hash3'
);
`);
db.exec(`
    INSERT INTO doacao (usuario_id, data_doacao, valor_doacao, observacao)
VALUES (2, '2025-05-30', 100, 'Doação mensal');
`);
db.exec(`
    INSERT INTO doacao (usuario_id, data_doacao, valor_doacao, observacao)
VALUES (2, '2025-06-30', 100, 'Saco de Arroz');
`);
db.exec(`
    INSERT INTO doacao (usuario_id, data_doacao, valor_doacao, observacao)
VALUES (3, '2025-07-30', 100, 'Doação mensal');
`);
exports.default = db;
