/*
  Warnings:

  - You are about to drop the column `status` on the `EvtolRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `eVTOLDevice` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "EvtolRequest" DROP COLUMN "status",
ADD COLUMN     "requestStatus" "EvtolRequestStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "eVTOLDevice_id_key" ON "eVTOLDevice"("id");
