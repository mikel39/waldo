/*
  Warnings:

  - Added the required column `height` to the `Char` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Char` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x` to the `Char` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `Char` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Char" ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL,
ADD COLUMN     "x" INTEGER NOT NULL,
ADD COLUMN     "y" INTEGER NOT NULL;
