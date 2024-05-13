/*
  Warnings:

  - You are about to drop the column `createdat` on the `History` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `History` DROP COLUMN `createdat`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
