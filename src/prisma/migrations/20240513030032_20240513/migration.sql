/*
  Warnings:

  - A unique constraint covering the columns `[word_id]` on the table `Mean` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Mean_word_id_key` ON `Mean`(`word_id`);
