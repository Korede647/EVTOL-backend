/*
  Warnings:

  - Added the required column `evtol_serialNo` to the `LoadedMedication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoadedMedication" ADD COLUMN     "evtol_serialNo" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LoadedMedication" ADD CONSTRAINT "LoadedMedication_evtol_serialNo_fkey" FOREIGN KEY ("evtol_serialNo") REFERENCES "eVTOLDevice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
