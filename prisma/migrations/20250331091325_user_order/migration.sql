/*
  Warnings:

  - You are about to drop the column `resetPasswordToken` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_evtolSerialNo_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetPasswordToken";

-- CreateTable
CREATE TABLE "_UserToeVTOLDevice" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserToeVTOLDevice_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserToeVTOLDevice_B_index" ON "_UserToeVTOLDevice"("B");

-- AddForeignKey
ALTER TABLE "_UserToeVTOLDevice" ADD CONSTRAINT "_UserToeVTOLDevice_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToeVTOLDevice" ADD CONSTRAINT "_UserToeVTOLDevice_B_fkey" FOREIGN KEY ("B") REFERENCES "eVTOLDevice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
