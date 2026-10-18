"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, CheckIcon, LockIcon } from "@/components/shared/icons";
import {
  WORK_SCHEDULE_SEGMENTS,
  calculateWorkScheduleImpact,
  getScaleLabel,
  getWorkScheduleDiagnosis,
  getWorkScheduleSegment,
  parseWorkScheduleSimulationInput,
  type WorkSchedulePhase,
  type WorkScheduleSimulationResult,
} from "@/lib/work-schedule-simulation";
import { useLeadCapture } from "./lead-capture";
import styles from "./landing-page.module.css";

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
  const [employees, setEmployees] = useState("30");
  const [operatingDays, setOperatingDays] = useState("7");
  const [currentScale, setCurrentScale] = useState("6x1");
  const [weeklyHours, setWeeklyHours] = useState("44");
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
      const input = parseWorkScheduleSimulationInput({ segment, employees, operatingDays, currentScale, weeklyHours });
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

  return (
    <>
      <section className={styles.hero} aria-labelledby="lp-5x2-title">
        <span className={styles.heroOrbit} aria-hidden="true" />
        <span className={styles.heroRosette} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="lp-5x2-title">A escala mudou. <em>Sua empresa não pode parar.</em></h1>
              <p className={styles.heroLead}>Entenda como a transição para 42 e depois 40 horas semanais pode alterar a capacidade nominal da sua equipe e quais pontos merecem atenção no planejamento.</p>
              <p className={styles.heroStrong}>Simule o impacto e veja como a PontoVit organiza jornadas, turnos e folgas em um só lugar.</p>
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
                <p>{result && segmentData ? `${segmentData.label} · ${formatNumber(result.employees)} colaboradores · ${result.operatingDays} dias · ${getScaleLabel(result.currentScale)} · ${result.weeklyHours}h atuais` : "Informe alguns dados da sua operação e veja o impacto estimado de cada etapa da redução da jornada semanal."}</p>
              </div>
              {!result ? <form className={styles.simulatorForm} onSubmit={handleSubmit} onChange={markStarted}>
                <label>
                  <span>Segmento</span>
                  <select value={segment} onChange={(event) => setSegment(event.target.value)} required>
                    {WORK_SCHEDULE_SEGMENTS.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
                  </select>
                </label>
                <label>
                  <span>Quantidade de colaboradores que trabalham em escala</span>
                  <div className={styles.inputSuffix}>
                    <input type="number" min="1" max="100000" inputMode="numeric" value={employees} onChange={(event) => setEmployees(event.target.value)} required />
                    <small>colaboradores</small>
                  </div>
                </label>
                <div className={styles.formRow}>
                  <label>
                    <span>Dias de funcionamento semanal</span>
                    <select value={operatingDays} onChange={(event) => setOperatingDays(event.target.value)} required>
                      <option value="5">5 dias</option>
                      <option value="6">6 dias</option>
                      <option value="7">7 dias</option>
                    </select>
                  </label>
                  <label>
                    <span>Escala predominante</span>
                    <select value={currentScale} onChange={(event) => setCurrentScale(event.target.value)} required>
                      <option value="6x1">6x1</option>
                      <option value="5x2">5x2</option>
                      <option value="mixed">Escalas mistas / outras</option>
                    </select>
                  </label>
                </div>
                <label>
                  <span>Jornada semanal predominante</span>
                  <select value={weeklyHours} onChange={(event) => setWeeklyHours(event.target.value)}>
                    <option value="44">44 horas</option>
                    <option value="42">42 horas</option>
                    <option value="40">40 horas</option>
                    <option value="36">36 horas</option>
                  </select>
                </label>
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
                      <span>Impacto semanal · limite de {activePhase.legalLimitWeeklyHours}h</span>
                      <div><strong>{isReduction ? "−" : ""}{formatNumber(difference)}h</strong><em>{isReduction ? `${formatNumber(Math.abs(activePhase.variationPercent), 2)}% de redução` : "sem alteração"}</em></div>
                      <p>{isReduction
                        ? `${formatNumber(result.employees)} colaboradores: ${formatNumber(difference)} horas semanais a menos nesta fase.`
                        : `A jornada atual já está dentro do limite desta fase.`}</p>
                    </article>

                    <div className={styles.simulatorBars} aria-label="Comparação da capacidade semanal">
                      <div><span>Atual · {result.weeklyHours}h</span><i><b style={{ width: `${(result.currentCapacity / largestCapacity) * 100}%` }} /></i><strong>{formatNumber(result.currentCapacity)}h</strong></div>
                      <div><span>Limite · {activePhase.legalLimitWeeklyHours}h</span><i><b style={{ width: `${(activePhase.simulatedCapacity / largestCapacity) * 100}%` }} /></i><strong>{formatNumber(activePhase.simulatedCapacity)}h</strong></div>
                    </div>

                    <div className={styles.simulatorResultStats}>
                      <article><span>Equivalência matemática</span><strong>{formatNumber(activePhase.equivalentEmployeesRounded)}</strong><small>colaboradores a {activePhase.simulatedWeeklyHours}h</small></article>
                      <article><span>Diferença mensal</span><strong>{formatNumber(Math.abs(activePhase.monthlyDifference), 1)}h</strong><small>aproximação nominal</small></article>
                    </div>

                    <div className={styles.simulatorDiagnosis}>
                      <span>Do cenário à escala pronta</span>
                      <strong>A PontoVit transforma este impacto em uma escala organizada.</strong>
                      <p>{getWorkScheduleDiagnosis(result)}</p>
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
