ALTER TABLE "WorkScheduleLead"
ADD COLUMN "segment" TEXT,
ADD COLUMN "weeklyHours" INTEGER,
ADD COLUMN "targetWeeklyHours" INTEGER,
ADD COLUMN "currentCapacity" DOUBLE PRECISION,
ADD COLUMN "simulatedCapacity" DOUBLE PRECISION,
ADD COLUMN "weeklyDifference" DOUBLE PRECISION,
ADD COLUMN "percentVariation" DOUBLE PRECISION,
ADD COLUMN "equivalentEmployees" DOUBLE PRECISION,
ADD COLUMN "equivalentEmployeesRounded" INTEGER,
ADD COLUMN "monthlyDifference" DOUBLE PRECISION,
ADD COLUMN "utmSource" TEXT,
ADD COLUMN "utmMedium" TEXT,
ADD COLUMN "utmCampaign" TEXT,
ADD COLUMN "utmTerm" TEXT,
ADD COLUMN "utmContent" TEXT,
ADD COLUMN "pageUrl" TEXT,
ADD COLUMN "referrer" TEXT;

CREATE INDEX "WorkScheduleLead_segment_idx" ON "WorkScheduleLead"("segment");
