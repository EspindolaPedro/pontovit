import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { deleteCodeInjection, updateCodeInjection } from "@/server/modules/settings/code.service";
import { CodeInjectionSchema } from "@/server/validation/common";
type Context = { params: Promise<{ id: string }> };
export async function PATCH(request: Request, context: Context) { try { await requireRole("ADMIN"); const { id } = await context.params; return NextResponse.json({ data: await updateCodeInjection(id, CodeInjectionSchema.parse(await request.json())) }); } catch (error) { return errorResponse(error); } }
export async function DELETE(_request: Request, context: Context) { try { await requireRole("ADMIN"); const { id } = await context.params; await deleteCodeInjection(id); return NextResponse.json({ ok: true }); } catch (error) { return errorResponse(error); } }
