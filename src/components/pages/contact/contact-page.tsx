import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/pages/contact/contact-form";

const questions = [
  ["Como faço para adquirir a PontoVit?", "Solicite uma conversa com nosso time comercial. A demonstração ajuda a entender quais módulos fazem sentido para sua operação."],
  ["É possível utilizar o sistema em diversas unidades?", "Sim. A PontoVit é multiempresa e multiusuário e pode ser usada em diferentes setores ou lojas de uma mesma rede."],
  ["Quais formatos de escala posso organizar?", "A plataforma acompanha diferentes jornadas, turnos, folgas e regras definidas para cada operação."],
  ["Por que ter escalas organizadas é importante?", "Uma escala bem estruturada reduz conflitos, melhora a comunicação e ajuda a acompanhar as regras aplicáveis à jornada."],
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export function ContactPage() {
  return (
    <main className="pv-page pv-contact-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero
        eyebrow="Contato"
        title="Converse com quem entende da sua operação."
        description="Tire dúvidas, conte como sua empresa organiza as jornadas hoje e veja como a PontoVit pode ajudar."
        visual="contact"
        aside={<ContactForm />}
      />

      <section id="conteudo" className="pv-page-section pv-faq-section">
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
        </Container>
      </section>

    </main>
  );
}
