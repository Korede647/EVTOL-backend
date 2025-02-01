/*
  Warnings:

  - Made the column `image` on table `Medication` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Medication" ALTER COLUMN "image" SET NOT NULL;
