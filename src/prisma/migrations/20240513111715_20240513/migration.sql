-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_word_id_fkey` FOREIGN KEY (`word_id`) REFERENCES `Word`(`word_id`) ON DELETE CASCADE ON UPDATE CASCADE;
