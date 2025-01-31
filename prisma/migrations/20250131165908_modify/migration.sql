/*
  Warnings:

  - You are about to drop the column `batteryLog` on the `BatteryHistory` table. All the data in the column will be lost.
  - Added the required column `batteryLevel` to the `BatteryHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BatteryHistory" DROP COLUMN "batteryLog",
ADD COLUMN     "batteryLevel" DOUBLE PRECISION NOT NULL;
