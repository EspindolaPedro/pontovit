import Image from "next/image";
import { testimonials } from "@/data/home";
import { ArrowRightIcon, ArrowUpRightIcon, BuildingIcon, CheckIcon, FuelIcon, QuoteIcon, RestaurantIcon, StoreIcon, XIcon } from "@/components/shared/icons";
import { ApprovalIcon, CalendarIcon, ChartIcon, CompanyIcon, LayersIcon, NetworkIcon, UsersIcon } from "@/components/shared/feature-icons";
import { ScheduleSimulator } from "./schedule-simulator";
import { LeadCaptureButton } from "@/components/shared/lead-capture";
import styles from "./landing-page.module.css";

type ClientLogo = { src: string; alt: string };

const platformFeatures = [
  { title: "Gestão de escalas", text: "Planeje diferentes jornadas e distribua turnos e folgas com mais facilidade.", icon: CalendarIcon },
  { title: "Organização de equipes", text: "Gerencie colaboradores por setores, funções e unidades.", icon: UsersIcon },
  { title: "Planejamento mais eficiente", text: "Organize a cobertura dos horários conforme as necessidades da operação.", icon: ChartIcon },
  { title: "Menos trabalho manual", text: "Simplifique a rotina dos gestores e reduza o retrabalho na elaboração das escalas.", icon: ApprovalIcon },
  { title: "Mais controle", text: "Acompanhe jornadas, horários e equipes em uma plataforma centralizada.", icon: NetworkIcon },
];

const comparison = {
  without: ["Planilhas e controles separados", "Dificuldade para distribuir folgas", "Alterações manuais frequentes", "Falta de visibilidade sobre as equipes", "Mais tempo organizando turnos"],
  with: ["Escalas organizadas em uma única plataforma", "Planejamento centralizado das folgas", "Mais facilidade para ajustar jornadas", "Visibilidade sobre equipes e turnos", "Menos tempo dedicado às tarefas manuais"],
};

const steps = [
  { title: "Organize seus colaboradores", text: "Centralize informações sobre funcionários, setores, funções e unidades.", icon: UsersIcon },
  { title: "Planeje as novas jornadas", text: "Estruture turnos e períodos de descanso conforme a demanda e as regras aplicáveis.", icon: CalendarIcon },
  { title: "Distribua as equipes", text: "Visualize a programação e organize a cobertura de cada horário.", icon: LayersIcon },
  { title: "Acompanhe sua operação", text: "Mantenha as escalas atualizadas e simplifique os ajustes necessários.", icon: ChartIcon },
];

const segments = [
  { title: "Supermercados", text: "Organize caixas, repositores, atendentes e outros setores sem perder a visibilidade.", number: "01", icon: StoreIcon },
  { title: "Restaurantes", text: "Planeje turnos e folgas considerando os horários de maior movimento.", number: "02", icon: RestaurantIcon },
  { title: "Postos de combustíveis", text: "Gerencie equipes e revezamentos em operações com horários prolongados.", number: "03", icon: FuelIcon },
  { title: "Redes e múltiplas unidades", text: "Centralize o planejamento de diferentes equipes e estabelecimentos.", number: "04", icon: BuildingIcon },
];

const faqs = [
  ["Minha empresa precisa fechar aos domingos?", "Não necessariamente. Empresas que funcionam aos finais de semana podem organizar escalas com revezamento, observando as regras legais e coletivas aplicáveis. Pela EC 141/2026, um dos dias de repouso é preferencialmente aos domingos."],
  ["A escala 5x2 exige contratar mais funcionários?", "Depende da estrutura, da demanda por horário e da quantidade de colaboradores disponíveis. Uma simulação inicial ajuda a identificar necessidades de reorganização, mas não substitui uma análise detalhada por função e turno."],
  ["Como organizar as folgas dos colaboradores?", "É necessário considerar jornada, demanda operacional, períodos de descanso e regras aplicáveis. A PontoVit ajuda a centralizar esse planejamento e a visualizar a distribuição das equipes."],
  ["Posso utilizar a PontoVit em diferentes unidades?", "Sim. A plataforma permite organizar equipes, setores e escalas de diferentes empresas e unidades."],
  ["A calculadora mostra quantos funcionários preciso contratar?", "Não. Ela apresenta uma estimativa operacional inicial. A quantidade efetivamente necessária depende de intervalos, funções, turnos, férias, ausências e regras coletivas."],
  ["A PontoVit funciona apenas com a escala 5x2?", "Não. A plataforma permite planejar diferentes modelos de escalas e jornadas, incluindo revezamentos e turnos alternados."],
] as const;

function CtaLink({ trigger, children, secondary = false }: { trigger: string; children: React.ReactNode; secondary?: boolean }) {
  return <LeadCaptureButton className={`${styles.cta}${secondary ? ` ${styles.ctaSecondary}` : ""}`} trigger={trigger}><span>{children}</span><i><ArrowUpRightIcon size={19} /></i></LeadCaptureButton>;
}

export function WorkScheduleLandingPage({ clientLogos }: { clientLogos: ClientLogo[] }) {
  const loopedLogos = [...clientLogos, ...clientLogos];

  return (
    <main className={styles.page}>
      <ScheduleSimulator />

      <section className={styles.problemSection} aria-labelledby="problem-title">
        <div className={styles.problemShape} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.problemGrid}>
            <div className={styles.problemCopy}>
              <p className={styles.eyebrowLight}>O desafio da transição</p>
              <h2 id="problem-title">Duas folgas por semana. <em>Sua empresa funcionando todos os dias.</em></h2>
              <p>A nova escala 5x2 muda a forma de organizar equipes. Para operações que funcionam aos finais de semana, cada folga precisa conversar com a demanda real.</p>
              <div className={styles.problemQuestions}>
                <p><span>01</span>Como distribuir as folgas sem deixar setores descobertos?</p>
                <p><span>02</span>Como reorganizar turnos sem comprometer o atendimento?</p>
                <p><span>03</span>Como manter tudo atualizado para dezenas ou centenas de pessoas?</p>
              </div>
              <strong>Planilhas e ajustes manuais tornam esse planejamento mais lento justamente quando a empresa precisa de clareza.</strong>
            </div>
            <div className={styles.problemVisual}>
              <span className={styles.floatingLabel}>Operação em movimento</span>
              <div className={styles.managerCutout}>
                <Image src="/assets/lp-escala-de-trabalho/operations-manager-refined.png" alt="Gestora de operações com um tablet" width={1024} height={1536} sizes="(max-width: 720px) 86vw, 520px" />
                <div className={styles.tabletScreen} aria-hidden="true">
                  <div className={styles.tabletBrand}><i />PontoVit</div>
                  <div className={styles.tabletTitle}><strong>Escala semanal</strong><span>Equipe</span></div>
                  <div className={styles.tabletRows}><span /><span /><span /><span /></div>
                </div>
              </div>
              <div className={styles.floatingSchedule}>
                <span>Folgas da semana</span>
                <div><i /><i /><i className={styles.isOrange} /><i /><i className={styles.isOrange} /><i /><i /></div>
                <strong>Visibilidade para planejar</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.platformSection} aria-labelledby="platform-title">
        <div className={styles.container}>
          <div className={styles.platformHeading}>
            <div><p className={styles.eyebrow}>Conheça a PontoVit</p><h2 id="platform-title">A maneira inteligente de <em>organizar suas escalas.</em></h2></div>
            <p>A PontoVit centraliza jornadas, turnos, folgas e equipes para dar mais visibilidade a quem planeja e mais previsibilidade a quem opera.</p>
          </div>
          <div className={styles.productStage}>
            <span className={styles.productOrbit} aria-hidden="true" />
            <div className={styles.productBadge}><CompanyIcon size={21} /><span><strong>Multiempresa</strong>Organize unidades em um só ambiente</span></div>
            <Image src="/assets/lp-escala-de-trabalho/product-notebook-hd.png" alt="Tela real do sistema PontoVit exibindo uma escala de trabalho" width={1561} height={1007} sizes="(max-width: 720px) 104vw, 980px" />
            <div className={styles.productMiniCard}><CalendarIcon size={22} /><span><strong>5x2, 12x36 e mais</strong>Planeje jornadas diferentes</span></div>
          </div>
          <div className={styles.featureGrid}>
            {platformFeatures.map(({ title, text, icon: Icon }, index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><Icon size={25} /><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <div className={styles.centerCta}><CtaLink trigger="platform">Conhecer a PontoVit</CtaLink></div>
        </div>
      </section>

      <section className={styles.comparisonSection} aria-labelledby="comparison-title">
        <div className={styles.container}>
          <div className={styles.comparisonHeading}><p className={styles.eyebrowLight}>Evolua a gestão</p><h2 id="comparison-title">A legislação mudou. <em>Sua gestão de escalas também precisa evoluir.</em></h2></div>
          <div className={styles.comparisonGrid}>
            <article className={styles.comparisonWithout}><span>Sem uma gestão estruturada</span><ul>{comparison.without.map((item) => <li key={item}><i><XIcon size={16} /></i>{item}</li>)}</ul></article>
            <div className={styles.comparisonDivider} aria-hidden="true"><span><ArrowRightIcon size={20} /></span></div>
            <article className={styles.comparisonWith}><span>Com a PontoVit</span><ul>{comparison.with.map((item) => <li key={item}><i><CheckIcon size={16} /></i>{item}</li>)}</ul></article>
          </div>
          <div className={styles.comparisonFooter}><p>Sua equipe cuida da operação. <strong>A PontoVit simplifica o planejamento.</strong></p><CtaLink trigger="comparison">Simplificar minhas escalas</CtaLink></div>
        </div>
      </section>

      <section className={styles.stepsSection} aria-labelledby="steps-title">
        <div className={styles.container}>
          <div className={styles.stepsHeading}><p className={styles.eyebrow}>Como funciona</p><h2 id="steps-title">Da escala 6x1 para a 5x2: <em>simplifique a transição.</em></h2><p>Mais organização para sua empresa. Mais facilidade para seus gestores.</p></div>
          <div className={styles.stepsGrid}>
            {steps.map(({ title, text, icon: Icon }, index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><Icon size={27} /></div><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className={styles.segmentsSection} aria-labelledby="segments-title">
        <div className={styles.container}>
          <div className={styles.segmentsHeading}><p className={styles.eyebrow}>Operações contínuas</p><h2 id="segments-title">Sua empresa não fecha aos finais de semana? <em>A PontoVit ajuda a planejar.</em></h2></div>
          <div className={styles.segmentsComposition}>
            <div className={styles.segmentCards}>{segments.map(({ title, text, number, icon: Icon }) => <article key={title}><div className={styles.segmentIcon}><Icon size={25} /></div><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
            <div className={styles.teamVisual}>
              <span className={styles.teamHalo} aria-hidden="true" />
              <Image src="/assets/lp-escala-de-trabalho/equipe-operacional.png" alt="Equipe diversa de profissionais de supermercado, restaurante, posto e gestão" width={1536} height={1024} sizes="(max-width: 720px) 120vw, 760px" />
              <div className={`${styles.teamBadge} ${styles.teamBadgeCoverage}`}><CalendarIcon size={21} /><span><strong>Cobertura planejada</strong>em todos os dias da semana</span></div>
              <div className={`${styles.teamBadge} ${styles.teamBadgeTeams}`}><NetworkIcon size={22} /><span><strong>Equipes conectadas</strong>por setor, função e unidade</span></div>
              <div className={`${styles.teamBadge} ${styles.teamBadgeControl}`}><ChartIcon size={21} /><span><strong>Operação visível</strong>em diferentes turnos</span></div>
            </div>
          </div>
          <CtaLink trigger="segments">Descobrir como a PontoVit pode ajudar</CtaLink>
        </div>
      </section>

      <section className={styles.proofSection} aria-labelledby="proof-title">
        <div className={styles.container}>
          <div className={styles.proofHeading}><div><p className={styles.eyebrow}>Quem já organiza melhor</p><h2 id="proof-title">Empresas já contam com a PontoVit para organizar suas operações.</h2></div><p>Clientes de diferentes segmentos usam a plataforma para manter equipes, jornadas e escalas em ordem.</p></div>
        </div>
        <div className={styles.logoMarquee} aria-label="Clientes da PontoVit">
          <div>{loopedLogos.map((logo, index) => <span key={`${logo.src}-${index}`}><img src={logo.src} alt={index < clientLogos.length ? logo.alt : ""} aria-hidden={index >= clientLogos.length || undefined} /></span>)}</div>
        </div>
        <div className={styles.container}>
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial) => <blockquote key={testimonial.name}><span className={styles.quoteIcon} aria-hidden="true"><QuoteIcon size={34} /></span><p>{testimonial.quote}</p><footer><strong>{testimonial.name}</strong><small>{testimonial.company}</small></footer></blockquote>)}
          </div>
          <div className={styles.proofProduct}>
            <div><p className={styles.eyebrowLight}>Produto real</p><h3>Uma visão central para uma operação que acontece em muitos lugares.</h3><p>Acesse escalas e equipes pelo navegador em diferentes dispositivos.</p><CtaLink trigger="proof">Quero conhecer a plataforma</CtaLink></div>
            <Image src="/assets/lp-escala-de-trabalho/product-devices-hd.png" alt="Sistema PontoVit em notebook, monitor e celular" width={1698} height={926} sizes="(max-width: 720px) 100vw, 760px" />
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className={styles.container}>
          <div className={styles.faqGrid}>
            <div className={styles.faqIntro}><p className={styles.eyebrow}>Dúvidas frequentes</p><h2 id="faq-title">Perguntas sobre a escala 5x2.</h2><p>Respostas iniciais para quem está começando a planejar a transição.</p></div>
            <div className={styles.faqList}>{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{question}</span><i aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="final-cta-title">
        <span className={styles.finalOrbit} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.finalCtaInner}>
            <div><p className={styles.eyebrowLight}>Comece agora</p><h2 id="final-cta-title">A escala 5x2 está chegando. <em>Sua empresa já sabe como vai se adaptar?</em></h2><p>Não espere a mudança acontecer para começar a reorganizar suas equipes. Conheça uma solução criada para facilitar a gestão de escalas da sua operação.</p></div>
            <div className={styles.finalCtaAction}><span>Solicite uma demonstração personalizada.</span><CtaLink trigger="final_cta" secondary>Quero preparar minha empresa</CtaLink><small>PontoVit — Gestão inteligente de escalas de trabalho.</small></div>
          </div>
        </div>
      </section>
    </main>
  );
}
