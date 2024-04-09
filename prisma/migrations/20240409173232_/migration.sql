/*
  Warnings:

  - You are about to drop the column `timeId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `timeId` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the `time` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `scheduleId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detail` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_timeId_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_branchId_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_timeId_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "timeId",
ADD COLUMN     "scheduleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "branchId",
DROP COLUMN "date",
DROP COLUMN "timeId",
ADD COLUMN     "detail" TEXT NOT NULL;

-- DropTable
DROP TABLE "time";

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
