-- CreateEnum
CREATE TYPE "ExperienceStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'DISABLED', 'DELETED');

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "editCredentialHash" TEXT NOT NULL,
    "editCredentialVersion" INTEGER NOT NULL DEFAULT 1,
    "editCredentialIssuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "templateId" TEXT NOT NULL,
    "templateVersion" TEXT NOT NULL,
    "draftConfig" TEXT NOT NULL,
    "draftRevision" INTEGER NOT NULL DEFAULT 1,
    "publishedConfig" TEXT,
    "publishedRevision" INTEGER,
    "publishedAt" TIMESTAMP(3),
    "status" "ExperienceStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Experience_publicId_key" ON "Experience"("publicId");

-- CreateIndex
CREATE INDEX "Experience_publicId_idx" ON "Experience"("publicId");

-- CreateIndex
CREATE INDEX "Experience_status_idx" ON "Experience"("status");
