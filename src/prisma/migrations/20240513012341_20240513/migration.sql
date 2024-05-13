/*
  Warnings:

  - A unique constraint covering the columns `[user_id,word]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Word_user_id_word_key` ON `Word`(`user_id`, `word`);
