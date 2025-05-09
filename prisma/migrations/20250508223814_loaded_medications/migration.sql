/*
  Warnings:

  - You are about to drop the column `medicationId` on the `LoadedMedication` table. All the data in the column will be lost.
  - Added the required column `medicationCode` to the `LoadedMedication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LoadedMedication" DROP CONSTRAINT "LoadedMedication_medicationId_fkey";

-- AlterTable
ALTER TABLE "LoadedMedication" DROP COLUMN "medicationId",
ADD COLUMN     "medicationCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "LoadedMedication" ADD CONSTRAINT "LoadedMedication_medicationCode_fkey" FOREIGN KEY ("medicationCode") REFERENCES "Medication"("code") ON DELETE CASCADE ON UPDATE CASCADE;
