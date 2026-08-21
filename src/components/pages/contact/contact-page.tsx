import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { ButtonLink } from "@/components/shared/button-link";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { ArrowUpRightIcon, CheckIcon } from "@/components/shared/icons";

const questions = [
  ["Como faço para adquirir a PontoVit?", "Solicite uma conversa com nosso time comercial. A demonstração ajuda a entender quais módulos fazem sentido para sua operação."],
  ["É possível utilizar o sistema em diversas unidades?", "Sim. A PontoVit é multiempresa e multiusuário e pode ser usada em diferentes setores ou lojas de uma mesma rede."],
  ["Quais formatos de escala posso organizar?", "A plataforma acompanha diferentes jornadas, turnos, folgas e regras definidas para cada operação."],
  ["Por que ter escalas organizadas é importante?", "Uma escala bem estruturada reduz conflitos, melhora a comunicação e ajuda a acompanhar as regras aplicáveis à jornada."],
] as const;

export function ContactPage() {
  const contactUrl = getWhatsAppUrl("Olá! Vim pelo site e gostaria de falar com um especialista sobre a PontoVit.");

  return (
    <main className="pv-page">
      <PageHero
        eyebrow="Contato"
        title="Converse com quem entende da sua operação."
        description="Tire dúvidas, conte como sua empresa organiza as jornadas hoje e veja como a PontoVit pode ajudar."
        visual="contact"
        image="/assets/people/retail-supervisor.png"
        imageAlt="Especialista PontoVit"
      />

      <section id="conteudo" className="pv-page-section pv-contact-section">
        <Container>
          <div className="pv-contact-heading">
            <div>
              <p className="eyebrow">Fale com um especialista</p>
              <h2>O próximo passo é uma conversa.</h2>
            </div>
            <p>Nosso atendimento comercial acontece pelo WhatsApp. Envie uma mensagem e explique o que sua operação precisa.</p>
          </div>

          <div className="pv-contact-options">
            <a href={contactUrl} target="_blank" rel="noreferrer" className="pv-contact-option pv-contact-option-primary">
              <span className="pv-contact-option-number">01</span>
              <div>
                <h3>Quero conhecer a plataforma</h3>
                <p>Entenda como a PontoVit organiza escalas e jornadas.</p>
              </div>
              <ArrowUpRightIcon size={22} />
            </a>
            <a href="mailto:contato@pontovit.com.br" className="pv-contact-option">
              <span className="pv-contact-option-number">02</span>
              <div>
                <h3>Tenho uma dúvida</h3>
                <p>Fale com nosso time sobre a realidade da sua operação.</p>
              </div>
              <ArrowUpRightIcon size={22} />
            </a>
            <div className="pv-contact-option pv-contact-option-info">
              <span className="pv-contact-option-number">03</span>
              <div>
                <h3>Atendimento PontoVit</h3>
                <p>contato@pontovit.com.br<br />Campo Grande · Porto Alegre</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pv-page-section pv-faq-section">
        <Container>
          <div className="pv-faq-heading">
            <p className="eyebrow">Perguntas frequentes</p>
            <h2>Antes da demonstração,<br /><strong>algumas respostas.</strong></h2>
            <p>Se ainda ficou alguma dúvida, fale diretamente com nosso time.</p>
          </div>
          <div className="pv-faq-list">
            {questions.map(([question, answer], index) => (
              <details key={question} className="pv-faq-item">
                <summary><span>0{index + 1}</span>{question}<b>+</b></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
          <div className="pv-contact-promises">
            <span><CheckIcon size={16} /> Sem compromisso</span>
            <span><CheckIcon size={16} /> Conversa personalizada</span>
            <span><CheckIcon size={16} /> Atendimento humano</span>
          </div>
        </Container>
      </section>

      <section className="pv-page-section pv-contact-cta">
        <Container>
          <div>
            <p className="eyebrow">Pronto para organizar melhor?</p>
            <h2>Vamos entender sua operação.</h2>
          </div>
          <ButtonLink href={contactUrl} target="_blank" rel="noreferrer">Solicitar demonstração</ButtonLink>
        </Container>
      </section>
    </main>
  );
}
