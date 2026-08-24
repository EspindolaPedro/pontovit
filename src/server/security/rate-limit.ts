import { prisma } from "../db/prisma";
import { AppError } from "../http/errors";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 5 * 60 * 1000;
const BLOCK_MS = 5 * 60 * 1000;

function normalize(value: string) {
  return value.trim().toLowerCase().slice(0, 254);
}

export async function assertLoginAllowed(email: string, fingerprint: string) {
  const record = await prisma.loginAttempt.findUnique({
    where: { fingerprint_email: { fingerprint, email: normalize(email) } },
  });
  if (!record) return;

  const now = Date.now();
  if (record.blockedUntil && record.blockedUntil.getTime() > now) {
    throw new AppError("Muitas tentativas. Tente novamente em alguns minutos.", 429, "RATE_LIMITED");
  }

  if (now - record.windowStart.getTime() >= WINDOW_MS) {
    await prisma.loginAttempt.update({
      where: { id: record.id },
      data: { failedCount: 0, windowStart: new Date(), blockedUntil: null },
    });
  }
}

export async function registerLoginFailure(email: string, fingerprint: string) {
  const normalizedEmail = normalize(email);
  const existing = await prisma.loginAttempt.findUnique({
    where: { fingerprint_email: { fingerprint, email: normalizedEmail } },
  });
  const isExpired = existing && Date.now() - existing.windowStart.getTime() >= WINDOW_MS;
  const failedCount = isExpired ? 1 : (existing?.failedCount ?? 0) + 1;

  await prisma.loginAttempt.upsert({
    where: { fingerprint_email: { fingerprint, email: normalizedEmail } },
    create: {
      fingerprint,
      email: normalizedEmail,
      failedCount,
      windowStart: new Date(),
      blockedUntil: failedCount >= MAX_ATTEMPTS ? new Date(Date.now() + BLOCK_MS) : null,
    },
    update: {
      failedCount,
      windowStart: isExpired ? new Date() : undefined,
      blockedUntil: failedCount >= MAX_ATTEMPTS ? new Date(Date.now() + BLOCK_MS) : null,
    },
  });
}

export async function clearLoginFailures(email: string, fingerprint: string) {
  await prisma.loginAttempt.deleteMany({ where: { email: normalize(email), fingerprint } });
}

export async function assertPublicFormAllowed(key: string) {
  const bucket = await prisma.rateLimitBucket.findUnique({ where: { key } });
  if (!bucket) return;
  const now = Date.now();
  if (bucket.blockedUntil && bucket.blockedUntil.getTime() > now) {
    throw new AppError("Muitas solicitações. Tente novamente em alguns minutos.", 429, "RATE_LIMITED");
  }
  if (now - bucket.windowStart.getTime() >= WINDOW_MS) {
    await prisma.rateLimitBucket.update({
      where: { id: bucket.id },
      data: { count: 0, windowStart: new Date(), blockedUntil: null },
    });
  }
}

export async function registerPublicFormAttempt(key: string) {
  const existing = await prisma.rateLimitBucket.findUnique({ where: { key } });
  const isExpired = existing && Date.now() - existing.windowStart.getTime() >= WINDOW_MS;
  const count = isExpired ? 1 : (existing?.count ?? 0) + 1;
  await prisma.rateLimitBucket.upsert({
    where: { key },
    create: {
      key,
      count,
      windowStart: new Date(),
      blockedUntil: count >= MAX_ATTEMPTS ? new Date(Date.now() + BLOCK_MS) : null,
    },
    update: {
      count,
      windowStart: isExpired ? new Date() : undefined,
      blockedUntil: count >= MAX_ATTEMPTS ? new Date(Date.now() + BLOCK_MS) : null,
    },
  });
}
