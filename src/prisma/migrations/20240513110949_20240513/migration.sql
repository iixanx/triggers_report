/*
  Warnings:

  - The primary key for the `History` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `history_id` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `History` DROP PRIMARY KEY,
    ADD COLUMN `history_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`history_id`);
