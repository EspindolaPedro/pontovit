import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { createBrandLogo, listAdminBrandLogos } from "@/server/modules/brand/brand.service";
import { BrandLogoSchema } from "@/server/validation/common";

export async function GET() {
  try { await requireRole("AUTHOR"); return NextResponse.json({ data: await listAdminBrandLogos() }); } catch (error) { return errorResponse(error); }
}

export async function POST(request: Request) {
  try { const user = await requireRole("EDITOR"); return NextResponse.json({ data: await createBrandLogo(BrandLogoSchema.parse(await request.json()), user.id) }, { status: 201 }); } catch (error) { return errorResponse(error); }
}
