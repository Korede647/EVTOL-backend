/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Medication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Medication_code_key" ON "Medication"("code");
