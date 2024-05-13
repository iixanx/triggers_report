-- CreateTable
CREATE TABLE `Wrong` (
    `user_id` INTEGER NOT NULL,
    `word_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `word_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wrong` ADD CONSTRAINT `Wrong_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wrong` ADD CONSTRAINT `Wrong_word_id_fkey` FOREIGN KEY (`word_id`) REFERENCES `Word`(`word_id`) ON DELETE CASCADE ON UPDATE CASCADE;
