import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { deleteWorkScheduleLead } from "@/server/modules/work-schedule-leads/work-schedule-lead.service";

type Context = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, context: Context) {
  try {
    await requireRole("ADMIN");
    const { id } = await context.params;
    await deleteWorkScheduleLead(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
