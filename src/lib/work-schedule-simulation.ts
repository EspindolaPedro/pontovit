export const WORK_SCHEDULE_SEGMENTS = [
  { value: "supermarket", label: "Supermercado / Atacarejo", noun: "supermercado" },
  { value: "retail", label: "Comércio / Varejo", noun: "operação de varejo" },
  { value: "restaurant", label: "Restaurante / Alimentação", noun: "operação de alimentação" },
  { value: "pharmacy", label: "Farmácia", noun: "farmácia" },
  { value: "hospitality", label: "Hotelaria", noun: "operação de hotelaria" },
  { value: "fuel_station", label: "Posto de combustível", noun: "posto de combustível" },
  { value: "industry", label: "Indústria", noun: "operação industrial" },
  { value: "other", label: "Outro", noun: "operação" },
] as const;

export type WorkScheduleSegment = (typeof WORK_SCHEDULE_SEGMENTS)[number]["value"];
export type WorkScheduleScale = "6x1" | "5x2" | "mixed";
export type WorkScheduleWeeklyHours = 44 | 40 | 36;
export type WorkScheduleOperatingDays = 5 | 6 | 7;

export type WorkScheduleSimulationInput = {
  segment: WorkScheduleSegment;
  employees: number;
  operatingDays: WorkScheduleOperatingDays;
  currentScale: WorkScheduleScale;
  weeklyHours: WorkScheduleWeeklyHours;
};

export type WorkScheduleSimulationResult = WorkScheduleSimulationInput & {
  simulatedWeeklyHours: 40;
  currentCapacity: number;
  simulatedCapacity: number;
  differenceHours: number;
  variationPercent: number;
  equivalentEmployeesExact: number;
  equivalentEmployeesRounded: number;
  equivalentDifference: number;
  monthlyDifference: number;
};

export type RawWorkScheduleSimulationInput = {
  segment: string;
  employees: string | number;
  operatingDays: string | number;
  currentScale: string;
  weeklyHours: string | number;
};

const segmentValues = new Set<string>(WORK_SCHEDULE_SEGMENTS.map((segment) => segment.value));
const scaleValues = new Set<string>(["6x1", "5x2", "mixed"]);
const operatingDayValues = new Set<number>([5, 6, 7]);
const weeklyHourValues = new Set<number>([44, 40, 36]);

export function parseWorkScheduleSimulationInput(raw: RawWorkScheduleSimulationInput): WorkScheduleSimulationInput {
  const employees = Number(raw.employees);
  const operatingDays = Number(raw.operatingDays);
  const weeklyHours = Number(raw.weeklyHours);

  if (!segmentValues.has(raw.segment)) throw new Error("Selecione o segmento da empresa.");
  if (!Number.isInteger(employees) || employees < 1 || employees > 100000) throw new Error("Informe uma quantidade válida de colaboradores.");
  if (!operatingDayValues.has(operatingDays)) throw new Error("Selecione 5, 6 ou 7 dias de funcionamento.");
  if (!scaleValues.has(raw.currentScale)) throw new Error("Selecione a escala predominante.");
  if (!weeklyHourValues.has(weeklyHours)) throw new Error("Selecione uma jornada semanal válida.");

  return {
    segment: raw.segment as WorkScheduleSegment,
    employees,
    operatingDays: operatingDays as WorkScheduleOperatingDays,
    currentScale: raw.currentScale as WorkScheduleScale,
    weeklyHours: weeklyHours as WorkScheduleWeeklyHours,
  };
}

export function calculateWorkScheduleImpact(input: WorkScheduleSimulationInput): WorkScheduleSimulationResult {
  const simulatedWeeklyHours = 40 as const;
  const currentCapacity = input.employees * input.weeklyHours;
  const simulatedCapacity = input.employees * simulatedWeeklyHours;
  const differenceHours = currentCapacity - simulatedCapacity;
  const equivalentEmployeesExact = currentCapacity / simulatedWeeklyHours;

  return {
    ...input,
    simulatedWeeklyHours,
    currentCapacity,
    simulatedCapacity,
    differenceHours,
    variationPercent: currentCapacity > 0 ? ((simulatedCapacity - currentCapacity) / currentCapacity) * 100 : 0,
    equivalentEmployeesExact,
    equivalentEmployeesRounded: Math.ceil(equivalentEmployeesExact),
    equivalentDifference: equivalentEmployeesExact - input.employees,
    monthlyDifference: differenceHours * (52 / 12),
  };
}

export function getWorkScheduleSegment(input: WorkScheduleSimulationInput) {
  return WORK_SCHEDULE_SEGMENTS.find((segment) => segment.value === input.segment) ?? WORK_SCHEDULE_SEGMENTS.at(-1)!;
}

export function getWorkScheduleDiagnosis(input: WorkScheduleSimulationInput) {
  const operatingMessage = input.operatingDays === 7
    ? "Como a operação funciona todos os dias, o planejamento precisa proteger a cobertura dos finais de semana, dos turnos e do revezamento de folgas."
    : input.operatingDays === 6
      ? "Com seis dias de funcionamento, o ponto de atenção é distribuir as jornadas sem criar lacunas na cobertura ao longo da semana."
      : "Com cinco dias de funcionamento, o foco está em distribuir as horas dentro dos dias operacionais e acompanhar os períodos de maior demanda.";

  const scaleMessage = input.currentScale === "6x1"
    ? "Na escala 6x1, a mudança também pode exigir uma nova organização dos dias de trabalho e descanso."
    : input.currentScale === "5x2"
      ? "Como a distribuição em cinco dias já existe, a análise deve se concentrar no impacto das horas e na cobertura de cada período."
      : "Como há escalas mistas, este cálculo é uma aproximação baseada na jornada predominante e deve ser detalhado por equipe, função e turno.";

  return `${operatingMessage} ${scaleMessage}`;
}

export function getScaleLabel(scale: WorkScheduleScale) {
  return scale === "mixed" ? "Escalas mistas / outras" : scale;
}
