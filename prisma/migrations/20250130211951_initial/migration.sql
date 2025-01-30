-- CreateEnum
CREATE TYPE "MODEL" AS ENUM ('LIGHTWEIGHT', 'MIDDLEWEIGHT', 'CRUISERWEIGHT', 'HEAVYWEIGHT');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING');

-- CreateTable
CREATE TABLE "eVTOLDevice" (
    "serialNo" SERIAL NOT NULL,
    "model" "MODEL" NOT NULL,
    "weightLimit" TEXT NOT NULL,
    "batteryCapacity" TEXT NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'IDLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eVTOLDevice_pkey" PRIMARY KEY ("serialNo")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Medication_id_key" ON "Medication"("id");
