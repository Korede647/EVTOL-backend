/*
  Warnings:

  - You are about to drop the column `evtolId` on the `EvtolRequest` table. All the data in the column will be lost.
  - Added the required column `evtolSerialNo` to the `EvtolRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EvtolRequest" DROP CONSTRAINT "EvtolRequest_evtolId_fkey";

-- AlterTable
ALTER TABLE "EvtolRequest" DROP COLUMN "evtolId",
ADD COLUMN     "evtolSerialNo" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EvtolRequest" ADD CONSTRAINT "EvtolRequest_evtolSerialNo_fkey" FOREIGN KEY ("evtolSerialNo") REFERENCES "eVTOLDevice"("serialNo") ON DELETE CASCADE ON UPDATE CASCADE;
