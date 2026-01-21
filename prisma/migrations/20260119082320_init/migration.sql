-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updateDate" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Hero_Section" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "CrBy" INTEGER NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL,
    "updateDate" TIMESTAMP(3),

    CONSTRAINT "Hero_Section_pkey" PRIMARY KEY ("id")
);
