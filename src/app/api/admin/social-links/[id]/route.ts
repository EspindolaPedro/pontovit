import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { updateSocialLink } from "@/server/modules/settings/settings.service";
import { SocialLinkSchema } from "@/server/validation/common";
type Context = { params: Promise<{ id: string }> };
export async function PATCH(request: Request, context: Context) { try { await requireRole("ADMIN"); const { id } = await context.params; return NextResponse.json({ data: await updateSocialLink(id, SocialLinkSchema.parse(await request.json())) }); } catch (error) { return errorResponse(error); } }
