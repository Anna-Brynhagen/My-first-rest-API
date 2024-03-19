-- DropForeignKey
ALTER TABLE `Album` DROP FOREIGN KEY `Album_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Photo` DROP FOREIGN KEY `Photo_userId_fkey`;

-- AlterTable
ALTER TABLE `Album` MODIFY `userId` INTEGER UNSIGNED NULL;

-- AlterTable
ALTER TABLE `Photo` MODIFY `userId` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
