/*
  Warnings:

  - A unique constraint covering the columns `[userId,status]` on the table `ItemStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ItemStatus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_statusId_fkey";

-- DropIndex
DROP INDEX "ItemStatus_status_key";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "statusId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ItemStatus" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ItemStatus_userId_status_key" ON "ItemStatus"("userId", "status");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ItemStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStatus" ADD CONSTRAINT "ItemStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
