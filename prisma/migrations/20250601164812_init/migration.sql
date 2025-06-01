-- CreateTable
CREATE TABLE "Endereco" (
    "endereco_id" SERIAL NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" CHAR(8) NOT NULL,
    "observacao" TEXT,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("endereco_id")
);

-- CreateTable
CREATE TABLE "Cargo" (
    "cargo_id" SERIAL NOT NULL,
    "cargo_nome" TEXT NOT NULL,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("cargo_id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "usuario_id" SERIAL NOT NULL,
    "usuario_nome" TEXT NOT NULL,
    "usuario_cpf" TEXT NOT NULL,
    "usuario_email" TEXT NOT NULL,
    "usuario_senha" TEXT NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    "tem_carro" BOOLEAN NOT NULL,
    "cargo_id" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "Doacao" (
    "doacao_id" SERIAL NOT NULL,
    "data_doacao" DATE NOT NULL,
    "valor_doacao" DOUBLE PRECISION,
    "observacao" TEXT,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Doacao_pkey" PRIMARY KEY ("doacao_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_cpf_key" ON "Usuario"("usuario_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_email_key" ON "Usuario"("usuario_email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_endereco_id_key" ON "Usuario"("endereco_id");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco"("endereco_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "Cargo"("cargo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;
