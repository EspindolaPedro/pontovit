import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { createUser, listUsers } from "@/server/modules/users/user.service";
import { UserCreateSchema } from "@/server/validation/common";
export async function GET() { try { await requireRole("ADMIN"); return NextResponse.json({ data: await listUsers() }); } catch (error) { return errorResponse(error); } }
export async function POST(request: Request) { try { await requireRole("ADMIN"); return NextResponse.json({ data: await createUser(UserCreateSchema.parse(await request.json())) }, { status: 201 }); } catch (error) { return errorResponse(error); } }
