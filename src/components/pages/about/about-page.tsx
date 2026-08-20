import Image from "next/image";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { ButtonLink } from "@/components/shared/button-link";
import { Reveal } from "@/components/shared/reveal";
import { ScrollTimeline } from "@/components/shared/scroll-timeline";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { CompanyIcon, UsersIcon } from "@/components/shared/feature-icons";
import { aboutAudience, aboutPurpose, aboutTimeline } from "@/data/home";

export function AboutPage() {
  return (
    <main className="pv-page pv-about-page">
      <PageHero eyebrow="Quem somos" title={<>A pioneira em gestão de <strong>Escalas de Trabalho</strong> no Brasil.</>} description="Nossa missão é resolver um problema que afeta muitas pessoas em seu cotidiano: a distribuição de horários, turnos e jornadas de trabalho." visual="story" video="https://www.youtube.com/embed/WJl87KyZeGc?autoplay=1&mute=1&loop=1&playlist=WJl87KyZeGc" />

      <section id="conteudo" className="pv-page-section pv-story-section">
        <Container>
          <Reveal className="pv-story-intro">
            <div><p className="eyebrow">Nossa história</p><h2>Da identificação do problema à construção de uma <strong>plataforma própria.</strong></h2></div>
            <p>Pode-se dizer que a PontoVit é filha da Vitória Humana Sistemas e nasceu da identificação de uma dor em empresas de porte médio quando se tratava da necessidade de organizar escalas de trabalho.</p>
          </Reveal>
          <ScrollTimeline>
            <div className="pv-timeline-v">
              {aboutTimeline.map(({ year, title, text, icon: Icon }, index) => (
                <Reveal key={year} delay={index * 100} className="pv-timeline-v-item">
                  <span className="pv-timeline-v-dot"><Icon size={19} /></span>
                  <span className="pv-timeline-v-year">{year}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </ScrollTimeline>
        </Container>
      </section>

      <section className="pv-page-section pv-purpose-section">
        <Container>
          <div className="pv-purpose-grid">
            <Reveal className="pv-photo-panel pv-purpose-photo">
              <Image src="/assets/people/modelo-pontovit.png" alt="Representante da PontoVit apresentando a plataforma" width={1024} height={1536} />
              <span className="pv-photo-panel-tag">Desde 2011</span>
            </Reveal>
            <Reveal delay={120} className="pv-purpose-copy">
              <p className="eyebrow">Nosso propósito</p>
              <h2>{aboutPurpose.title}</h2>
              <p>{aboutPurpose.text}</p>
              <p>Estamos aqui para tornar essa tarefa mais fácil e, o que é ainda mais importante, para proporcionar harmonia onde antes reinavam conflitos e muito estresse.</p>
              <ButtonLink href={getWhatsAppUrl()} target="_blank" rel="noreferrer" className="mt-8">Conhecer a PontoVit</ButtonLink>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="publico-alvo" className="pv-page-section pv-audience-section">
        <Container>
          <div className="pv-icon-card-grid is-cols-2">
            <Reveal><article className="pv-icon-card"><span className="pv-icon-card-icon"><UsersIcon size={24} /></span><h3>{aboutAudience.title}</h3><p>{aboutAudience.text}</p></article></Reveal>
            <Reveal delay={100}><article className="pv-icon-card is-yellow"><span className="pv-icon-card-icon"><CompanyIcon size={24} /></span><h3>O que acreditamos</h3><p>Acreditamos que todos merecem uma rotina de trabalho mais tranquila e equilibrada, e estamos comprometidos em fazer isso acontecer.</p></article></Reveal>
          </div>
        </Container>
      </section>

    </main>
  );
}
