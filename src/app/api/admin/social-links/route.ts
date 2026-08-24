import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { createSocialLink, deleteSocialLink, getSocialLinks } from "@/server/modules/settings/settings.service";
import { SocialLinkSchema } from "@/server/validation/common";

export async function GET() { try { await requireRole("AUTHOR"); return NextResponse.json({ data: await getSocialLinks() }); } catch (error) { return errorResponse(error); } }
export async function POST(request: Request) { try { await requireRole("ADMIN"); return NextResponse.json({ data: await createSocialLink(SocialLinkSchema.parse(await request.json())) }, { status: 201 }); } catch (error) { return errorResponse(error); } }
export async function DELETE(request: Request) { try { await requireRole("ADMIN"); const id = new URL(request.url).searchParams.get("id"); if (!id) return NextResponse.json({ error: "VALIDATION_ERROR", message: "id é obrigatório." }, { status: 422 }); await deleteSocialLink(id); return NextResponse.json({ ok: true }); } catch (error) { return errorResponse(error); } }
