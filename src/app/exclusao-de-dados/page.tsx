import { LegalPage } from "@/components/pages/legal/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Exclusão de Dados",
  "Saiba como solicitar a exclusão dos seus dados pessoais na PontoVit, em conformidade com a LGPD.",
  "/exclusao-de-dados",
);

const html = `
<p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de solicitar, a qualquer momento, a exclusão dos dados pessoais que a PontoVit tenha coletado sobre você — como nome, e-mail, telefone e demais informações fornecidas ao acessar nosso site, preencher formulários ou entrar em contato conosco.</p>
<h2>Como solicitar a exclusão</h2>
<p>Basta enviar um e-mail para <strong><a href="mailto:contato@pontovit.com.br">contato@pontovit.com.br</a></strong> informando seu nome completo e o e-mail utilizado em seu contato com a PontoVit, solicitando a exclusão dos seus dados.</p>
<h2>O que acontece depois</h2>
<p>Após a confirmação da solicitação, seus dados pessoais serão removidos de nossas bases, exceto quando houver obrigação legal de retenção por período determinado. Você também pode, pelo mesmo canal, solicitar acesso, correção ou portabilidade dos seus dados.</p>
<p>Para mais detalhes sobre como coletamos, utilizamos e protegemos seus dados, consulte nossa <a href="/politica-de-privacidade">Política de Privacidade</a>.</p>
`;

export default function DataDeletionRoute() {
  return <LegalPage eyebrow="Legal" title="Exclusão de Dados" updatedAt="03/08/2025" html={html} />;
}
