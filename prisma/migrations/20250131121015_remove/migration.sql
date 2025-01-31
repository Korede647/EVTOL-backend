/*
  Warnings:

  - Made the column `weightLimit` on table `eVTOLDevice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `batteryCapacity` on table `eVTOLDevice` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "eVTOLDevice" ALTER COLUMN "weightLimit" SET NOT NULL,
ALTER COLUMN "batteryCapacity" SET NOT NULL;
