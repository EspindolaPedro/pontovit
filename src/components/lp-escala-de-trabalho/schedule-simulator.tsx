"use client";

import { useState } from "react";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, LockIcon } from "@/components/shared/icons";
import { useLeadCapture } from "./lead-capture";
import styles from "./landing-page.module.css";

type SimulationInput = {
  employees: number;
  currentScale: string;
  operatingDays: number;
  openingTime: string;
  closingTime: string;
  simultaneousCoverage: number;
};

type SimulationResult = SimulationInput & {
  dailyOperatingHours: number;
  weeklyOperatingHours: number;
  weeklyCoverageHours: number;
  currentNominalCapacity: number;
  transitionNominalCapacity: number;
  finalNominalCapacity: number;
  hoursToRedistribute42: number;
  hoursToRedistribute40: number;
  additionalRestDays: number;
};

const heroBenefits = [
  "Simule a transição da escala 6x1 para a 5x2.",
  "Visualize o impacto na distribuição das jornadas.",
  "Identifique desafios na cobertura dos turnos.",
  "Descubra como simplificar a gestão com a PontoVit.",
];

function parseTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatNumber(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits }).format(value);
}

function calculateSimulation(input: SimulationInput): SimulationResult {
  const openingMinutes = parseTime(input.openingTime);
  const closingMinutes = parseTime(input.closingTime);
  const durationMinutes = closingMinutes > openingMinutes
    ? closingMinutes - openingMinutes
    : closingMinutes + 24 * 60 - openingMinutes;
  const dailyOperatingHours = durationMinutes / 60;
  const weeklyOperatingHours = dailyOperatingHours * input.operatingDays;

  return {
    ...input,
    dailyOperatingHours,
    weeklyOperatingHours,
    weeklyCoverageHours: weeklyOperatingHours * input.simultaneousCoverage,
    currentNominalCapacity: input.employees * 44,
    transitionNominalCapacity: input.employees * 42,
    finalNominalCapacity: input.employees * 40,
    hoursToRedistribute42: input.employees * 2,
    hoursToRedistribute40: input.employees * 4,
    additionalRestDays: input.employees,
  };
}

function pushSimulationEvent(result: SimulationResult) {
  const analyticsWindow = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  analyticsWindow.dataLayer?.push({
    event: "lp_5x2_simulation",
    employee_count: result.employees,
    current_scale: result.currentScale,
    operating_days: result.operatingDays,
  });
}

export function ScheduleSimulator() {
  const { openLeadCapture } = useLeadCapture();
  const [employees, setEmployees] = useState("120");
  const [currentScale, setCurrentScale] = useState("6x1");
  const [operatingDays, setOperatingDays] = useState("7");
  const [openingTime, setOpeningTime] = useState("07:00");
  const [closingTime, setClosingTime] = useState("22:00");
  const [simultaneousCoverage, setSimultaneousCoverage] = useState("20");
  const [result, setResult] = useState<SimulationResult | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = {
      employees: Math.max(1, Number(employees)),
      currentScale,
      operatingDays: Math.max(1, Number(operatingDays)),
      openingTime,
      closingTime,
      simultaneousCoverage: Math.max(1, Number(simultaneousCoverage)),
    };
    const nextResult = calculateSimulation(input);
    setResult(nextResult);
    pushSimulationEvent(nextResult);
    openLeadCapture({ trigger: "simulator", simulation: nextResult });
    window.requestAnimationFrame(() => {
      document.getElementById("resultado-simulacao")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <>
      <section className={styles.hero} aria-labelledby="lp-5x2-title">
        <span className={styles.heroOrbit} aria-hidden="true" />
        <span className={styles.heroRosette} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Nova escala 5x2 <span /> Sua empresa está preparada?</p>
              <h1 id="lp-5x2-title">A escala mudou. <em>Sua empresa não pode parar.</em></h1>
              <p className={styles.heroLead}>A transição da escala 6x1 para a 5x2 exige reorganizar jornadas, folgas e equipes. Mas como fazer isso sem comprometer o funcionamento da sua empresa?</p>
              <p className={styles.heroStrong}>Descubra como a nova jornada pode impactar sua operação e comece a planejar a mudança.</p>
              <ul className={styles.heroBenefits}>
                {heroBenefits.map((benefit) => <li key={benefit}><span><CheckIcon size={15} /></span>{benefit}</li>)}
              </ul>
            </div>

            <div className={styles.simulatorCard}>
              <div className={styles.simulatorHeading}>
                <span>Simulador inicial</span>
                <h2>Simule a nova escala da sua empresa</h2>
                <p>Veja como a escala 5x2 pode impactar sua operação.</p>
              </div>
              <form className={styles.simulatorForm} onSubmit={handleSubmit}>
                <label>
                  <span>Quantos colaboradores sua empresa possui?</span>
                  <div className={styles.inputSuffix}>
                    <input type="number" min="1" max="100000" inputMode="numeric" value={employees} onChange={(event) => setEmployees(event.target.value)} required />
                    <small>colaboradores</small>
                  </div>
                </label>
                <div className={styles.formRow}>
                  <label>
                    <span>Escala utilizada atualmente</span>
                    <select value={currentScale} onChange={(event) => setCurrentScale(event.target.value)}>
                      <option value="6x1">6x1</option>
                      <option value="5x1">5x1</option>
                      <option value="5x2">5x2</option>
                      <option value="12x36">12x36</option>
                      <option value="Outra">Outra</option>
                    </select>
                  </label>
                  <label>
                    <span>Dias de funcionamento por semana</span>
                    <select value={operatingDays} onChange={(event) => setOperatingDays(event.target.value)}>
                      <option value="5">5 dias</option>
                      <option value="6">6 dias</option>
                      <option value="7">7 dias</option>
                    </select>
                  </label>
                </div>
                <fieldset>
                  <legend>Qual é o horário de funcionamento?</legend>
                  <div className={styles.timeFields}>
                    <label><span>Abre às</span><input type="time" value={openingTime} onChange={(event) => setOpeningTime(event.target.value)} required /></label>
                    <span aria-hidden="true">até</span>
                    <label><span>Fecha às</span><input type="time" value={closingTime} onChange={(event) => setClosingTime(event.target.value)} required /></label>
                  </div>
                </fieldset>
                <label>
                  <span>Quantos colaboradores precisam trabalhar ao mesmo tempo?</span>
                  <div className={styles.inputSuffix}>
                    <input type="number" min="1" max={Math.max(1, Number(employees) || 1)} inputMode="numeric" value={simultaneousCoverage} onChange={(event) => setSimultaneousCoverage(event.target.value)} required />
                    <small>por turno</small>
                  </div>
                </label>
                <button className={styles.simulatorButton} type="submit">Simular minha escala 5x2 <ArrowUpRightIcon size={20} /></button>
                <p className={styles.privacyNote}><span aria-hidden="true"><LockIcon size={13} /></span> Simulação gratuita. Seus dados de contato serão solicitados antes de falar com a PontoVit.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {result && (
        <section id="resultado-simulacao" className={styles.resultSection} aria-live="polite" aria-labelledby="simulation-result-title">
          <div className={styles.container}>
            <div className={styles.resultHeading}>
              <p className={styles.eyebrow}>Resultado da simulação</p>
              <h2 id="simulation-result-title">Veja como a escala 5x2 pode mudar sua operação.</h2>
              <p>Esta é uma leitura inicial com base nos dados informados. Ela ajuda a dimensionar a reorganização, sem substituir o planejamento por função, turno e unidade.</p>
            </div>

            <div className={styles.operationSummary}>
              <div><span>Equipe</span><strong>{formatNumber(result.employees)}</strong><small>colaboradores</small></div>
              <div><span>Escala atual</span><strong>{result.currentScale}</strong><small>informada</small></div>
              <div><span>Funcionamento</span><strong>{result.operatingDays} dias</strong><small>{result.openingTime} às {result.closingTime}</small></div>
              <div><span>Cobertura mínima</span><strong>{formatNumber(result.simultaneousCoverage)}</strong><small>simultâneos</small></div>
            </div>

            <div className={styles.transitionGrid}>
              <article className={styles.transitionCard}>
                <span>Referência atual</span>
                <strong>44h</strong>
                <h3>{result.currentScale}</h3>
                <p>Até 44 horas semanais e a configuração de descanso informada pela empresa.</p>
              </article>
              <div className={styles.transitionArrow} aria-hidden="true"><ArrowRightIcon size={24} /></div>
              <article className={`${styles.transitionCard} ${styles.transitionCardOrange}`}>
                <span>Dezembro de 2026</span>
                <strong>42h</strong>
                <h3>Primeira etapa</h3>
                <p>Dois dias de repouso remunerado e redução do limite semanal.</p>
              </article>
              <div className={styles.transitionArrow} aria-hidden="true"><ArrowRightIcon size={24} /></div>
              <article className={`${styles.transitionCard} ${styles.transitionCardDark}`}>
                <span>Dezembro de 2027</span>
                <strong>40h</strong>
                <h3>Etapa final</h3>
                <p>Limite semanal definitivo previsto pela Emenda Constitucional.</p>
              </article>
            </div>

            <div className={styles.impactGrid}>
              <article>
                <span>Janela operacional</span>
                <strong>{formatNumber(result.weeklyOperatingHours, 1)}h</strong>
                <p>de funcionamento por semana.</p>
              </article>
              <article>
                <span>Cobertura mínima informada</span>
                <strong>{formatNumber(result.weeklyCoverageHours, 1)}h</strong>
                <p>horas-colaborador por semana.</p>
              </article>
              <article>
                <span>Primeira etapa</span>
                <strong>{formatNumber(result.hoursToRedistribute42)}h</strong>
                <p>a redistribuir por semana na equipe.</p>
              </article>
              <article>
                <span>Etapa final</span>
                <strong>{formatNumber(result.hoursToRedistribute40)}h</strong>
                <p>a redistribuir por semana na equipe.</p>
              </article>
            </div>

            <div className={styles.capacityPanel}>
              <div>
                <p className={styles.eyebrow}>O ponto central</p>
                <h3>O desafio não está apenas na quantidade de funcionários.</h3>
                <p>Está em garantir as pessoas certas nos horários certos, respeitando as novas jornadas. Na sua simulação, a empresa terá <strong>{formatNumber(result.additionalRestDays)} folgas adicionais por semana</strong> para distribuir quando migrar de uma para duas folgas por colaborador.</p>
              </div>
              <div className={styles.capacityBars} aria-label="Comparação da capacidade semanal nominal da equipe">
                {[
                  ["Referência de 44h", result.currentNominalCapacity, "100%"],
                  ["Etapa de 42h", result.transitionNominalCapacity, `${(42 / 44) * 100}%`],
                  ["Etapa de 40h", result.finalNominalCapacity, `${(40 / 44) * 100}%`],
                ].map(([label, value, width]) => (
                  <div className={styles.capacityRow} key={String(label)}>
                    <div><span>{label}</span><strong>{formatNumber(Number(value))}h</strong></div>
                    <i><span style={{ width: String(width) }} /></i>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.resultCta}>
              <div><span>Próximo passo</span><h3>Quer organizar essa mudança na prática?</h3><p>Converse com a PontoVit e leve a simulação para o nível de setores, funções, turnos e unidades.</p></div>
              <button type="button" onClick={() => openLeadCapture({ trigger: "simulation_result", simulation: result })}>Planejar minha transição <ArrowUpRightIcon size={20} /></button>
            </div>
            <p className={styles.legalDisclaimer}>Estimativa operacional simplificada. Não considera intervalos, férias, ausências, funções, acordos ou convenções coletivas e não representa orientação jurídica ou indicação automática de contratação.</p>
          </div>
        </section>
      )}
    </>
  );
}
