import Image from "next/image";
import { Container } from "@/components/shared/container";
import type { getPublicBrandLogos } from "@/server/modules/brand/brand.repository";

type PublicLogo = Awaited<ReturnType<typeof getPublicBrandLogos>>[number];

const partners = [
  {
    name: "Stelanto",
    logo: "/assets/parceiros/stelanto.jpeg",
    kicker: "Ponto eletrônico digital",
    description: "A Stelanto oferece ponto eletrônico digital completo, com biometria facial, geolocalização e integração com sistemas de folha. Proporciona agilidade, segurança e precisão à gestão do RH, com conformidade à Portaria 671 e à LGPD.",
  },
  {
    name: "Metadados",
    logo: "/assets/parceiros/metadados.jpeg",
    kicker: "RH mais humano e estratégico",
    description: "Soluções de ponta a ponta para um RH mais humano e estratégico. Do Departamento Pessoal à Gestão de Pessoas, a Metadados desenvolve sistemas que integram seu RH e facilitam sua rotina.",
  },
  {
    name: "AMAS MS",
    logo: "/assets/parceiros/amas.jpeg",
    kicker: "Representatividade para o varejo",
    description: "A Associação Sul-Mato-Grossense de Supermercados congrega empresários de supermercados de todo o estado de Mato Grosso do Sul. Defende os interesses dos associados e contribui para a profissionalização do setor e o fortalecimento da economia regional.",
  },
  {
    name: "Abrasel",
    logo: "/assets/parceiros/abrasel.jpeg",
    kicker: "Alimentação fora do lar",
    description: "A Associação Brasileira de Bares e Restaurantes representa e desenvolve o setor de alimentação fora do lar, construindo um Brasil mais simples e seguro de empreender e melhor para viver.",
  },
  {
    name: "Vitória Humana",
    logo: "/assets/parceiros/vitoria-humana.jpeg",
    kicker: "Psicologia, propósito e pessoas",
    description: "Fundada em Campo Grande em 2005, a Vitória Humana integra Psicologia, propósito e gestão de pessoas. Há mais de 20 anos, evolui e inova com seleção humanizada e valorização do potencial humano.",
  },
] as const;

export function PartnersPage({ partnerLogos = [] }: { partnerLogos?: PublicLogo[] }) {
  const logoFor = (name: string, fallback: string) => {
    const item = partnerLogos.find((logo) => logo.name.toLowerCase() === name.toLowerCase());
    return item ? `/api/media/${item.media.id}` : fallback;
  };
  return (
    <main className="pv-page pv-partners-page">
      <section id="conteudo" className="pv-page-section pv-partners-intro">
        <Container>
          <div className="pv-partners-heading">
            <div>
              <p className="eyebrow">Quem está com a gente</p>
              <h2>Parcerias que <strong>fortalecem</strong> a operação.</h2>
            </div>
            <p>Empresas e entidades que compartilham o compromisso de simplificar a rotina e desenvolver negócios mais preparados.</p>
          </div>

          <article className="pv-stelanto-feature">
            <div className="pv-stelanto-logo">
              <Image src={logoFor("Stelanto", "/assets/parceiros-novos/Logo Stelanto.png")} alt="Logo Stelanto" width={520} height={100} />
            </div>
            <div className="pv-stelanto-copy">
              <p className="eyebrow">PontoVit + Stelanto</p>
              <h2>Duas especialistas. Uma <strong>plataforma integrada.</strong></h2>
              <p>{partners[0].description}</p>
              <div className="pv-stelanto-pillars">
                <div>
                  <strong>Gestão de escalas</strong>
                  <ul><li>Escalas e turnos organizados</li><li>Validação trabalhista</li><li>Gestão de jornadas</li></ul>
                </div>
                <div>
                  <strong>Tecnologia de ponto</strong>
                  <ul><li>Ponto eletrônico + facial</li><li>Banco de horas automatizado</li><li>Integração com folha</li></ul>
                </div>
              </div>
            </div>
          </article>

          <div className="pv-partners-grid">
            {partners.slice(1).map((partner, index) => (
              <article key={partner.name} className={`pv-partner-card${index % 2 === 1 ? " is-warm" : ""}`}>
                <div className="pv-partner-card-top">
                  <span>0{index + 1}</span>
                  <div className="pv-partner-logo"><Image src={logoFor(partner.name, partner.logo)} alt={`Logo ${partner.name}`} width={220} height={100} /></div>
                </div>
                <p className="pv-partner-kicker">{partner.kicker}</p>
                <h3>{partner.name}</h3>
                <p className="pv-partner-description">{partner.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

    </main>
  );
}
