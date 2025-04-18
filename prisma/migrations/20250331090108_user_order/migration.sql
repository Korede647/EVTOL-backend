-- AlterTable
ALTER TABLE "User" ADD COLUMN     "evtolSerialNo" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_evtolSerialNo_fkey" FOREIGN KEY ("evtolSerialNo") REFERENCES "eVTOLDevice"("serialNo") ON DELETE CASCADE ON UPDATE CASCADE;
