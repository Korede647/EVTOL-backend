/*
  Warnings:

  - A unique constraint covering the columns `[serialNo]` on the table `eVTOLDevice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `evtol_serialNo` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "evtol_serialNo" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BatteryHistory" (
    "id" SERIAL NOT NULL,
    "evtol_serialNo" TEXT NOT NULL,
    "batteryLog" TEXT NOT NULL,

    CONSTRAINT "BatteryHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "eVTOLDevice_serialNo_key" ON "eVTOLDevice"("serialNo");

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_evtol_serialNo_fkey" FOREIGN KEY ("evtol_serialNo") REFERENCES "eVTOLDevice"("serialNo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatteryHistory" ADD CONSTRAINT "BatteryHistory_evtol_serialNo_fkey" FOREIGN KEY ("evtol_serialNo") REFERENCES "eVTOLDevice"("serialNo") ON DELETE CASCADE ON UPDATE CASCADE;
