import { CodeInjectionLocation } from "@prisma/client";
import { prisma } from "../../db/prisma";
import { AppError } from "../../http/errors";
import { CodeInjectionSchema } from "../../validation/common";

export type CodeInput = ReturnType<typeof CodeInjectionSchema.parse>;
export function listCodeInjections() { return prisma.codeInjection.findMany({ orderBy: { updatedAt: "desc" } }); }
export function getEnabledCodeInjections(location: CodeInjectionLocation) { return prisma.codeInjection.findMany({ where: { location, isEnabled: true }, orderBy: { updatedAt: "asc" } }); }
export async function getPublicCodeInjections(location: CodeInjectionLocation) { try { return await getEnabledCodeInjections(location); } catch { return []; } }
export function createCodeInjection(input: CodeInput, userId: string) { return prisma.codeInjection.create({ data: { ...input, createdById: userId } }); }
export async function updateCodeInjection(id: string, input: CodeInput) { const exists = await prisma.codeInjection.findUnique({ where: { id } }); if (!exists) throw new AppError("Código não encontrado.", 404, "NOT_FOUND"); return prisma.codeInjection.update({ where: { id }, data: input }); }
export async function deleteCodeInjection(id: string) { await prisma.codeInjection.delete({ where: { id } }); }
