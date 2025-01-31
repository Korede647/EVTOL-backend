/*
  Warnings:

  - The primary key for the `eVTOLDevice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `weightLimit` column on the `eVTOLDevice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `batteryCapacity` column on the `eVTOLDevice` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "eVTOLDevice" DROP CONSTRAINT "eVTOLDevice_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "serialNo" DROP DEFAULT,
ALTER COLUMN "serialNo" SET DATA TYPE TEXT,
DROP COLUMN "weightLimit",
ADD COLUMN     "weightLimit" DOUBLE PRECISION DEFAULT 500.0,
DROP COLUMN "batteryCapacity",
ADD COLUMN     "batteryCapacity" DOUBLE PRECISION DEFAULT 100.0,
ADD CONSTRAINT "eVTOLDevice_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "eVTOLDevice_serialNo_seq";
