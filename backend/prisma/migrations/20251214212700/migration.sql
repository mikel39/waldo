/*
  Warnings:

  - You are about to drop the column `ImageId` on the `Game` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_ImageId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "ImageId",
ADD COLUMN     "imageId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
