/*
  Warnings:

  - A unique constraint covering the columns `[userId,calendarLink]` on the table `GoogleCalendarLink` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GoogleCalendarLink_userId_calendarLink_key" ON "GoogleCalendarLink"("userId", "calendarLink");
