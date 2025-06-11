/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `doacao` table. All the data in the column will be lost.
  - Added the required column `doador_id` to the `doacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "doacao" DROP CONSTRAINT "doacao_usuario_id_fkey";

-- AlterTable
ALTER TABLE "doacao" DROP COLUMN "usuario_id",
ADD COLUMN     "doador_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "doador" (
    "doador_id" SERIAL NOT NULL,
    "doador_nome" TEXT NOT NULL,
    "doador_cpf" TEXT NOT NULL,
    "doador_email" TEXT NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "doador_cep" TEXT NOT NULL,
    "tem_carro" BOOLEAN NOT NULL,

    CONSTRAINT "doador_pkey" PRIMARY KEY ("doador_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doador_doador_cpf_key" ON "doador"("doador_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "doador_doador_email_key" ON "doador"("doador_email");

-- AddForeignKey
ALTER TABLE "doacao" ADD CONSTRAINT "doacao_doador_id_fkey" FOREIGN KEY ("doador_id") REFERENCES "doador"("doador_id") ON DELETE RESTRICT ON UPDATE CASCADE;
