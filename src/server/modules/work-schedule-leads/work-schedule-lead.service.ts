import { prisma } from "@/server/db/prisma";
import { calculateWorkScheduleImpact, type WorkScheduleSimulationInput } from "@/lib/work-schedule-simulation";

export type WorkScheduleLeadInput = {
  name: string;
  email: string;
  phone: string;
  trigger: string;
  simulation?: WorkScheduleSimulationInput;
  attribution?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    pageUrl?: string;
    referrer?: string;
  };
};

export function createWorkScheduleLead(input: WorkScheduleLeadInput, userAgent?: string) {
  const result = input.simulation ? calculateWorkScheduleImpact(input.simulation) : null;
  return prisma.workScheduleLead.create({
    data: {
      name: input.name,
      email: input.email.toLowerCase(),
      phone: input.phone,
      trigger: input.trigger,
      employees: input.simulation?.employees,
      currentScale: input.simulation?.currentScale,
      operatingDays: input.simulation?.operatingDays,
      segment: input.simulation?.segment,
      weeklyHours: input.simulation?.weeklyHours,
      targetWeeklyHours: result?.simulatedWeeklyHours,
      currentCapacity: result?.currentCapacity,
      simulatedCapacity: result?.simulatedCapacity,
      weeklyDifference: result?.differenceHours,
      percentVariation: result?.variationPercent,
      equivalentEmployees: result?.equivalentEmployeesExact,
      equivalentEmployeesRounded: result?.equivalentEmployeesRounded,
      monthlyDifference: result?.monthlyDifference,
      utmSource: input.attribution?.utmSource,
      utmMedium: input.attribution?.utmMedium,
      utmCampaign: input.attribution?.utmCampaign,
      utmTerm: input.attribution?.utmTerm,
      utmContent: input.attribution?.utmContent,
      pageUrl: input.attribution?.pageUrl,
      referrer: input.attribution?.referrer,
      userAgent: userAgent?.slice(0, 500),
    },
  });
}

export async function listWorkScheduleLeads(params: { page: number; pageSize: number; query?: string; scale?: string }) {
  const where = {
    ...(params.query ? {
      OR: [
        { name: { contains: params.query, mode: "insensitive" as const } },
        { email: { contains: params.query, mode: "insensitive" as const } },
        { phone: { contains: params.query, mode: "insensitive" as const } },
      ],
    } : {}),
    ...(params.scale ? { currentScale: params.scale } : {}),
  };
  const [items, total, summary, today] = await prisma.$transaction([
    prisma.workScheduleLead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (params.page - 1) * params.pageSize,
      take: params.pageSize,
    }),
    prisma.workScheduleLead.count({ where }),
    prisma.workScheduleLead.aggregate({ where, _avg: { employees: true }, _count: { employees: true } }),
    prisma.workScheduleLead.count({
      where: {
        ...where,
        createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),
  ]);

  return {
    items,
    summary: {
      total,
      today,
      withSimulation: summary._count.employees,
      averageEmployees: summary._avg.employees ? Math.round(summary._avg.employees) : 0,
    },
    pagination: {
      page: params.page,
      pageSize: params.pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / params.pageSize)),
    },
  };
}
