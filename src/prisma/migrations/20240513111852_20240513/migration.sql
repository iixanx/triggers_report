/*
  Warnings:

  - You are about to drop the column `createdAt` on the `History` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `History` DROP COLUMN `createdAt`,
    ADD COLUMN `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
