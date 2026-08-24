import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { errorResponse, AppError } from "@/server/http/errors";
import { verifyPassword } from "@/server/auth/password";
import { createSession } from "@/server/auth/session";
import { assertLoginAllowed, clearLoginFailures, registerLoginFailure } from "@/server/security/rate-limit";
import { LoginSchema } from "@/server/validation/common";

function fingerprint(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (request.headers.get("x-real-ip") || forwarded || "unknown").slice(0, 100);
}

export async function POST(request: Request) {
  const ip = fingerprint(request);
  try {
    const input = LoginSchema.parse(await request.json());
    await assertLoginAllowed(input.email, ip);
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    const valid = user?.isActive ? await verifyPassword(input.password, user.passwordHash) : false;

    if (!user || !valid) {
      await registerLoginFailure(input.email, ip);
      throw new AppError("E-mail ou senha inválidos.", 401, "INVALID_CREDENTIALS");
    }

    await clearLoginFailures(input.email, ip);
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    await createSession(user.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
