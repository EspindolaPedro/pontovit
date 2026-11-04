import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { deleteUser, setUserActive, setUserPassword } from "@/server/modules/users/user.service";
import { UserPasswordUpdateSchema } from "@/server/validation/common";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  try {
    await requireRole("ADMIN");
    const { id } = await context.params;
    const body = await request.json();
    if (typeof body.password === "string") await setUserPassword(id, UserPasswordUpdateSchema.parse({ password: body.password }).password);
    if (typeof body.isActive === "boolean") await setUserActive(id, body.isActive);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    const currentUser = await requireRole("ADMIN");
    const { id } = await context.params;
    await deleteUser(id, currentUser.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
