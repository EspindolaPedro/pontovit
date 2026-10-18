export const WORK_SCHEDULE_SEGMENTS = [
  { value: "supermarket", label: "Supermercado / Atacarejo", noun: "supermercado", possessive: "Seu" },
  { value: "retail", label: "Comércio / Varejo", noun: "operação de varejo", possessive: "Sua" },
  { value: "restaurant", label: "Restaurante / Alimentação", noun: "operação de alimentação", possessive: "Sua" },
  { value: "pharmacy", label: "Farmácia", noun: "farmácia", possessive: "Sua" },
  { value: "hospitality", label: "Hotelaria", noun: "operação de hotelaria", possessive: "Sua" },
  { value: "fuel_station", label: "Posto de combustível", noun: "posto de combustível", possessive: "Seu" },
  { value: "industry", label: "Indústria", noun: "operação industrial", possessive: "Sua" },
  { value: "other", label: "Outro", noun: "operação", possessive: "Sua" },
] as const;

export type WorkScheduleSegment = (typeof WORK_SCHEDULE_SEGMENTS)[number]["value"];
export type WorkScheduleScale = "6x1" | "5x2" | "mixed";
export type WorkScheduleWeeklyHours = 44 | 42 | 40 | 36;
export type WorkScheduleOperatingDays = 5 | 6 | 7;
export type WorkSchedulePhase = "transition" | "final";

export type WorkScheduleSimulationInput = {
  segment: WorkScheduleSegment;
  employees: number;
  operatingDays: WorkScheduleOperatingDays;
  currentScale: WorkScheduleScale;
  weeklyHours: WorkScheduleWeeklyHours;
};

export type WorkSchedulePhaseImpact = {
  phase: WorkSchedulePhase;
  legalLimitWeeklyHours: 42 | 40;
  simulatedWeeklyHours: 42 | 40 | 36;
  simulatedCapacity: number;
  differenceHours: number;
  variationPercent: number;
  equivalentEmployeesExact: number;
  equivalentEmployeesRounded: number;
  equivalentDifference: number;
  monthlyDifference: number;
};

export type WorkScheduleSimulationResult = WorkScheduleSimulationInput & {
  currentCapacity: number;
  transition: WorkSchedulePhaseImpact;
  final: WorkSchedulePhaseImpact;
  // Campos finais preservados para manter a integração já existente com o CMS.
  simulatedWeeklyHours: 42 | 40 | 36;
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
const weeklyHourValues = new Set<number>([44, 42, 40, 36]);

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

function calculatePhaseImpact(
  input: WorkScheduleSimulationInput,
  currentCapacity: number,
  phase: WorkSchedulePhase,
  legalLimitWeeklyHours: 42 | 40,
): WorkSchedulePhaseImpact {
  const simulatedWeeklyHours = Math.min(input.weeklyHours, legalLimitWeeklyHours) as 42 | 40 | 36;
  const simulatedCapacity = input.employees * simulatedWeeklyHours;
  const differenceHours = currentCapacity - simulatedCapacity;
  const equivalentEmployeesExact = currentCapacity / simulatedWeeklyHours;

  return {
    phase,
    legalLimitWeeklyHours,
    simulatedWeeklyHours,
    simulatedCapacity,
    differenceHours,
    variationPercent: currentCapacity > 0 ? ((simulatedCapacity - currentCapacity) / currentCapacity) * 100 : 0,
    equivalentEmployeesExact,
    equivalentEmployeesRounded: Math.ceil(equivalentEmployeesExact),
    equivalentDifference: equivalentEmployeesExact - input.employees,
    monthlyDifference: differenceHours * (52 / 12),
  };
}

export function calculateWorkScheduleImpact(input: WorkScheduleSimulationInput): WorkScheduleSimulationResult {
  const currentCapacity = input.employees * input.weeklyHours;
  const transition = calculatePhaseImpact(input, currentCapacity, "transition", 42);
  const final = calculatePhaseImpact(input, currentCapacity, "final", 40);

  return {
    ...input,
    currentCapacity,
    transition,
    final,
    simulatedWeeklyHours: final.simulatedWeeklyHours,
    simulatedCapacity: final.simulatedCapacity,
    differenceHours: final.differenceHours,
    variationPercent: final.variationPercent,
    equivalentEmployeesExact: final.equivalentEmployeesExact,
    equivalentEmployeesRounded: final.equivalentEmployeesRounded,
    equivalentDifference: final.equivalentDifference,
    monthlyDifference: final.monthlyDifference,
  };
}

export function getWorkScheduleSegment(input: WorkScheduleSimulationInput) {
  return WORK_SCHEDULE_SEGMENTS.find((segment) => segment.value === input.segment) ?? WORK_SCHEDULE_SEGMENTS.at(-1)!;
}

export function getWorkScheduleDiagnosis(input: WorkScheduleSimulationInput) {
  const coverage = input.operatingDays === 7
    ? "a cobertura dos finais de semana e turnos"
    : input.operatingDays === 6
      ? "a cobertura dos seis dias de operação"
      : "as horas dentro dos cinco dias de operação";

  if (input.currentScale === "6x1") return `Organize trabalho, descanso e ${coverage} em um só lugar.`;
  if (input.currentScale === "5x2") return `Redistribua as horas e acompanhe ${coverage} em um só lugar.`;
  return `Como aproximação, detalhe as escalas mistas por equipe e acompanhe ${coverage} em um só lugar.`;
}

export function getScaleLabel(scale: WorkScheduleScale) {
  return scale === "mixed" ? "Escalas mistas / outras" : scale;
}
