/*
  Warnings:

  - You are about to drop the `Cargo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Endereco` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Doacao" DROP CONSTRAINT "Doacao_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_endereco_id_fkey";

-- DropTable
DROP TABLE "Cargo";

-- DropTable
DROP TABLE "Doacao";

-- DropTable
DROP TABLE "Endereco";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "endereco" (
    "endereco_id" SERIAL NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" CHAR(8) NOT NULL,
    "observacao" TEXT,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("endereco_id")
);

-- CreateTable
CREATE TABLE "cargo" (
    "cargo_id" SERIAL NOT NULL,
    "cargo_nome" TEXT NOT NULL,

    CONSTRAINT "cargo_pkey" PRIMARY KEY ("cargo_id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "usuario_id" SERIAL NOT NULL,
    "usuario_nome" TEXT NOT NULL,
    "usuario_cpf" TEXT NOT NULL,
    "usuario_email" TEXT NOT NULL,
    "usuario_senha" TEXT NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    "tem_carro" BOOLEAN NOT NULL,
    "cargo_id" INTEGER NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "doacao" (
    "doacao_id" SERIAL NOT NULL,
    "data_doacao" DATE NOT NULL,
    "valor_doacao" DOUBLE PRECISION,
    "observacao" TEXT,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "doacao_pkey" PRIMARY KEY ("doacao_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_usuario_cpf_key" ON "usuario"("usuario_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_usuario_email_key" ON "usuario"("usuario_email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_endereco_id_key" ON "usuario"("endereco_id");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "endereco"("endereco_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargo"("cargo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacao" ADD CONSTRAINT "doacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;
