/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Medication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BatteryHistory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "updatedAt";
