-- CreateTable
CREATE TABLE "GoogleCalendarLink" (
    "id" TEXT NOT NULL,
    "calendarLink" TEXT NOT NULL,
    "classes" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GoogleCalendarLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoogleCalendarLink" ADD CONSTRAINT "GoogleCalendarLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
