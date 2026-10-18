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
  type WorkScheduleSimulationResult,
} from "@/lib/work-schedule-simulation";
import { useLeadCapture } from "./lead-capture";
import styles from "./landing-page.module.css";

const heroBenefits = [
  "Simule o impacto da jornada de 40 horas.",
  "Compare a capacidade semanal da equipe.",
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

  useEffect(() => {
    if (!result) return;
    window.requestAnimationFrame(() => document.getElementById("resultado-simulacao")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [result]);

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
    });
    openLeadCapture({ trigger: "simulation_result", simulation: result });
  }

  const segmentData = result ? getWorkScheduleSegment(result) : null;
  const difference = result ? Math.abs(result.differenceHours) : 0;
  const isReduction = Boolean(result && result.differenceHours > 0);
  const isIncrease = Boolean(result && result.differenceHours < 0);
  const largestCapacity = result ? Math.max(result.currentCapacity, result.simulatedCapacity) : 1;

  return (
    <>
      <section className={styles.hero} aria-labelledby="lp-5x2-title">
        <span className={styles.heroOrbit} aria-hidden="true" />
        <span className={styles.heroRosette} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Simulador de jornada <span /> Resultado em menos de 1 minuto</p>
              <h1 id="lp-5x2-title">A escala mudou. <em>Sua empresa não pode parar.</em></h1>
              <p className={styles.heroLead}>Entenda como uma jornada semanal de 40 horas pode alterar a capacidade nominal da sua equipe e quais pontos merecem atenção no planejamento.</p>
              <p className={styles.heroStrong}>Faça uma estimativa gratuita antes de reorganizar jornadas, folgas e equipes.</p>
              <ul className={styles.heroBenefits}>
                {heroBenefits.map((benefit) => <li key={benefit}><span><CheckIcon size={15} /></span>{benefit}</li>)}
              </ul>
            </div>

            <div className={styles.simulatorCard} ref={simulatorRef}>
              <div className={styles.simulatorHeading}>
                <span>Simulador gratuito</span>
                <h2>Descubra o impacto da nova jornada de trabalho na sua empresa</h2>
                <p>Informe alguns dados da sua operação e veja como uma jornada semanal de 40 horas pode afetar a disponibilidade da equipe.</p>
              </div>
              <form className={styles.simulatorForm} onSubmit={handleSubmit} onChange={markStarted}>
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
                    <option value="40">40 horas</option>
                    <option value="36">36 horas</option>
                  </select>
                </label>
                {formError ? <p className={styles.simulatorError} role="alert">{formError}</p> : null}
                <button className={styles.simulatorButton} type="submit">Simular impacto na minha empresa <ArrowUpRightIcon size={20} /></button>
                <p className={styles.privacyNote}><span aria-hidden="true"><LockIcon size={13} /></span> Resultado imediato e sem cadastro. Seus dados de contato serão solicitados somente se você quiser falar com a PontoVit.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {result && segmentData ? (
        <section id="resultado-simulacao" className={styles.resultSection} aria-live="polite" aria-labelledby="simulation-result-title">
          <div className={styles.container}>
            <div className={styles.resultHeading}>
              <p className={styles.eyebrow}>Seu diagnóstico inicial</p>
              <h2 id="simulation-result-title">O impacto nominal de uma jornada de 40 horas.</h2>
              <p>{segmentData.label} · {formatNumber(result.employees)} colaboradores · {result.operatingDays} dias por semana · {getScaleLabel(result.currentScale)} · {result.weeklyHours}h atuais</p>
            </div>

            <div className={styles.capacityComparison}>
              <article>
                <span>Capacidade atual</span>
                <strong>{formatNumber(result.currentCapacity)}h</strong>
                <small>{result.employees} colaboradores × {result.weeklyHours}h por semana</small>
              </article>
              <span className={styles.capacityVs}>versus</span>
              <article className={styles.capacityComparisonHighlight}>
                <span>Capacidade simulada</span>
                <strong>{formatNumber(result.simulatedCapacity)}h</strong>
                <small>{result.employees} colaboradores × 40h por semana</small>
              </article>
            </div>

            <div className={styles.impactResultGrid}>
              <article className={styles.impactMainCard}>
                <span>Impacto semanal estimado</span>
                <strong>{isReduction ? "−" : isIncrease ? "+" : ""}{formatNumber(difference)}h</strong>
                <h3>{isReduction || isIncrease ? "de capacidade contratual nominal" : "sem alteração nominal"}</h3>
                <p>{isReduction
                  ? `Sua ${segmentData.noun} pode ter ${formatNumber(difference)} horas semanais a menos ao comparar ${result.weeklyHours}h com 40h por colaborador.`
                  : isIncrease
                    ? `Neste cenário, a jornada simulada de 40h representa ${formatNumber(difference)} horas semanais a mais do que a referência atual de ${result.weeklyHours}h.`
                    : "A equipe já está na referência de 40 horas, por isso a capacidade semanal nominal permanece igual."}</p>
              </article>

              <article className={styles.impactChartCard}>
                <div className={styles.impactChartHeading}><span>Comparativo</span><strong>{formatNumber(Math.abs(result.variationPercent), 2)}% {isReduction ? "de redução" : isIncrease ? "de aumento" : "de variação"}</strong></div>
                <div className={styles.impactChart} aria-label="Comparação entre a capacidade atual e a capacidade simulada">
                  <div><span>Atual · {result.weeklyHours}h</span><i><b style={{ width: `${(result.currentCapacity / largestCapacity) * 100}%` }} /></i><strong>{formatNumber(result.currentCapacity)}h</strong></div>
                  <div><span>Simulada · 40h</span><i><b style={{ width: `${(result.simulatedCapacity / largestCapacity) * 100}%` }} /></i><strong>{formatNumber(result.simulatedCapacity)}h</strong></div>
                </div>
                <p>Diferença mensal aproximada: <strong>{formatNumber(Math.abs(result.monthlyDifference), 1)} horas</strong>, usando 52 semanas ÷ 12 meses.</p>
              </article>
            </div>

            <div className={styles.equivalencePanel}>
              <div>
                <p className={styles.eyebrow}>Equivalência matemática</p>
                <h3>{formatNumber(result.equivalentEmployeesRounded)} colaboradores a 40h</h3>
                <p>Essa é a quantidade inteira que alcança ou supera matematicamente as <strong>{formatNumber(result.currentCapacity)} horas semanais</strong> atuais. A equivalência exata é de {formatNumber(result.equivalentEmployeesExact, 2)} colaboradores.</p>
              </div>
              <aside>
                <strong>{result.equivalentDifference > 0 ? "+" : ""}{formatNumber(result.equivalentDifference, 2)}</strong>
                <span>colaboradores equivalentes</span>
                <p>Este valor compara horas contratuais. Ele não representa recomendação nem obrigação de contratação.</p>
              </aside>
            </div>

            <div className={styles.diagnosisPanel}>
              <span>Diagnóstico operacional</span>
              <h3>A matemática mostra o tamanho do impacto. A escala define como lidar com ele.</h3>
              <p>{getWorkScheduleDiagnosis(result)}</p>
            </div>

            <div className={styles.resultCta}>
              <div><span>Próximo passo</span><h3>Como reorganizar sua equipe sem comprometer a operação?</h3><p>Conheça como a PontoVit pode ajudar a organizar escalas, jornadas e folgas de maneira mais eficiente.</p></div>
              <button type="button" onClick={handleResultCta}>Agendar demonstração da PontoVit <ArrowUpRightIcon size={20} /></button>
            </div>
            <div className={styles.resultActions}>
              <button type="button" onClick={() => simulatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}>Editar ou refazer a simulação</button>
            </div>
            <p className={styles.legalDisclaimer}>Esta simulação utiliza horas contratuais nominais e não considera férias, afastamentos, intervalos, produtividade, acordos coletivos ou distribuição real dos turnos. Não representa previsão de contratação nem validação de conformidade legal.</p>
          </div>
        </section>
      ) : null}
    </>
  );
}
