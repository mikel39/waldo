/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ImageId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "ImageId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_uuid_key" ON "Game"("uuid");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_ImageId_fkey" FOREIGN KEY ("ImageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
