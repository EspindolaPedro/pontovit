import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { ApiKeyCreateSchema } from "@/server/validation/common";
import { createApiKey, listApiKeys } from "@/server/modules/users/user.service";
export async function GET() { try { await requireRole("ADMIN"); return NextResponse.json({ data: await listApiKeys() }); } catch (error) { return errorResponse(error); } }
export async function POST(request: Request) { try { const user = await requireRole("ADMIN"); return NextResponse.json({ data: await createApiKey(ApiKeyCreateSchema.parse(await request.json()), user.id) }, { status: 201 }); } catch (error) { return errorResponse(error); } }
