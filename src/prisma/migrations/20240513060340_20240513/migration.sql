-- DropForeignKey
ALTER TABLE `History` DROP FOREIGN KEY `History_mean_id_fkey`;

-- DropForeignKey
ALTER TABLE `Mean` DROP FOREIGN KEY `Mean_word_id_fkey`;

-- DropForeignKey
ALTER TABLE `Word` DROP FOREIGN KEY `Word_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `Word` ADD CONSTRAINT `Word_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mean` ADD CONSTRAINT `Mean_word_id_fkey` FOREIGN KEY (`word_id`) REFERENCES `Word`(`word_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_mean_id_fkey` FOREIGN KEY (`mean_id`) REFERENCES `Mean`(`mean_id`) ON DELETE CASCADE ON UPDATE CASCADE;
