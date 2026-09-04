-- CreateTable
CREATE TABLE "MagnoCardSettings" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "photoData" BYTEA,
    "photoMimeType" TEXT,
    "focalPointX" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "focalPointY" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MagnoCardSettings_pkey" PRIMARY KEY ("id")
);
