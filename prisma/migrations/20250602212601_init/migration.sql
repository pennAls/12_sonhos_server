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
    "usuario_cep" TEXT NOT NULL,
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

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargo"("cargo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacao" ADD CONSTRAINT "doacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;
