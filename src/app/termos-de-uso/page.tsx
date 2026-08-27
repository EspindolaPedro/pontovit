import { LegalPage } from "@/components/pages/legal/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Termos de Uso",
  "Condições de uso da plataforma PontoVit para gestão de escalas, jornadas e registro de ponto.",
  "/termos-de-uso/",
);

const html = `
<p>Estes Termos de Uso regulam o acesso e a utilização da plataforma PontoVit, oferecida pela Vitória Humana Sistemas ("PontoVit"), por empresas e usuários que contratam ou utilizam nossos serviços de gestão de escalas, jornadas de trabalho e registro de ponto. Ao acessar o site ou utilizar a plataforma, você concorda com as condições descritas abaixo.</p>

<h2>1. Sobre o serviço</h2>
<p>A PontoVit é um sistema de gestão de escalas de trabalho, jornadas e controle de ponto, oferecido via web para empresas organizarem a operação de suas equipes. O acesso pode ser feito diretamente pela empresa contratante ou por colaboradores autorizados por ela.</p>

<h2>2. Cadastro e conta</h2>
<p>Para utilizar a plataforma, é necessário realizar um cadastro com informações verdadeiras, completas e atualizadas. Você é responsável por manter a confidencialidade das credenciais de acesso da sua conta e por todas as atividades realizadas nela. Avise-nos imediatamente em caso de uso não autorizado.</p>

<h2>3. Uso aceitável</h2>
<p>Ao utilizar a PontoVit, você se compromete a:</p>
<ul>
<li>Usar a plataforma apenas para os fins a que se destina — gestão de escalas, jornadas e registro de ponto;</li>
<li>Não tentar acessar áreas restritas, dados de outras empresas ou realizar engenharia reversa do sistema;</li>
<li>Não utilizar a plataforma para fins ilícitos ou que violem direitos de terceiros;</li>
<li>Manter a veracidade das informações cadastradas sobre sua empresa e colaboradores.</li>
</ul>

<h2>4. Planos, contratação e pagamento</h2>
<p>O acesso à plataforma pode estar sujeito a planos e condições comerciais específicas, apresentadas no momento da contratação. Valores, formas de pagamento e periodicidade são acordados diretamente com nossa equipe comercial e podem ser reajustados mediante aviso prévio.</p>

<h2>5. Propriedade intelectual</h2>
<p>Todo o conteúdo da plataforma — incluindo marca, layout, textos, funcionalidades e código-fonte — é de propriedade da PontoVit/Vitória Humana Sistemas e protegido por lei. É vedada a reprodução, distribuição ou uso comercial não autorizado de qualquer parte do sistema.</p>

<h2>6. Disponibilidade do serviço</h2>
<p>Empregamos esforços razoáveis para manter a plataforma disponível e funcionando corretamente, mas não garantimos disponibilidade ininterrupta. Poderão ocorrer interrupções programadas para manutenção ou eventos fora do nosso controle, e buscaremos sempre minimizar impactos e comunicar previamente quando possível.</p>

<h2>7. Limitação de responsabilidade</h2>
<p>A PontoVit é uma ferramenta de apoio à gestão de escalas e jornadas. A empresa contratante permanece responsável pela conformidade de suas práticas trabalhistas com a legislação vigente (CLT e normas aplicáveis). Não nos responsabilizamos por decisões de gestão tomadas com base nos dados da plataforma, nem por danos indiretos decorrentes do uso do serviço.</p>

<h2>8. Dados pessoais</h2>
<p>O tratamento de dados pessoais realizado pela PontoVit segue o disposto em nossa <a href="/politica-de-privacidade/">Política de Privacidade</a>, em conformidade com a LGPD.</p>

<h2>9. Cancelamento e suspensão</h2>
<p>Você pode solicitar o cancelamento do serviço a qualquer momento, pelos canais de contato informados abaixo. Reservamo-nos o direito de suspender ou encerrar o acesso de contas que violem estes Termos de Uso, mediante aviso quando possível.</p>

<h2>10. Alterações nestes termos</h2>
<p>Estes Termos de Uso podem ser atualizados periodicamente para refletir melhorias na plataforma ou mudanças legais. Recomendamos consultá-los com regularidade. O uso continuado da plataforma após alterações implica concordância com os novos termos.</p>

<h2>11. Contato</h2>
<p>Dúvidas sobre estes Termos de Uso podem ser enviadas para <strong><a href="mailto:contato@pontovit.com.br">contato@pontovit.com.br</a></strong>.</p>
`;

export default function TermsOfUseRoute() {
  return <LegalPage eyebrow="Legal" title="Termos de Uso" updatedAt="27/08/2026" html={html} />;
}
