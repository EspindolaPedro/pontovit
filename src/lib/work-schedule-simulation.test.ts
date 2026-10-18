import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateWorkScheduleImpact,
  getWorkScheduleDiagnosis,
  parseWorkScheduleSimulationInput,
  type WorkScheduleSimulationInput,
} from "./work-schedule-simulation";

const baseInput: WorkScheduleSimulationInput = {
  segment: "supermarket",
  employees: 30,
  operatingDays: 7,
  currentScale: "6x1",
  weeklyHours: 44,
};

test("calcula exatamente o cenário de 30 colaboradores em 44 horas", () => {
  const result = calculateWorkScheduleImpact(baseInput);
  assert.equal(result.currentCapacity, 1320);
  assert.equal(result.simulatedCapacity, 1200);
  assert.equal(result.differenceHours, 120);
  assert.ok(Math.abs(result.variationPercent - -9.090909) < 0.00001);
  assert.equal(result.equivalentEmployeesExact, 33);
  assert.equal(result.equivalentEmployeesRounded, 33);
  assert.equal(result.equivalentDifference, 3);
  assert.equal(result.monthlyDifference, 520);
});

test("mantém variação zero quando a jornada atual já é 40 horas", () => {
  const result = calculateWorkScheduleImpact({ ...baseInput, weeklyHours: 40 });
  assert.equal(result.differenceHours, 0);
  assert.equal(result.variationPercent, 0);
  assert.equal(result.equivalentEmployeesExact, 30);
});

test("informa aumento de capacidade quando a jornada atual é 36 horas", () => {
  const result = calculateWorkScheduleImpact({ ...baseInput, weeklyHours: 36 });
  assert.equal(result.differenceHours, -120);
  assert.ok(result.variationPercent > 11.11 && result.variationPercent < 11.12);
  assert.equal(result.equivalentEmployeesExact, 27);
  assert.equal(result.equivalentEmployeesRounded, 27);
});

test("arredonda a equivalência inteira sempre para cima", () => {
  const result = calculateWorkScheduleImpact({ ...baseInput, employees: 31 });
  assert.equal(result.equivalentEmployeesExact, 34.1);
  assert.equal(result.equivalentEmployeesRounded, 35);
});

test("valida entradas inválidas", () => {
  assert.throws(() => parseWorkScheduleSimulationInput({ ...baseInput, employees: 0 }), /quantidade válida/);
  assert.throws(() => parseWorkScheduleSimulationInput({ ...baseInput, operatingDays: 4 }), /5, 6 ou 7/);
});

test("personaliza o diagnóstico por dias e escala", () => {
  assert.match(getWorkScheduleDiagnosis(baseInput), /finais de semana/);
  assert.match(getWorkScheduleDiagnosis(baseInput), /dias de trabalho e descanso/);
  assert.match(getWorkScheduleDiagnosis({ ...baseInput, operatingDays: 6, currentScale: "5x2" }), /seis dias/);
  assert.match(getWorkScheduleDiagnosis({ ...baseInput, operatingDays: 5, currentScale: "mixed" }), /aproximação/);
});
