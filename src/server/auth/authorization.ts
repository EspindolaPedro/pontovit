import { UserRole } from "@prisma/client";
import { requireUser } from "./session";
import { AppError } from "../http/errors";

const roleWeight: Record<UserRole, number> = {
  AUTHOR: 1,
  EDITOR: 2,
  ADMIN: 3,
  OWNER: 4,
};

export async function requireRole(minimum: UserRole) {
  const user = await requireUser();
  if (roleWeight[user.role] < roleWeight[minimum]) {
    throw new AppError("Você não possui permissão para esta ação.", 403, "FORBIDDEN");
  }
  return user;
}

export function canManageSettings(role: UserRole) {
  return role === "OWNER" || role === "ADMIN";
}
