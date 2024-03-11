/*
  Warnings:

  - You are about to drop the column `address` on the `IpAddress` table. All the data in the column will be lost.
  - Added the required column `ip` to the `IpAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipRemote` to the `IpAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IpAddress" DROP COLUMN "address",
ADD COLUMN     "ip" TEXT NOT NULL,
ADD COLUMN     "ipRemote" TEXT NOT NULL;
