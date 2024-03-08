/*
  Warnings:

  - Added the required column `collegeYear` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fName` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lName` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `membershipType` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shirtSize` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "collegeYear" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fName" TEXT NOT NULL,
ADD COLUMN     "lName" TEXT NOT NULL,
ADD COLUMN     "major" TEXT NOT NULL,
ADD COLUMN     "membershipType" TEXT NOT NULL,
ADD COLUMN     "shirtSize" TEXT NOT NULL;
