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

test("calcula as fases de 42 e 40 horas para 30 colaboradores", () => {
  const result = calculateWorkScheduleImpact(baseInput);
  assert.equal(result.currentCapacity, 1320);

  assert.equal(result.transition.simulatedCapacity, 1260);
  assert.equal(result.transition.differenceHours, 60);
  assert.ok(Math.abs(result.transition.variationPercent - -4.545454) < 0.00001);
  assert.ok(Math.abs(result.transition.equivalentEmployeesExact - 31.428571) < 0.00001);
  assert.equal(result.transition.equivalentEmployeesRounded, 32);
  assert.equal(result.transition.monthlyDifference, 260);

  assert.equal(result.final.simulatedCapacity, 1200);
  assert.equal(result.final.differenceHours, 120);
  assert.ok(Math.abs(result.final.variationPercent - -9.090909) < 0.00001);
  assert.equal(result.final.equivalentEmployeesExact, 33);
  assert.equal(result.final.equivalentEmployeesRounded, 33);
  assert.equal(result.final.equivalentDifference, 3);
  assert.equal(result.final.monthlyDifference, 520);
});

test("mantém os campos finais usados pelo CMS alinhados ao cenário de 40 horas", () => {
  const result = calculateWorkScheduleImpact(baseInput);
  assert.equal(result.simulatedWeeklyHours, result.final.simulatedWeeklyHours);
  assert.equal(result.simulatedCapacity, result.final.simulatedCapacity);
  assert.equal(result.differenceHours, result.final.differenceHours);
  assert.equal(result.variationPercent, result.final.variationPercent);
});

test("mantém jornadas de 40 horas sem aumento em nenhuma fase", () => {
  const result = calculateWorkScheduleImpact({ ...baseInput, weeklyHours: 40 });
  assert.equal(result.transition.simulatedWeeklyHours, 40);
  assert.equal(result.transition.differenceHours, 0);
  assert.equal(result.final.differenceHours, 0);
  assert.equal(result.final.variationPercent, 0);
  assert.equal(result.final.equivalentEmployeesExact, 30);
});

test("mantém jornadas de 36 horas sem aumento artificial", () => {
  const result = calculateWorkScheduleImpact({ ...baseInput, weeklyHours: 36 });
  assert.equal(result.transition.simulatedWeeklyHours, 36);
  assert.equal(result.final.simulatedWeeklyHours, 36);
  assert.equal(result.transition.differenceHours, 0);
  assert.equal(result.final.differenceHours, 0);
});

test("para uma jornada atual de 42 horas, a primeira fase não muda e a fase final reduz", () => {
  const result = calculateWorkScheduleImpact({ ...baseInput, weeklyHours: 42 });
  assert.equal(result.transition.differenceHours, 0);
  assert.equal(result.final.differenceHours, 60);
  assert.ok(result.final.variationPercent < -4.76 && result.final.variationPercent > -4.77);
});

test("o percentual depende da jornada e não do tamanho da equipe", () => {
  const small = calculateWorkScheduleImpact(baseInput);
  const large = calculateWorkScheduleImpact({ ...baseInput, employees: 5000 });
  assert.equal(small.transition.variationPercent, large.transition.variationPercent);
  assert.equal(small.final.variationPercent, large.final.variationPercent);
  assert.notEqual(small.final.differenceHours, large.final.differenceHours);
});

test("arredonda a equivalência inteira sempre para cima", () => {
  const result = calculateWorkScheduleImpact({ ...baseInput, employees: 31 });
  assert.equal(result.final.equivalentEmployeesExact, 34.1);
  assert.equal(result.final.equivalentEmployeesRounded, 35);
});

test("valida entradas inválidas e aceita 42 horas", () => {
  assert.throws(() => parseWorkScheduleSimulationInput({ ...baseInput, employees: 0 }), /quantidade válida/);
  assert.throws(() => parseWorkScheduleSimulationInput({ ...baseInput, operatingDays: 4 }), /5, 6 ou 7/);
  assert.equal(parseWorkScheduleSimulationInput({ ...baseInput, weeklyHours: 42 }).weeklyHours, 42);
});

test("diagnóstico informa quantos colaboradores a mais são necessários por fase", () => {
  const result = calculateWorkScheduleImpact(baseInput);
  assert.match(getWorkScheduleDiagnosis(result, "transition"), /fins de semana/);
  assert.match(getWorkScheduleDiagnosis(result, "transition"), /2 a mais que hoje/);
  assert.match(getWorkScheduleDiagnosis(result, "final"), /3 a mais que hoje/);

  const sixDays = calculateWorkScheduleImpact({ ...baseInput, operatingDays: 6 });
  assert.match(getWorkScheduleDiagnosis(sixDays, "final"), /6 dias de funcionamento/);
});

test("diagnóstico reconhece quando a equipe atual já é suficiente", () => {
  const result = calculateWorkScheduleImpact({ ...baseInput, employees: 21, weeklyHours: 42 });
  assert.equal(result.transition.equivalentEmployeesRounded, 21);
  assert.match(getWorkScheduleDiagnosis(result, "transition"), /já comporta a jornada/);
});
