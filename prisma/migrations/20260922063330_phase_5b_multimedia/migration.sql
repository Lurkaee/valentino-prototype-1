-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('PHOTO', 'AUDIO', 'VIDEO');

-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ORPHANED', 'DELETED');

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "scheduledUnlockAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "ExperienceMedia" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "mediaType" "MediaType" NOT NULL,
    "filename" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "caption" TEXT,
    "altText" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "MediaStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExperienceMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceReaction" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "reaction" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExperienceReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceReply" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "senderName" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExperienceReply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExperienceMedia_storageKey_key" ON "ExperienceMedia"("storageKey");

-- CreateIndex
CREATE INDEX "ExperienceMedia_experienceId_idx" ON "ExperienceMedia"("experienceId");

-- CreateIndex
CREATE INDEX "ExperienceMedia_storageKey_idx" ON "ExperienceMedia"("storageKey");

-- CreateIndex
CREATE INDEX "ExperienceReaction_experienceId_idx" ON "ExperienceReaction"("experienceId");

-- CreateIndex
CREATE INDEX "ExperienceReply_experienceId_idx" ON "ExperienceReply"("experienceId");

-- CreateIndex
CREATE INDEX "Experience_scheduledUnlockAt_idx" ON "Experience"("scheduledUnlockAt");

-- AddForeignKey
ALTER TABLE "ExperienceMedia" ADD CONSTRAINT "ExperienceMedia_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceReaction" ADD CONSTRAINT "ExperienceReaction_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceReply" ADD CONSTRAINT "ExperienceReply_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
