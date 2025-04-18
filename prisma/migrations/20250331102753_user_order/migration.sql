-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_evtol_serialNo_fkey";

-- AlterTable
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "LoadedMedication" (
    "id" SERIAL NOT NULL,
    "loadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "medicationId" INTEGER NOT NULL,

    CONSTRAINT "LoadedMedication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MedicationToeVTOLDevice" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MedicationToeVTOLDevice_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MedicationToeVTOLDevice_B_index" ON "_MedicationToeVTOLDevice"("B");

-- AddForeignKey
ALTER TABLE "LoadedMedication" ADD CONSTRAINT "LoadedMedication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadedMedication" ADD CONSTRAINT "LoadedMedication_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicationToeVTOLDevice" ADD CONSTRAINT "_MedicationToeVTOLDevice_A_fkey" FOREIGN KEY ("A") REFERENCES "Medication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicationToeVTOLDevice" ADD CONSTRAINT "_MedicationToeVTOLDevice_B_fkey" FOREIGN KEY ("B") REFERENCES "eVTOLDevice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
