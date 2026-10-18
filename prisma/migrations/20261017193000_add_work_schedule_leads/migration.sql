CREATE TABLE "WorkScheduleLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "employees" INTEGER,
    "currentScale" TEXT,
    "operatingDays" INTEGER,
    "openingTime" TEXT,
    "closingTime" TEXT,
    "simultaneousCoverage" INTEGER,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkScheduleLead_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "WorkScheduleLead_createdAt_idx" ON "WorkScheduleLead"("createdAt");
CREATE INDEX "WorkScheduleLead_email_idx" ON "WorkScheduleLead"("email");
CREATE INDEX "WorkScheduleLead_currentScale_idx" ON "WorkScheduleLead"("currentScale");
