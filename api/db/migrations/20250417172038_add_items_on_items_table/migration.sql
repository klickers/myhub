-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ItemType" ADD VALUE 'SKILL';
ALTER TYPE "ItemType" ADD VALUE 'CAMPAIGN';
ALTER TYPE "ItemType" ADD VALUE 'QUEST';

-- CreateTable
CREATE TABLE "ItemsOnItems" (
    "parentId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemsOnItems_pkey" PRIMARY KEY ("parentId","childId")
);

-- AddForeignKey
ALTER TABLE "ItemsOnItems" ADD CONSTRAINT "ItemsOnItems_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsOnItems" ADD CONSTRAINT "ItemsOnItems_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
