/*
  Warnings:

  - You are about to drop the `_UserToeVTOLDevice` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EvtolRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'DECLINED');

-- DropForeignKey
ALTER TABLE "_UserToeVTOLDevice" DROP CONSTRAINT "_UserToeVTOLDevice_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToeVTOLDevice" DROP CONSTRAINT "_UserToeVTOLDevice_B_fkey";

-- DropTable
DROP TABLE "_UserToeVTOLDevice";

-- CreateTable
CREATE TABLE "EvtolRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "evtolId" INTEGER NOT NULL,
    "status" "EvtolRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvtolRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EvtolRequest" ADD CONSTRAINT "EvtolRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvtolRequest" ADD CONSTRAINT "EvtolRequest_evtolId_fkey" FOREIGN KEY ("evtolId") REFERENCES "eVTOLDevice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
