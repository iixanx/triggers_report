-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,
    `coin` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Word` (
    `word_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `word` VARCHAR(191) NOT NULL,
    `wrong_count` INTEGER NOT NULL DEFAULT 0,

    INDEX `Word_user_id_fkey`(`user_id`),
    PRIMARY KEY (`word_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mean` (
    `mean_id` INTEGER NOT NULL AUTO_INCREMENT,
    `word_id` INTEGER NOT NULL,
    `mean` VARCHAR(191) NOT NULL,

    INDEX `Mean_word_id_fkey`(`word_id`),
    PRIMARY KEY (`mean_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `History` (
    `user_id` INTEGER NOT NULL,
    `word_id` INTEGER NOT NULL,
    `mean_id` INTEGER NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,

    INDEX `History_mean_id_fkey`(`mean_id`),
    PRIMARY KEY (`user_id`, `word_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Word` ADD CONSTRAINT `Word_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mean` ADD CONSTRAINT `Mean_word_id_fkey` FOREIGN KEY (`word_id`) REFERENCES `Word`(`word_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_mean_id_fkey` FOREIGN KEY (`mean_id`) REFERENCES `Mean`(`mean_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
