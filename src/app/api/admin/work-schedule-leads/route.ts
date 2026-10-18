import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { listWorkScheduleLeads } from "@/server/modules/work-schedule-leads/work-schedule-lead.service";

function positiveInteger(value: string | null, fallback: number, max: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, max) : fallback;
}

export async function GET(request: Request) {
  try {
    await requireRole("AUTHOR");
    const url = new URL(request.url);
    const result = await listWorkScheduleLeads({
      page: positiveInteger(url.searchParams.get("page"), 1, 100000),
      pageSize: positiveInteger(url.searchParams.get("pageSize"), 25, 500),
      query: url.searchParams.get("q")?.trim().slice(0, 120) || undefined,
      scale: url.searchParams.get("scale")?.trim().slice(0, 30) || undefined,
    });
    return NextResponse.json(result);
  } catch (error) {
    return errorResponse(error);
  }
}
