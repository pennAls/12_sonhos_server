-- DropForeignKey
ALTER TABLE "doacao" DROP CONSTRAINT "doacao_doador_id_fkey";

-- AddForeignKey
ALTER TABLE "doacao" ADD CONSTRAINT "doacao_doador_id_fkey" FOREIGN KEY ("doador_id") REFERENCES "doador"("doador_id") ON DELETE CASCADE ON UPDATE CASCADE;
