import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { deleteBrandLogo, updateBrandLogo } from "@/server/modules/brand/brand.service";
import { BrandLogoSchema } from "@/server/validation/common";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  try { const user = await requireRole("EDITOR"); const { id } = await context.params; return NextResponse.json({ data: await updateBrandLogo(id, BrandLogoSchema.parse(await request.json()), user.id) }); } catch (error) { return errorResponse(error); }
}

export async function DELETE(_request: Request, context: Context) {
  try { await requireRole("ADMIN"); const { id } = await context.params; await deleteBrandLogo(id); return NextResponse.json({ ok: true }); } catch (error) { return errorResponse(error); }
}
