/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Estacionamento` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Estacionamento" DROP CONSTRAINT "Estacionamento_clienteId_fkey";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Estacionamento" DROP COLUMN "createdAt";

-- AddForeignKey
ALTER TABLE "Estacionamento" ADD CONSTRAINT "Estacionamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
