import { LegalPage } from "@/components/pages/legal/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Política de Privacidade",
  "Saiba como a PontoVit coleta, utiliza e protege seus dados pessoais, em conformidade com a LGPD.",
  "/politica-de-privacidade",
);

const html = `
<p>Na PontoVit, levamos a sua privacidade a sério. Esta Política de Privacidade explica como coletamos, utilizamos e protegemos seus dados pessoais ao acessar nosso site ou utilizar nossos serviços.</p>
<h2>1. Quais dados coletamos?</h2>
<p>Ao navegar pelo nosso site, preencher formulários ou entrar em contato conosco, podemos coletar:</p>
<ul>
<li>Nome completo</li>
<li>E-mail</li>
<li>Telefone</li>
<li>Cargo e nome da empresa</li>
<li>Informações sobre o uso da plataforma (como número de funcionários, processo atual de escala, etc.)</li>
<li>Dados de navegação (cookies, IP, localização aproximada)</li>
</ul>
<h2>2. Como usamos suas informações</h2>
<p>Utilizamos seus dados para:</p>
<ul>
<li>Entrar em contato com você e apresentar nossa solução</li>
<li>Melhorar a sua experiência em nosso site</li>
<li>Enviar conteúdos relevantes sobre gestão de escalas e operação</li>
<li>Oferecer suporte e atendimento personalizado</li>
</ul>
<h2>3. Compartilhamento de dados</h2>
<p>Seus dados <strong>não são vendidos nem repassados a terceiros</strong>. Poderemos compartilhá-los apenas com parceiros essenciais para prestação do serviço (como plataformas de CRM e envio de e-mails), sempre com segurança.</p>
<h2>4. Segurança das informações</h2>
<p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados, perda ou alteração.</p>
<h2>5. Seus direitos</h2>
<p>De acordo com a LGPD, você pode a qualquer momento:</p>
<ul>
<li>Solicitar acesso aos seus dados</li>
<li>Corrigir informações</li>
<li>Solicitar a exclusão ou portabilidade dos seus dados</li>
</ul>
<p>Basta enviar um e-mail para: <strong><a href="mailto:privacidade@pontovit.com.br">privacidade@pontovit.com.br</a></strong></p>
<h2>6. Uso de cookies</h2>
<p>Utilizamos cookies para melhorar sua navegação e oferecer conteúdo mais relevante. Você pode desativá-los nas configurações do seu navegador.</p>
<h2>7. Alterações nesta política</h2>
<p>Esta política pode ser atualizada a qualquer momento. Recomendamos consultá-la periodicamente.</p>
`;

export default function PrivacyPolicyRoute() {
  return <LegalPage eyebrow="Legal" title="Política de Privacidade" updatedAt="03/08/2025" html={html} />;
}
