/*
  Warnings:

  - You are about to drop the column `is_correct` on the `History` table. All the data in the column will be lost.
  - Added the required column `has_correct` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `History` DROP COLUMN `is_correct`,
    ADD COLUMN `has_correct` BOOLEAN NOT NULL;
