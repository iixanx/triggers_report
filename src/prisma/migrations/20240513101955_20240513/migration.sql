/*
  Warnings:

  - You are about to drop the column `count` on the `History` table. All the data in the column will be lost.
  - Added the required column `is_correct` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `History` DROP COLUMN `count`,
    ADD COLUMN `is_correct` BOOLEAN NOT NULL;
