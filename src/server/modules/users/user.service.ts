import { randomBytes, createHash } from "node:crypto";
import { prisma } from "../../db/prisma";
import { AppError } from "../../http/errors";
import { hashPassword } from "../../auth/password";
import { ApiKeyCreateSchema, UserCreateSchema } from "../../validation/common";

export function listUsers() { return prisma.user.findMany({ orderBy: { createdAt: "asc" }, select: { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true } }); }
export async function createUser(input: ReturnType<typeof UserCreateSchema.parse>) { const exists = await prisma.user.findUnique({ where: { email: input.email } }); if (exists) throw new AppError("Este e-mail já está em uso.", 409, "EMAIL_ALREADY_EXISTS"); return prisma.user.create({ data: { name: input.name, email: input.email, role: input.role, passwordHash: await hashPassword(input.password) }, select: { id: true, name: true, email: true, role: true, isActive: true } }); }
export async function setUserActive(id: string, isActive: boolean) { const result = await prisma.user.updateMany({ where: { id }, data: { isActive } }); if (!result.count) throw new AppError("Usuário não encontrado.", 404, "NOT_FOUND"); }

function hashKey(value: string) { return createHash("sha256").update(`${process.env.API_KEY_PEPPER ?? "development-only-pepper"}:${value}`).digest("hex"); }
export async function createApiKey(input: ReturnType<typeof ApiKeyCreateSchema.parse>, userId: string) { const raw = `pv_${randomBytes(32).toString("base64url")}`; const record = await prisma.apiKey.create({ data: { name: input.name, keyPrefix: raw.slice(0, 11), keyHash: hashKey(raw), scopes: input.scopes, expiresAt: input.expiresAt, createdById: userId }, select: { id: true, name: true, keyPrefix: true, scopes: true, expiresAt: true, createdAt: true } }); return { ...record, key: raw }; }
export function listApiKeys() { return prisma.apiKey.findMany({ where: { revokedAt: null }, orderBy: { createdAt: "desc" }, select: { id: true, name: true, keyPrefix: true, scopes: true, expiresAt: true, lastUsedAt: true, createdAt: true } }); }
export async function revokeApiKey(id: string) { await prisma.apiKey.update({ where: { id }, data: { revokedAt: new Date() } }); }
