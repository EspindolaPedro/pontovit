import { randomBytes, createHash } from "node:crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "../../db/prisma";
import { AppError } from "../../http/errors";
import { hashPassword } from "../../auth/password";
import { ApiKeyCreateSchema, UserCreateSchema } from "../../validation/common";

export function listUsers() { return prisma.user.findMany({ orderBy: { createdAt: "asc" }, select: { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true } }); }
export async function createUser(input: ReturnType<typeof UserCreateSchema.parse>) { const exists = await prisma.user.findUnique({ where: { email: input.email } }); if (exists) throw new AppError("Este e-mail já está em uso.", 409, "EMAIL_ALREADY_EXISTS"); return prisma.user.create({ data: { name: input.name, email: input.email, role: input.role, passwordHash: await hashPassword(input.password) }, select: { id: true, name: true, email: true, role: true, isActive: true } }); }
export async function setUserActive(id: string, isActive: boolean) { const result = await prisma.user.updateMany({ where: { id }, data: { isActive } }); if (!result.count) throw new AppError("Usuário não encontrado.", 404, "NOT_FOUND"); }

export async function setUserPassword(id: string, password: string) {
  const result = await prisma.user.updateMany({ where: { id }, data: { passwordHash: await hashPassword(password) } });
  if (!result.count) throw new AppError("Usuário não encontrado.", 404, "NOT_FOUND");
}

const ADMIN_ROLES = ["OWNER", "ADMIN"] as const;

export async function deleteUser(id: string, requestedById: string) {
  if (id === requestedById) throw new AppError("Você não pode excluir a própria conta.", 400, "CANNOT_DELETE_SELF");
  const target = await prisma.user.findUnique({ where: { id }, select: { role: true } });
  if (!target) throw new AppError("Usuário não encontrado.", 404, "NOT_FOUND");

  if ((ADMIN_ROLES as readonly string[]).includes(target.role)) {
    const remainingAdmins = await prisma.user.count({ where: { id: { not: id }, role: { in: [...ADMIN_ROLES] }, isActive: true } });
    if (remainingAdmins === 0) throw new AppError("Não é possível excluir o único administrador ativo do sistema.", 409, "LAST_ADMIN");
  }

  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
      throw new AppError("Este usuário tem posts, mídias ou outros itens vinculados e não pode ser excluído. Desative a conta para revogar o acesso sem perder o histórico.", 409, "USER_HAS_CONTENT");
    }
    throw error;
  }
}

function hashKey(value: string) { return createHash("sha256").update(`${process.env.API_KEY_PEPPER ?? "development-only-pepper"}:${value}`).digest("hex"); }
export async function createApiKey(input: ReturnType<typeof ApiKeyCreateSchema.parse>, userId: string) { const raw = `pv_${randomBytes(32).toString("base64url")}`; const record = await prisma.apiKey.create({ data: { name: input.name, keyPrefix: raw.slice(0, 11), keyHash: hashKey(raw), scopes: input.scopes, expiresAt: input.expiresAt, createdById: userId }, select: { id: true, name: true, keyPrefix: true, scopes: true, expiresAt: true, createdAt: true } }); return { ...record, key: raw }; }
export function listApiKeys() { return prisma.apiKey.findMany({ where: { revokedAt: null }, orderBy: { createdAt: "desc" }, select: { id: true, name: true, keyPrefix: true, scopes: true, expiresAt: true, lastUsedAt: true, createdAt: true } }); }
export async function revokeApiKey(id: string) { await prisma.apiKey.update({ where: { id }, data: { revokedAt: new Date() } }); }
