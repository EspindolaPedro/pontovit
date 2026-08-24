import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { setUserActive } from "@/server/modules/users/user.service";
type Context = { params: Promise<{ id: string }> };
export async function PATCH(request: Request, context: Context) { try { await requireRole("ADMIN"); const { id } = await context.params; const body = await request.json(); await setUserActive(id, body.isActive === true); return NextResponse.json({ ok: true }); } catch (error) { return errorResponse(error); } }
