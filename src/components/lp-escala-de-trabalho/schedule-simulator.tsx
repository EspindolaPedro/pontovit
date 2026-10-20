"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, CheckIcon, LockIcon } from "@/components/shared/icons";
import {
  WORK_SCHEDULE_SEGMENTS,
  calculateWorkScheduleImpact,
  getWorkScheduleDiagnosis,
  getWorkScheduleSegment,
  parseWorkScheduleSimulationInput,
  type WorkSchedulePhase,
  type WorkScheduleSimulationResult,
} from "@/lib/work-schedule-simulation";
import { useLeadCapture } from "./lead-capture";
import styles from "./landing-page.module.css";

// A LP é feita para quem ainda está na 6x1 e quer entender a transição para a 5x2:
// assumimos a jornada padrão da 6x1 (44h) como ponto de partida, sem perguntar isso ao lead.
const ASSUMED_CURRENT_SCALE = "6x1";
const ASSUMED_WEEKLY_HOURS = "44";

const heroBenefits = [
  "Simule as etapas de 42 e 40 horas.",
  "Compare o impacto em cada fase da transição.",
  "Identifique pontos de atenção na cobertura.",
  "Receba o diagnóstico sem fazer cadastro.",
];

function formatNumber(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits }).format(value);
}

function pushSimulatorEvent(event: string, payload: Record<string, unknown> = {}) {
  const analyticsWindow = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  analyticsWindow.dataLayer?.push({ event, ...payload });
}

export function ScheduleSimulator() {
  const { openLeadCapture } = useLeadCapture();
  const simulatorRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const viewedRef = useRef(false);
  const [segment, setSegment] = useState("supermarket");
  const [employees, setEmployees] = useState("1");
  const [operatingDays, setOperatingDays] = useState("7");
  const [formError, setFormError] = useState("");
  const [result, setResult] = useState<WorkScheduleSimulationResult | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<WorkSchedulePhase>("transition");

  useEffect(() => {
    const target = simulatorRef.current;
    if (!target || viewedRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting) || viewedRef.current) return;
      viewedRef.current = true;
      pushSimulatorEvent("simulator_viewed");
      observer.disconnect();
    }, { threshold: .35 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    pushSimulatorEvent("simulator_started");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    try {
      const input = parseWorkScheduleSimulationInput({
        segment,
        employees,
        operatingDays,
        currentScale: ASSUMED_CURRENT_SCALE,
        weeklyHours: ASSUMED_WEEKLY_HOURS,
      });
      const nextResult = calculateWorkScheduleImpact(input);
      setSelectedPhase("transition");
      setResult(nextResult);
      pushSimulatorEvent("simulator_completed", {
        segment: input.segment,
        employee_count: input.employees,
        current_scale: input.currentScale,
        operating_days: input.operatingDays,
        current_weekly_hours: input.weeklyHours,
      });
    } catch (reason) {
      setFormError(reason instanceof Error ? reason.message : "Revise os dados informados.");
    }
  }

  function handleResultCta() {
    if (!result) return;
    pushSimulatorEvent("simulator_cta_clicked", {
      segment: result.segment,
      employee_count: result.employees,
      current_scale: result.currentScale,
      operating_days: result.operatingDays,
      current_weekly_hours: result.weeklyHours,
      selected_phase: selectedPhase,
    });
    openLeadCapture({ trigger: "simulation_result", simulation: result });
  }

  const segmentData = result ? getWorkScheduleSegment(result) : null;
  const activePhase = result ? result[selectedPhase] : null;
  const difference = activePhase ? Math.abs(activePhase.differenceHours) : 0;
  const isReduction = Boolean(activePhase && activePhase.differenceHours > 0);
  const largestCapacity = result && activePhase ? Math.max(result.currentCapacity, activePhase.simulatedCapacity) : 1;
  const headcountGap = result && activePhase ? Math.max(activePhase.equivalentEmployeesRounded - result.employees, 0) : 0;

  return (
    <>
      <section className={styles.hero} aria-labelledby="lp-5x2-title">
        <span className={styles.heroOrbit} aria-hidden="true" />
        <span className={styles.heroRosette} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="lp-5x2-title">A escala 6x1 vai mudar. <em>Sua empresa está preparada para o 5x2?</em></h1>
              <p className={styles.heroLead}>A nova jornada exige mais do que reorganizar as folgas. É preciso manter a cobertura dos turnos e o funcionamento da sua operação.</p>
              <p className={styles.heroStrong}>Simule gratuitamente o impacto na sua equipe e descubra como a PontoVit pode ajudar sua empresa nessa transição.</p>
              <ul className={styles.heroBenefits}>
                {heroBenefits.map((benefit) => <li key={benefit}><span><CheckIcon size={15} /></span>{benefit}</li>)}
              </ul>
            </div>

            <div className={styles.simulatorCard} ref={simulatorRef} aria-live="polite">
              <div className={styles.simulatorStageNav} aria-label={result ? "Diagnóstico em exibição" : "Dados da operação em exibição"}>
                <span className={!result ? styles.isActiveStage : undefined}><i />Dados da operação</span>
                <b aria-hidden="true"><i className={result ? styles.isStageComplete : undefined} /></b>
                <span className={result ? styles.isActiveStage : undefined}><i />Diagnóstico</span>
              </div>
              <div className={styles.simulatorHeading} key={result ? "result-heading" : "form-heading"}>
                {result ? <span>Resultado da simulação</span> : null}
                <h2 id={result ? "simulation-result-title" : undefined}>{result ? "Seu diagnóstico está pronto." : "Descubra o impacto da nova jornada de trabalho na sua empresa"}</h2>
                <p>{result && segmentData ? `${segmentData.label} · ${formatNumber(result.employees)} colaboradores · ${result.operatingDays} dias de funcionamento` : "Informe os dados da sua operação e veja quantas pessoas sua equipe vai precisar na transição da 6x1 para a 5x2."}</p>
              </div>
              {!result ? <form className={styles.simulatorForm} onSubmit={handleSubmit} onChange={markStarted}>
                <label>
                  <span>Segmento</span>
                  <select value={segment} onChange={(event) => setSegment(event.target.value)} required>
                    {WORK_SCHEDULE_SEGMENTS.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
                  </select>
                </label>
                <div className={styles.formRow}>
                  <label>
                    <span>Quantidade de colaboradores em escala</span>
                    <div className={styles.inputSuffix}>
                      <input type="number" min="1" max="100000" inputMode="numeric" value={employees} onChange={(event) => setEmployees(event.target.value)} required />
                      <small>colaboradores</small>
                    </div>
                  </label>
                  <label>
                    <span>Dias de funcionamento semanal</span>
                    <select value={operatingDays} onChange={(event) => setOperatingDays(event.target.value)} required>
                      <option value="5">5 dias</option>
                      <option value="6">6 dias</option>
                      <option value="7">7 dias</option>
                    </select>
                  </label>
                </div>
                {formError ? <p className={styles.simulatorError} role="alert">{formError}</p> : null}
                <button className={styles.simulatorButton} type="submit">Simular impacto na minha empresa <ArrowUpRightIcon size={20} /></button>
                <p className={styles.privacyNote}><span aria-hidden="true"><LockIcon size={13} /></span> Resultado imediato e sem cadastro. Seus dados de contato serão solicitados somente se você quiser falar com a PontoVit.</p>
              </form> : segmentData && activePhase ? (
                <div className={styles.simulatorResult} role="region" aria-labelledby="simulation-result-title">
                  <section className={styles.simulatorTimeline} aria-labelledby="transition-timeline-title">
                    <div>
                      <span id="transition-timeline-title">Transição da jornada</span>
                    </div>
                    <div className={styles.simulatorPhasePicker} role="tablist" aria-label="Escolha a fase da transição">
                      <button type="button" role="tab" aria-selected={selectedPhase === "transition"} className={selectedPhase === "transition" ? styles.isSelectedPhase : undefined} onClick={() => setSelectedPhase("transition")}>
                        <small>Dezembro de 2026</small><strong>Limite de 42h</strong><em>{result.transition.differenceHours > 0 ? `${formatNumber(Math.abs(result.transition.variationPercent), 2)}% de redução` : "sem redução"}</em>
                      </button>
                      <button type="button" role="tab" aria-selected={selectedPhase === "final"} className={selectedPhase === "final" ? styles.isSelectedPhase : undefined} onClick={() => setSelectedPhase("final")}>
                        <small>Dezembro de 2027</small><strong>Limite de 40h</strong><em>{result.final.differenceHours > 0 ? `${formatNumber(Math.abs(result.final.variationPercent), 2)}% de redução` : "sem redução"}</em>
                      </button>
                    </div>
                    <p className={styles.simulatorMathNote}>O percentual vem da jornada; o total de horas varia com o tamanho da equipe.</p>
                  </section>

                  <div className={styles.simulatorPhaseDetail} key={selectedPhase}>
                    <article className={styles.simulatorImpact}>
                      <span>Equipe necessária · jornada de {activePhase.simulatedWeeklyHours}h</span>
                      <div>
                        <strong>{formatNumber(activePhase.equivalentEmployeesRounded)}</strong>
                        <span className={`${styles.simulatorGapBadge} ${headcountGap <= 0 ? styles.simulatorGapBadgeOk : ""}`}>
                          {headcountGap > 0 ? `+${formatNumber(headcountGap)} vagas` : <><CheckIcon size={11} /> sem novas vagas</>}
                        </span>
                      </div>
                      <p>{headcountGap > 0
                        ? `Hoje: ${formatNumber(result.employees)} colaboradores. Contrate ${formatNumber(headcountGap)} ${headcountGap > 1 ? "pessoas" : "pessoa"} ou redistribua toda a equipe em novos turnos para manter a cobertura.`
                        : `Hoje: ${formatNumber(result.employees)} colaboradores — já são suficientes. Redistribua os turnos para garantir os 2 dias de descanso por pessoa.`}</p>
                    </article>

                    <div className={styles.simulatorBars} aria-label="Comparação da capacidade semanal">
                      <div><span>Atual · {result.weeklyHours}h</span><i><b style={{ width: `${(result.currentCapacity / largestCapacity) * 100}%` }} /></i><strong>{formatNumber(result.currentCapacity)}h</strong></div>
                      <div><span>Limite · {activePhase.legalLimitWeeklyHours}h</span><i><b style={{ width: `${(activePhase.simulatedCapacity / largestCapacity) * 100}%` }} /></i><strong>{formatNumber(activePhase.simulatedCapacity)}h</strong></div>
                    </div>
                    <p className={styles.simulatorMathNote}>{isReduction
                      ? `${formatNumber(difference)}h a menos por semana nesta fase (${formatNumber(Math.abs(activePhase.variationPercent), 2)}% de redução).`
                      : "A jornada atual já está dentro do limite desta fase."}</p>

                    <div className={styles.simulatorDiagnosis}>
                      <span>O que isso significa para você</span>
                      <strong>A PontoVit transforma esse cálculo em uma escala 5x2 pronta para rodar.</strong>
                      <p>{getWorkScheduleDiagnosis(result, selectedPhase)}</p>
                    </div>
                  </div>

                  <button className={styles.simulatorButton} type="button" onClick={handleResultCta}>Orçamento no WhatsApp <ArrowUpRightIcon size={20} /></button>
                  <button className={styles.simulatorEditButton} type="button" onClick={() => setResult(null)}>← Editar os dados da simulação</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
