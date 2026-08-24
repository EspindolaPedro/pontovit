import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { createCodeInjection, listCodeInjections } from "@/server/modules/settings/code.service";
import { CodeInjectionSchema } from "@/server/validation/common";
export async function GET() { try { await requireRole("ADMIN"); return NextResponse.json({ data: await listCodeInjections() }); } catch (error) { return errorResponse(error); } }
export async function POST(request: Request) { try { const user = await requireRole("ADMIN"); return NextResponse.json({ data: await createCodeInjection(CodeInjectionSchema.parse(await request.json()), user.id) }, { status: 201 }); } catch (error) { return errorResponse(error); } }
