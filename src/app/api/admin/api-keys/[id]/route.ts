import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { revokeApiKey } from "@/server/modules/users/user.service";
type Context = { params: Promise<{ id: string }> };
export async function DELETE(_request: Request, context: Context) { try { await requireRole("ADMIN"); const { id } = await context.params; await revokeApiKey(id); return NextResponse.json({ ok: true }); } catch (error) { return errorResponse(error); } }
