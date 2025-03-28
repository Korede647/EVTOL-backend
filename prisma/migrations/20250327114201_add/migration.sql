-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'No Description';

-- AlterTable
ALTER TABLE "eVTOLDevice" ADD COLUMN     "destination" TEXT NOT NULL DEFAULT 'No Destination',
ADD COLUMN     "distanceTravelled" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
