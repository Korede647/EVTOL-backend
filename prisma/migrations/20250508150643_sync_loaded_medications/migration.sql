-- DropForeignKey
ALTER TABLE "LoadedMedication" DROP CONSTRAINT "LoadedMedication_evtol_serialNo_fkey";

-- AlterTable
ALTER TABLE "LoadedMedication" ALTER COLUMN "evtol_serialNo" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "LoadedMedication" ADD CONSTRAINT "LoadedMedication_evtol_serialNo_fkey" FOREIGN KEY ("evtol_serialNo") REFERENCES "eVTOLDevice"("serialNo") ON DELETE CASCADE ON UPDATE CASCADE;
