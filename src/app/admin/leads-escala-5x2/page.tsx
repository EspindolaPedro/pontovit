"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminIcon } from "@/components/admin/admin-icons";
import { WORK_SCHEDULE_SEGMENTS } from "@/lib/work-schedule-simulation";

type WorkScheduleLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  trigger: string;
  employees: number | null;
  currentScale: string | null;
  operatingDays: number | null;
  segment: string | null;
  weeklyHours: number | null;
  targetWeeklyHours: number | null;
  currentCapacity: number | null;
  simulatedCapacity: number | null;
  weeklyDifference: number | null;
  percentVariation: number | null;
  equivalentEmployees: number | null;
  equivalentEmployeesRounded: number | null;
  monthlyDifference: number | null;
  openingTime: string | null;
  closingTime: string | null;
  simultaneousCoverage: number | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  pageUrl: string | null;
  referrer: string | null;
  createdAt: string;
};

const segmentLabels = Object.fromEntries(WORK_SCHEDULE_SEGMENTS.map((segment) => [segment.value, segment.label]));

type LeadResult = {
  items: WorkScheduleLead[];
  summary: { total: number; today: number; withSimulation: number; averageEmployees: number };
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
};

const triggerLabels: Record<string, string> = {
  header: "Header",
  footer: "Rodapé",
  simulator: "Simulador",
  simulation_result: "Resultado da simulação",
  platform: "Apresentação da plataforma",
  comparison: "Comparativo",
  segments: "Segmentos",
  proof: "Prova social",
  final_cta: "CTA final",
  home: "Home",
  product_intro: "Página de escalas (intro)",
  product_access: "Página de escalas (SaaS)",
  about_page: "Quem somos",
  blog_sidebar: "Blog",
};

function buildParams(page: number, query: string, scale: string, pageSize = 25) {
  const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  if (query.trim()) params.set("q", query.trim());
  if (scale) params.set("scale", scale);
  return params;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function csvValue(value: unknown) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function getLeadPhaseMetrics(lead: WorkScheduleLead, legalLimit: 42 | 40) {
  if (!lead.employees || !lead.weeklyHours) return null;
  const appliedHours = Math.min(lead.weeklyHours, legalLimit);
  const currentCapacity = lead.employees * lead.weeklyHours;
  const capacity = lead.employees * appliedHours;
  const difference = currentCapacity - capacity;
  const equivalentEmployees = currentCapacity / appliedHours;
  return {
    appliedHours,
    capacity,
    difference,
    percent: currentCapacity > 0 ? ((capacity - currentCapacity) / currentCapacity) * 100 : 0,
    equivalentEmployees,
    equivalentEmployeesRounded: Math.ceil(equivalentEmployees),
    monthlyDifference: difference * (52 / 12),
  };
}

function LeadSimulationSummary({ lead }: { lead: WorkScheduleLead }) {
  if (!lead.employees) return <small>Contato sem simulação</small>;
  const transition = getLeadPhaseMetrics(lead, 42);
  const final = getLeadPhaseMetrics(lead, 40);
  return (
    <div className="pv-admin-lead-simulation">
      <strong>{lead.employees.toLocaleString("pt-BR")} colaboradores · {lead.segment ? segmentLabels[lead.segment] || lead.segment : lead.currentScale}</strong>
      <small>{lead.operatingDays} dias · {lead.currentScale}{lead.weeklyHours ? ` · ${lead.weeklyHours}h → ${transition?.appliedHours ?? 42}h → ${final?.appliedHours ?? 40}h` : lead.openingTime ? ` · ${lead.openingTime} às ${lead.closingTime} · cobertura de ${lead.simultaneousCoverage}` : ""}</small>
      {transition && final ? <small>{lead.currentCapacity?.toLocaleString("pt-BR") ?? (lead.employees * lead.weeklyHours!).toLocaleString("pt-BR")}h → {transition.capacity.toLocaleString("pt-BR")}h ({Math.abs(transition.percent).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%) → {final.capacity.toLocaleString("pt-BR")}h ({Math.abs(final.percent).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%)</small> : null}
    </div>
  );
}

export default function WorkScheduleLeadsPage() {
  const [result, setResult] = useState<LeadResult | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [scale, setScale] = useState("");
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      setLoading(true);
      setError("");
      fetch(`/api/admin/work-schedule-leads?${buildParams(page, query, scale)}`, { signal: controller.signal })
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Não foi possível carregar os leads.");
          return data as LeadResult;
        })
        .then(setResult)
        .catch((reason) => {
          if (reason instanceof DOMException && reason.name === "AbortError") return;
          setError(reason instanceof Error ? reason.message : "Não foi possível carregar os leads.");
        })
        .finally(() => setLoading(false));
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [page, query, scale]);

  async function exportCsv() {
    setExporting(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/work-schedule-leads?${buildParams(1, query, scale, 500)}`);
      const data = await response.json() as LeadResult & { message?: string };
      if (!response.ok) throw new Error(data.message || "Não foi possível exportar os leads.");
      const items = [...data.items];
      for (let exportPage = 2; exportPage <= data.pagination.totalPages; exportPage += 1) {
        const pageResponse = await fetch(`/api/admin/work-schedule-leads?${buildParams(exportPage, query, scale, 500)}`);
        const pageData = await pageResponse.json() as LeadResult & { message?: string };
        if (!pageResponse.ok) throw new Error(pageData.message || "Não foi possível concluir a exportação.");
        items.push(...pageData.items);
      }

      const rows = [
        ["Capturado em", "Nome", "Telefone", "E-mail", "Origem", "Segmento", "Colaboradores", "Escala atual", "Dias de funcionamento", "Jornada atual", "Capacidade atual", "Jornada fase 42h", "Capacidade fase 42h", "Diferença semanal fase 42h", "Variação fase 42h", "Jornada fase 40h", "Capacidade fase 40h", "Diferença semanal fase 40h", "Variação fase 40h", "Equivalência exata na fase 40h", "Equivalência inteira na fase 40h", "Diferença mensal na fase 40h", "UTM source", "UTM medium", "UTM campaign", "UTM term", "UTM content", "Página", "Referência"],
        ...items.map((lead) => [
          formatDate(lead.createdAt), lead.name, lead.phone, lead.email, triggerLabels[lead.trigger] || lead.trigger,
          lead.segment ? segmentLabels[lead.segment] || lead.segment : "", lead.employees, lead.currentScale, lead.operatingDays,
          lead.weeklyHours, lead.currentCapacity, getLeadPhaseMetrics(lead, 42)?.appliedHours, getLeadPhaseMetrics(lead, 42)?.capacity, getLeadPhaseMetrics(lead, 42)?.difference, getLeadPhaseMetrics(lead, 42)?.percent,
          getLeadPhaseMetrics(lead, 40)?.appliedHours, getLeadPhaseMetrics(lead, 40)?.capacity, getLeadPhaseMetrics(lead, 40)?.difference,
          getLeadPhaseMetrics(lead, 40)?.percent, getLeadPhaseMetrics(lead, 40)?.equivalentEmployees, getLeadPhaseMetrics(lead, 40)?.equivalentEmployeesRounded, getLeadPhaseMetrics(lead, 40)?.monthlyDifference,
          lead.utmSource, lead.utmMedium, lead.utmCampaign, lead.utmTerm, lead.utmContent, lead.pageUrl, lead.referrer,
        ]),
      ];
      const csv = `\uFEFF${rows.map((row) => row.map(csvValue).join(";")).join("\r\n")}`;
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `leads-escala-5x2-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível exportar os leads.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <main className="pv-admin-subpage pv-admin-leads-page">
      <header className="pv-admin-subpage-header">
        <div>
          <Link className="pv-admin-back" href="/admin">← Voltar para visão geral</Link>
          <p className="pv-admin-eyebrow">Captação da landing page</p>
          <h1>Leads da escala 5x2</h1>
          <span>Consulte os contatos e os dados informados em cada simulação.</span>
        </div>
        <button className="pv-admin-primary-action" type="button" onClick={() => void exportCsv()} disabled={exporting || !result?.items.length}>
          <AdminIcon name="upload" />{exporting ? "Gerando arquivo..." : "Exportar CSV"}
        </button>
      </header>

      <section className="pv-admin-lead-stats" aria-label="Resumo dos leads">
        <article><span>Total encontrado</span><strong>{result?.summary.total ?? 0}</strong><small>contatos</small></article>
        <article><span>Capturados hoje</span><strong>{result?.summary.today ?? 0}</strong><small>novos leads</small></article>
        <article><span>Com simulação</span><strong>{result?.summary.withSimulation ?? 0}</strong><small>dados operacionais</small></article>
        <article><span>Média de equipe</span><strong>{result?.summary.averageEmployees ?? 0}</strong><small>colaboradores</small></article>
      </section>

      <div className="pv-admin-toolbar pv-admin-lead-toolbar">
        <div>
          <input value={query} onChange={(event) => { setPage(1); setQuery(event.target.value); }} placeholder="Buscar por nome, e-mail ou telefone..." aria-label="Buscar leads" />
          <select value={scale} onChange={(event) => { setPage(1); setScale(event.target.value); }} aria-label="Filtrar por escala atual">
            <option value="">Todas as escalas</option>
            <option value="6x1">6x1</option>
            <option value="5x1">5x1</option>
            <option value="5x2">5x2</option>
            <option value="12x36">12x36</option>
            <option value="mixed">Escalas mistas / outras</option>
            <option value="Outra">Outra</option>
          </select>
        </div>
        <span>{loading ? "Atualizando..." : `${result?.pagination.total ?? 0} lead(s)`}</span>
      </div>

      {error ? <p className="pv-admin-error">{error}</p> : null}
      <div className="pv-admin-table-wrap">
        <table className="pv-admin-table pv-admin-lead-table">
          <thead><tr><th>Capturado</th><th>Lead</th><th>Origem</th><th>Simulação</th></tr></thead>
          <tbody>
            {result?.items.map((lead) => (
              <tr key={lead.id}>
                <td><strong>{new Date(lead.createdAt).toLocaleDateString("pt-BR")}</strong><small>{new Date(lead.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</small></td>
                <td className="pv-admin-lead-contact"><strong>{lead.name}</strong><a href={`tel:${lead.phone.replace(/\D/g, "")}`}>{lead.phone}</a><a href={`mailto:${lead.email}`}>{lead.email}</a></td>
                <td><span className="pv-admin-status is-draft">{triggerLabels[lead.trigger] || lead.trigger}</span></td>
                <td>
                  <LeadSimulationSummary lead={lead} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && !result?.items.length && !error ? <p className="pv-admin-empty">Nenhum lead encontrado com esses filtros.</p> : null}
      </div>

      {result && result.pagination.totalPages > 1 ? (
        <div className="pv-admin-pagination">
          <button disabled={page === 1 || loading} onClick={() => setPage((current) => current - 1)}>Anterior</button>
          <span>{page} de {result.pagination.totalPages}</span>
          <button disabled={page === result.pagination.totalPages || loading} onClick={() => setPage((current) => current + 1)}>Próxima</button>
        </div>
      ) : null}
    </main>
  );
}
