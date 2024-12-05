/*
  Warnings:

  - A unique constraint covering the columns `[clienteId]` on the table `Estacionamento` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Estacionamento" DROP CONSTRAINT "Estacionamento_clienteId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Estacionamento_clienteId_key" ON "Estacionamento"("clienteId");

-- AddForeignKey
ALTER TABLE "Estacionamento" ADD CONSTRAINT "Estacionamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
