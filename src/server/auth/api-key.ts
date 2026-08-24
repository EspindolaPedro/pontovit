import { createHash } from "node:crypto";
import { prisma } from "../db/prisma";
import { AppError } from "../http/errors";

function hashApiKey(value: string) {
  const pepper = process.env.API_KEY_PEPPER ?? "development-only-pepper";
  return createHash("sha256").update(`${pepper}:${value}`).digest("hex");
}

export async function requireApiKey(request: Request, scope: string) {
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
    ?? request.headers.get("x-api-key");
  if (!supplied) throw new AppError("API key necessária.", 401, "UNAUTHORIZED");

  const apiKey = await prisma.apiKey.findUnique({ where: { keyHash: hashApiKey(supplied) } });
  if (!apiKey || apiKey.revokedAt || (apiKey.expiresAt && apiKey.expiresAt <= new Date())) {
    throw new AppError("API key inválida ou expirada.", 401, "UNAUTHORIZED");
  }
  if (!apiKey.scopes.includes(scope)) throw new AppError("A API key não possui esta permissão.", 403, "FORBIDDEN");

  await prisma.apiKey.update({ where: { id: apiKey.id }, data: { lastUsedAt: new Date() } });
  return apiKey;
}
