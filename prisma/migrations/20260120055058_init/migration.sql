/*
  Warnings:

  - Added the required column `isActive` to the `Design` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Design" ADD COLUMN     "isActive" BOOLEAN NOT NULL;
