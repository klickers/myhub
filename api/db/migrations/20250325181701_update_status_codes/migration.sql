/*
  Warnings:

  - You are about to drop the column `status` on the `ItemStatus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `ItemStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `ItemStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ItemStatus` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusCode" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED');

-- DropIndex
DROP INDEX "ItemStatus_userId_status_key";

-- AlterTable
ALTER TABLE "ItemStatus" DROP COLUMN "status",
ADD COLUMN     "code" "StatusCode" NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ItemStatus_userId_name_key" ON "ItemStatus"("userId", "name");
