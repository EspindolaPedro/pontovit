import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { getCtaSettings, getSiteSettings, getSocialLinks, saveCtaSettings, saveSiteSettings } from "@/server/modules/settings/settings.service";
import { CtaSettingsSchema, SiteSettingsSchema } from "@/server/validation/common";

export async function GET() { try { await requireRole("AUTHOR"); return NextResponse.json({ site: await getSiteSettings(), cta: await getCtaSettings(), socials: await getSocialLinks() }); } catch (error) { return errorResponse(error); } }

export async function PATCH(request: Request) {
  try { await requireRole("ADMIN"); const body = await request.json(); const site = body.site ? await saveSiteSettings(SiteSettingsSchema.parse(body.site)) : undefined; const cta = body.cta ? await saveCtaSettings(CtaSettingsSchema.parse(body.cta)) : undefined; return NextResponse.json({ site, cta }); } catch (error) { return errorResponse(error); }
}
