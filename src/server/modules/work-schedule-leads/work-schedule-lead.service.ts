import { prisma } from "@/server/db/prisma";

export type WorkScheduleLeadInput = {
  name: string;
  email: string;
  phone: string;
  trigger: string;
  simulation?: {
    employees: number;
    currentScale: string;
    operatingDays: number;
    openingTime: string;
    closingTime: string;
    simultaneousCoverage: number;
  };
};

export function createWorkScheduleLead(input: WorkScheduleLeadInput, userAgent?: string) {
  return prisma.workScheduleLead.create({
    data: {
      name: input.name,
      email: input.email.toLowerCase(),
      phone: input.phone,
      trigger: input.trigger,
      employees: input.simulation?.employees,
      currentScale: input.simulation?.currentScale,
      operatingDays: input.simulation?.operatingDays,
      openingTime: input.simulation?.openingTime,
      closingTime: input.simulation?.closingTime,
      simultaneousCoverage: input.simulation?.simultaneousCoverage,
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
