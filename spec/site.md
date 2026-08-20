# `site.md` — PontoVit Website 2026

## 1. Objetivo deste documento

Este arquivo é a fonte de verdade para desenvolvimento do novo site institucional da PontoVit.

O site atual deverá ser completamente redesenhado.

NÃO replicar visualmente o site antigo.

O site antigo deve ser usado apenas como fonte para:

* conteúdo;
* funcionalidades;
* argumentos comerciais;
* clientes;
* parceiros;
* depoimentos;
* identidade da marca;
* screenshots do produto;
* informações institucionais.

A nova interface deve seguir uma direção visual contemporânea, premium, clean e orientada a produto.

---

# 2. Sobre a PontoVit

A PontoVit é uma plataforma B2B para gestão de escalas de trabalho, jornadas, turnos e equipes.

O sistema ajuda empresas a:

* montar escalas de trabalho;
* analisar escalas;
* autorizar escalas;
* divulgar/imprimir escalas;
* padronizar escalas entre setores;
* gerenciar diferentes unidades e empresas;
* controlar permissões por usuário;
* respeitar regras trabalhistas;
* reduzir erros operacionais;
* reduzir retrabalho;
* economizar tempo do RH e gestores;
* melhorar a alocação de colaboradores;
* acompanhar a operação através de dashboards;
* acessar o sistema pela web;
* gerenciar equipes remotamente.

O produto atende especialmente operações que trabalham com turnos e escalas.

Exemplos:

* supermercados;
* varejo;
* atacados;
* postos de combustíveis;
* condomínios;
* indústrias;
* farmácias;
* shoppings;
* empresas de serviços;
* operações com múltiplas unidades;
* empresas com equipes que trabalham por jornada/turno.

---

# 3. Posicionamento

A PontoVit NÃO deve ser apresentada apenas como:

> “um programa para fazer escalas”.

Devemos posicioná-la como:

> Uma plataforma de inteligência operacional para organizar equipes, jornadas e escalas com mais previsibilidade, eficiência e segurança.

Pilares da comunicação:

1. Eficiência operacional
2. Economia de tempo
3. Redução de erros
4. Gestão centralizada
5. Escalas inteligentes
6. Segurança e conformidade
7. Previsibilidade
8. Gestão de equipes em múltiplas unidades

---

# 4. Regra comercial extremamente importante

## NÃO EXISTE PREÇO NO SITE.

Não criar:

* seção de planos;
* pricing;
* mensalidade;
* tabela de valores;
* “a partir de”;
* teste gratuito baseado em preço;
* comparativo de planos.

Toda intenção comercial deverá levar para contato humano.

CTA principal:

> Agendar demonstração

CTA secundário:

> Falar com um especialista

Ambos devem direcionar para WhatsApp.

WhatsApp comercial inicial:

`https://wa.me/5551992998338`

Deixar o telefone e a mensagem configuráveis em um arquivo central.

Exemplo:

```ts
export const siteConfig = {
  whatsapp: "5551992998338",
}
```

Nunca espalhar números hardcoded pelos componentes.

Criar helper responsável por montar links do WhatsApp.

Mensagem sugerida:

> Olá! Conheci a PontoVit pelo site e gostaria de entender como a plataforma pode ajudar na gestão de escalas da minha empresa.

URL deverá usar a mensagem encoded.

---

# 5. Principal objetivo da home

A home não deve tentar explicar absolutamente tudo.

Ela deve fazer o visitante entender rapidamente:

1. O que é a PontoVit.
2. Qual problema resolve.
3. Por que é diferente de fazer escalas manualmente.
4. Como o software funciona.
5. Para quais empresas serve.
6. Que empresas reais usam.
7. Quais benefícios entrega.
8. Por que confiar.
9. Como solicitar uma demonstração.

Conversão principal:

**WhatsApp / demonstração comercial.**

---

# 6. Direção visual

Referências fornecidas pelo cliente devem ser tratadas como referência de:

* composição;
* grid;
* ritmo;
* hierarquia;
* navegação;
* espaçamento;
* tamanho de títulos;
* apresentação de screenshots;
* cards;
* curvas e divisores;
* alternância de seções;
* visual premium.

NÃO copiar literalmente nenhuma referência.

A nova PontoVit deve parecer uma marca própria.

---

# 7. Personalidade da interface

Cinco palavras:

* moderna;
* tecnológica;
* confiável;
* humana;
* precisa.

Sensação desejada:

> software B2B consolidado, tecnológico e simples de usar.

Evitar sensação de:

* template genérico;
* “site de IA”;
* startup cripto;
* landing page de infoproduto;
* site governamental;
* site antigo de departamento de RH;
* excesso de elementos decorativos.

---

# 8. Design principles

## 8.1 Muito espaço em branco

Não ter medo de áreas vazias.

Desktop:

```css
section {
  padding-block: 120px;
}
```

Seções especiais podem atingir:

```css
padding-block: 144px;
```

Mobile naturalmente deverá reduzir.

---

## 8.2 Grid consistente

Container principal:

```css
max-width: 1280px;
margin-inline: auto;
padding-inline: 24px;
```

Desktop:

* grid de 12 colunas;
* gaps consistentes;
* alinhamento vertical extremamente cuidadoso.

Não permitir que cada seção tenha uma largura aleatória.

---

# 9. Paleta

A identidade existente laranja deve permanecer.

Entretanto, o laranja passa a ser ACENTO, não fundo predominante.

Direção aproximada:

```css
--background: #ffffff;
--background-soft: #f6f7f8;
--background-warm: #fff8f1;

--foreground: #101010;
--foreground-secondary: #525252;
--foreground-muted: #777777;

--border: #e8e8e8;

--brand: ORANGE_PONTOVIT;
--brand-soft: ORANGE_MUITO_CLARO;

--dark: #111111;
```

IMPORTANTE:

Extrair o laranja oficial da logo/assets da PontoVit antes de finalizar o design token.

Não inventar um laranja diferente sem necessidade.

---

# 10. Distribuição aproximada das cores

Interface geral:

* 70–80% branco/neutros;
* 10–20% superfícies cinza/off-white;
* 5–10% laranja.

Laranja principalmente em:

* CTA;
* pequenos indicadores;
* ícones;
* badges;
* gráficos;
* estados ativos;
* palavras destacadas;
* pequenos elementos decorativos.

---

# 11. Tipografia

Preferência:

**Manrope**

Fallback:

```css
font-family:
  "Manrope",
  "Inter",
  system-ui,
  sans-serif;
```

Pode-se avaliar Geist caso combine melhor durante implementação.

Não usar vários tipos de fonte.

## Headline hero desktop

Aproximadamente:

```css
font-size: clamp(3.5rem, 5.5vw, 5.5rem);
line-height: 0.98;
letter-spacing: -0.045em;
font-weight: 500;
```

## H2

```css
font-size: clamp(2.5rem, 4vw, 4rem);
line-height: 1.03;
letter-spacing: -0.035em;
font-weight: 500;
```

Body:

```css
font-size: 16px;
line-height: 1.65;
```

Textos comerciais maiores podem usar 18–20px.

---

# 12. Radius

Base:

```css
--radius-sm: 10px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-xl: 32px;
--radius-section: 40px;
```

Botões:

```css
border-radius: 9999px;
```

---

# 13. Sombras

Extremamente discretas.

Priorizar:

* contraste de superfícies;
* borda;
* spacing.

Não criar cards com sombras pesadas.

Mockups podem ter uma sombra mais sofisticada e difusa.

---

# 14. Header

O header é importante.

A referência visual desejada possui navbar larga, limpa e respirada.

Desktop:

```text
PONTOVIT

Produto
Soluções
Funcionalidades
Clientes
Conteúdos

Entrar              Agendar demonstração
```

Altura:

`76–84px`

Container:

`1280px`

Comportamento:

* sticky;
* top: 0;
* z-index alto;
* inicialmente transparente/branco;
* quando scrollar, adicionar background branco translúcido;
* backdrop blur;
* border-bottom extremamente sutil.

CTA deve ser arredondado.

Não criar navbar pequena espremida no centro da tela.

---

# 15. Mobile navigation

Mobile:

* logo esquerda;
* botão menu direita;
* drawer/modal de navegação;
* links grandes;
* CTA de demonstração bem visível.

Touch targets mínimos:

`44px`.

---

# 16. HOME — SEÇÃO 01 — HERO

## Eyebrow

> GESTÃO INTELIGENTE DE ESCALAS

## Headline principal

Preferencial:

> Escalas melhores.
> Operações mais eficientes.

Alternativa:

> Transforme suas escalas em inteligência operacional.

## Subheadline

> Planeje jornadas, organize equipes e reduza o trabalho manual com uma plataforma feita para tornar sua operação mais previsível, eficiente e segura.

## CTA

Principal:

> Agendar demonstração

Secundário:

> Conhecer a plataforma

O principal abre WhatsApp.

O secundário faz scroll para plataforma.

---

# 17. Hero visual

Não usar fotografia genérica ocupando todo o background.

O principal elemento visual deve ser:

**o produto PontoVit.**

Criar composição grande com screenshot/interface.

Possíveis elementos:

* janela principal do dashboard;
* tabela de escalas;
* cards menores com indicadores;
* status de colaboradores;
* alertas;
* jornadas;
* pequenos componentes flutuantes.

O produto deve ocupar aproximadamente 850–1100px de largura em desktop.

A composição pode ultrapassar levemente o container.

---

# 18. Asset atual reaproveitável — produto

O site antigo possui um asset com notebook apresentando a interface.

Caminho conhecido no WordPress antigo:

`/wp-content/uploads/2023/09/home-2.png`

Pode ser usado temporariamente.

---

# 19. Asset atual preferencial — múltiplos dispositivos

Existe também um asset muito melhor contendo:

* notebook;
* monitor desktop;
* smartphone;

todos mostrando o produto.

Caminho:

`/wp-content/uploads/2023/09/home-3.png`

Esse é um dos principais assets que podemos reaproveitar.

USAR preferencialmente em uma seção de:

> Acesse de onde estiver.

NÃO necessariamente no hero.

Idealmente, posteriormente substituir por novos screenshots do sistema em maior resolução.

---

# 20. O que NÃO reaproveitar do hero antigo

Não reaproveitar:

* background enorme com pessoa e filtro laranja;
* banner institucional promocional;
* composição antiga;
* overlay laranja;
* botão pequeno;
* headline pequena.

Esses materiais podem permanecer apenas como arquivo histórico.

---

# 21. HOME — SEÇÃO 02 — PROVA SOCIAL

Logo depois do hero.

Título discreto:

> Empresas que confiam na PontoVit

Criar linha de logos.

Pode existir marquee muito lento no desktop.

IMPORTANTE:

* logos monocromáticos ou visualmente normalizados;
* altura consistente;
* não distorcer;
* não exagerar no tamanho.

Clientes encontrados nas páginas atuais incluem marcas como:

* Nicolini Supermercados;
* Veratti Supermercados;
* outras empresas presentes nos assets existentes.

Utilizar somente logos reais disponíveis no projeto/site.

---

# 22. HOME — SEÇÃO 03 — IMPACTO / NÚMEROS

Criar faixa horizontal minimalista.

Pode conter métricas COMPROVADAS fornecidas pelo cliente.

Exemplo estrutural:

```text
Até 25%
redução de custos

100%
online

Multiempresa
e multiusuário

Todos os tipos
de escalas
```

O argumento “reduza em até 25% os custos” existe na comunicação institucional atual.

Não adicionar métricas fictícias.

---

# 23. Métricas que exigem validação

Algumas páginas existentes usam números como:

* +3 mil empresas atendidas;
* +500 empresas ativas;
* 99,2% conformidade;
* -78% retrabalho;
* 5 minutos para gerar escala;
* 24/7 suporte.

Esses números NÃO devem ser publicados automaticamente no novo site.

Marcar internamente:

`[VALIDAR COM CLIENTE]`

Até confirmação, não usar.

---

# 24. HOME — SEÇÃO 04 — O PROBLEMA

Eyebrow:

> MENOS PLANILHAS. MAIS CONTROLE.

Headline:

> Sua operação não deveria depender de processos manuais.

Texto:

> Criar escalas manualmente consome tempo, aumenta a chance de erros e dificulta enxergar o impacto de cada decisão na operação.

Abaixo, comparação visual.

## Coluna A

### Gestão manual

* Planilhas espalhadas
* Alterações difíceis de acompanhar
* Mais risco de conflitos
* Informação descentralizada
* Retrabalho da equipe

## Coluna B

### Com a PontoVit

* Gestão centralizada
* Regras padronizadas
* Mais previsibilidade
* Escalas organizadas
* Informações acessíveis pela web

Visual:

* dois grandes cards;
* card manual neutro;
* card PontoVit com leve superfície laranja;
* sem exageros.

---

# 25. HOME — SEÇÃO 05 — VISÃO GERAL DA PLATAFORMA

Eyebrow:

> UMA PLATAFORMA. TODA A OPERAÇÃO.

Headline:

> Tudo que sua gestão de escalas precisa. Em um só lugar.

Grid/lista:

### Gestão de escalas

Monte e organize escalas conforme as necessidades da operação.

### Fluxo de aprovação

Trabalhe com fases de montagem, análise, autorização e impressão.

### Multiempresa

Gerencie diferentes empresas, unidades e estruturas.

### Multiusuário

Controle o acesso de cada usuário conforme sua responsabilidade.

### Dashboard

Tenha uma visão central da gestão das escalas.

### Estrutura hierárquica

Organize menus e acessos conforme o organograma da empresa.

### Gestão online

Acesse pelo navegador, sem depender de uma máquina específica.

### Padronização

Mantenha a criação das escalas consistente entre diferentes setores.

Design:

* cards horizontais grandes;
* 2 colunas desktop;
* 1 mobile;
* ícones Lucide muito simples;
* bastante whitespace;
* hover discreto.

---

# 26. HOME — SEÇÃO 06 — FEATURE SHOWCASE 01

Layout:

texto esquerda / screenshot direita.

Eyebrow:

> ESCALAS

Headline:

> Crie escalas sem perder horas organizando planilhas.

Copy:

> Centralize a construção das escalas, organize colaboradores e padronize o processo entre diferentes equipes e unidades.

Bullets:

* diferentes jornadas;
* gestão por setores;
* organização de colaboradores;
* informações centralizadas;
* acesso via web.

CTA:

> Ver como funciona

CTA abre WhatsApp ou scroll para contato.

Visual:

usar screenshot real da tela de escalas.

---

# 27. HOME — SEÇÃO 07 — FEATURE SHOWCASE 02

Layout invertido.

Screenshot esquerda / texto direita.

Eyebrow:

> FLUXO DE GESTÃO

Headline:

> Da montagem à autorização. Tudo no mesmo fluxo.

Copy:

> Acompanhe cada etapa da escala com um processo estruturado para montagem, análise, autorização e divulgação.

Visualmente pode existir uma pequena representação:

```text
Montagem → Análise → Autorização → Divulgação
```

Cada etapa como status/chip.

---

# 28. HOME — SEÇÃO 08 — FEATURE SHOWCASE 03

Texto esquerda / produto direita.

Eyebrow:

> VISÃO OPERACIONAL

Headline:

> Enxergue sua operação antes de tomar decisões.

Copy:

> Use dashboards e informações centralizadas para entender a distribuição das equipes e tornar o planejamento mais previsível.

Possíveis bullets:

* visão consolidada;
* acompanhamento por unidade;
* organização por setor;
* indicadores;
* relatórios.

Não inventar métricas.

---

# 29. HOME — SEÇÃO 09 — ACESSO MULTIDISPOSITIVO

Background pode ser warm/off-white.

Headline:

> Sua operação não fica presa ao escritório.

Copy:

> Acesse a PontoVit pela web em computadores, tablets e dispositivos móveis e acompanhe as escalas onde estiver.

Utilizar:

`home-3.png`

como referência/asset inicial.

A composição pode mostrar o asset grande de um lado e conteúdo do outro.

---

# 30. HOME — SEÇÃO 10 — DARK FEATURE

Criar uma seção especial escura.

Não fazer full-bleed preto quadrado.

Criar um grande container:

```css
border-radius: 40px;
background: #111;
```

Margens laterais visíveis.

Eyebrow:

> OPERAÇÃO CONECTADA

Headline:

> Da estrutura da empresa à escala final. Tudo conectado.

Visual conceitual central:

```text
                    Equipes
                       ↓

Unidades  →  Regras  →  Escalas  →  Aprovação

                       ↓
                   Indicadores
```

Utilizar linhas extremamente sutis e pequenos cards.

Laranja somente em pontos-chave.

Essa seção deve gerar impacto visual e quebrar o ritmo branco da página.

---

# 31. HOME — SEÇÃO 11 — BENEFÍCIOS

Eyebrow:

> MAIS EFICIÊNCIA

Headline:

> Tecnologia para simplificar uma operação complexa.

Quatro benefícios principais.

### Menos retrabalho

Automatize partes do processo e evite reconstruir informações em diferentes planilhas.

### Mais tempo

Libere RH e gestores de tarefas repetitivas para que possam focar em decisões estratégicas.

### Melhor alocação

Organize os colaboradores de acordo com as necessidades reais de cada operação.

### Mais segurança

Estruture as escalas considerando regras e critérios definidos pela empresa.

---

# 32. HOME — SEÇÃO 12 — REDUÇÃO DE CUSTOS

Esta deve ser uma seção de alto impacto.

Eyebrow:

> EFICIÊNCIA OPERACIONAL

Headline:

> Escalas mais inteligentes podem reduzir custos da operação.

Destacar:

> Até 25%

Subcopy:

> Uma melhor organização das jornadas pode ajudar a reduzir horas extras desnecessárias, retrabalho e problemas de alocação.

Não apresentar o número como garantia absoluta.

Utilizar linguagem:

> “até 25%”

e não:

> “economize 25% garantido”.

Visual:

* gráfico abstrato;
* cards de dados;
* representação visual da interface;
* sem gráfico fake com números inventados.

---

# 33. HOME — SEÇÃO 13 — SEGMENTOS

Eyebrow:

> PARA OPERAÇÕES DE VERDADE

Headline:

> Feita para empresas que dependem de equipes bem organizadas.

Grid de segmentos:

* Supermercados
* Atacados
* Postos de combustíveis
* Farmácias
* Comércio
* Condomínios
* Indústrias
* Outras operações por turnos

Não criar 8 stock photos diferentes.

Preferência:

usar componentes ilustrados, fotografia pontual ou elementos gráficos consistentes.

---

# 34. HOME — SEÇÃO 14 — DEPOIMENTOS

Eyebrow:

> QUEM USA, RECOMENDA

Headline:

> O que nossos clientes dizem sobre a PontoVit.

Depoimentos existentes que podem ser reaproveitados no conteúdo:

## Rafael Veratti

Veratti Supermercados

Mensagem central:

A PontoVit facilita a gestão das escalas 6x1, melhora o processo de gestão e comunicação com colaboradores e continua evoluindo ao longo da parceria.

IMPORTANTE:
Caso seja usado como depoimento textual com aspas, recuperar o texto original do site sem reescrevê-lo.

## Tiago Andrade

Básica Administração de Condomínios

Mensagem central:

A solução trouxe facilidade, economia de tempo e redução de burocracias relacionadas à folha.

## Cristiano

Posto de Combustível Vargem Linda

Mensagem central:

A ferramenta ajudou a empresa a se tornar mais produtiva e organizada em relação às escalas.

---

# 35. Layout de testimonials

Não criar três cards pequenos e apertados.

Preferir:

* cards grandes;
* slider;
* 2 cards parcialmente visíveis;
* bastante margem;
* nome e empresa claros;
* logo se disponível;
* resultado numérico somente se comprovado.

---

# 36. HOME — SEÇÃO 15 — BLOG

Não dar ao blog mais importância que o produto.

Eyebrow:

> CONTEÚDO

Headline:

> Conteúdo para uma gestão de trabalho mais eficiente.

Exibir 3 artigos recentes.

Card:

* thumbnail;
* categoria;
* título;
* excerpt curto;
* “Ler artigo”.

Sem transformar a home em portal de notícias.

---

# 37. HOME — SEÇÃO 16 — CTA FINAL

Criar grande seção de conversão.

Pode utilizar fundo laranja da marca.

Headline:

> Sua próxima escala pode ser muito mais inteligente.

Texto:

> Converse com um especialista e veja como a PontoVit pode simplificar a gestão das equipes da sua empresa.

Botão:

> Agendar demonstração

Link:

WhatsApp.

Microcopy:

> Atendimento comercial pelo WhatsApp.

NÃO mencionar preço.

---

# 38. Footer

Grande, organizado e premium.

Estrutura:

```text
PONTOVIT

Plataforma
- Gestão de escalas
- Funcionalidades
- Acesso online

Soluções
- Supermercados
- Varejo
- Indústrias
- Outras operações

Empresa
- Sobre
- Clientes
- Contato

Conteúdo
- Blog

Contato
- contato@pontovit.com.br
- telefones
- WhatsApp
```

Rodapé inferior:

* copyright;
* política de privacidade;
* termos;
* CNPJ se confirmado.

---

# 39. Elementos visuais personalizados

O projeto NÃO deverá depender somente de:

* screenshots;
* cards;
* texto.

Criar alguns elementos visuais próprios da marca.

Exemplos:

### Elemento 01 — Equipe operacional

Pessoa realista/profissional inserida em composição clean com pequenos elementos da interface ao redor.

Uso:

seções sobre equipe/operação.

### Elemento 02 — Gestor analisando escala

Pessoa utilizando notebook/tablet com cards de escala abstratos ao redor.

Uso:

seção produto ou gestão.

### Elemento 03 — Pessoas + turnos

Composição de 3–5 colaboradores de diferentes funções, organizados em um layout visual que remete a cards de escala.

### Elemento 04 — Calendário 3D/semirrealista

Elemento editorial abstrato representando:

* dias;
* turnos;
* horários;
* organização.

Não parecer clipart.

### Elemento 05 — Rede operacional

Pequenos cards, colaboradores, unidades e escala ligados por linhas.

Uso na dark section.

---

# 40. Regra para pessoas geradas por IA

Pessoas devem parecer:

* brasileiras;
* profissionais reais;
* naturais;
* diversas;
* vestidas de acordo com operações reais;
* iluminação de estúdio/editorial.

Possíveis profissões/cenários:

* colaboradora de supermercado;
* gestor de RH;
* gerente de loja;
* funcionário de operação;
* equipe de varejo;
* supervisor.

Evitar:

* sorrisos artificiais exagerados;
* pose de banco de imagem de 2014;
* roupas corporativas genéricas azuis;
* hologramas;
* braços cruzados olhando para câmera em todos os assets;
* computadores com interfaces geradas ilegíveis;
* texto dentro de imagens geradas.

Interfaces reais serão adicionadas via HTML/CSS ou imagens do sistema.

---

# 41. Imagens geradas

Preferir PNG/WebP com fundo transparente quando forem elementos isolados.

Não gerar banners completos.

Não gerar hero pronto.

Não gerar textos na imagem.

Gerar somente elementos que o layout utilizará.

Exemplos:

```text
/person-standing-retail.webp
/manager-tablet.webp
/team-operations.webp
/calendar-object.webp
```

O layout é responsabilidade do HTML/CSS.

---

# 42. Ícones

Utilizar:

`lucide-react`

Não misturar bibliotecas.

Stroke consistente.

Tamanho base:

`20–24px`.

Em cards destacados:

`28px`.

Cor:

* foreground;
* muted;
* brand.

---

# 43. Animações

Animações extremamente sutis.

Pode usar Motion / Framer Motion.

Padrão:

* opacity;
* translateY 12–24px;
* duração 400–700ms;
* stagger leve.

Não usar:

* bounce;
* elementos pulando;
* parallax excessivo;
* scroll hijacking;
* textos entrando de todos os lados;
* animações chamativas em cards.

---

# 44. Microinterações

Permitidas:

* hover com translateY de 2–4px;
* alteração leve de border;
* ícone de botão movendo 2px;
* screenshots com leve scale;
* navbar mudando ao scroll;
* marquee lento;
* accordion FAQ;
* menu mobile animado.

---

# 45. Responsividade

Breakpoints orientativos:

```text
mobile: < 640
tablet: 640–1024
desktop: > 1024
wide: > 1440
```

Nunca apenas reduzir o desktop.

No mobile:

* headline quebra corretamente;
* cards tornam-se uma coluna;
* showcases empilham;
* imagem normalmente fica abaixo do texto;
* navbar vira drawer;
* paddings diminuem;
* botões importantes podem ocupar 100%;
* nenhum screenshot deve criar overflow horizontal.

---

# 46. Acessibilidade

Obrigatório:

* HTML semântico;
* contraste AA;
* foco visível;
* `aria-label` em botões apenas por ícone;
* navegação por teclado;
* alt text adequado;
* `prefers-reduced-motion`;
* não depender somente de cor para comunicar status.

---

# 47. SEO

Estruturar:

* metadata Next.js;
* title;
* description;
* canonical;
* OpenGraph;
* Twitter cards;
* sitemap;
* robots;
* JSON-LD Organization;
* JSON-LD SoftwareApplication quando apropriado;
* headings semânticos;
* apenas um H1 por página.

Título inicial:

> PontoVit | Gestão Inteligente de Escalas de Trabalho

Description inicial:

> Organize escalas, jornadas e equipes com mais eficiência. Conheça a PontoVit e simplifique a gestão operacional da sua empresa.

---

# 48. Tecnologia

Projeto:

* Next.js;
* App Router;
* TypeScript;
* Tailwind CSS;
* React Server Components quando apropriado.

Bibliotecas permitidas:

* lucide-react;
* motion/framer-motion se necessário;
* clsx;
* tailwind-merge.

Evitar dependências desnecessárias.

---

# 49. Organização sugerida

```text
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ globals.css
│  └─ ...
│
├─ components/
│  ├─ layout/
│  │  ├─ header.tsx
│  │  ├─ footer.tsx
│  │  └─ container.tsx
│  │
│  ├─ home/
│  │  ├─ hero.tsx
│  │  ├─ client-logos.tsx
│  │  ├─ metrics.tsx
│  │  ├─ problem-comparison.tsx
│  │  ├─ platform-overview.tsx
│  │  ├─ feature-showcase.tsx
│  │  ├─ connected-operation.tsx
│  │  ├─ benefits.tsx
│  │  ├─ savings.tsx
│  │  ├─ industries.tsx
│  │  ├─ testimonials.tsx
│  │  ├─ blog-preview.tsx
│  │  └─ final-cta.tsx
│  │
│  └─ ui/
│
├─ config/
│  └─ site.ts
│
├─ data/
│  ├─ features.ts
│  ├─ industries.ts
│  ├─ testimonials.ts
│  └─ clients.ts
│
└─ lib/
   ├─ whatsapp.ts
   └─ utils.ts
```

---

# 50. Conteúdo separado de apresentação

Não colocar todo o conteúdo dentro de JSX.

Utilizar arrays/objetos para:

* funcionalidades;
* segmentos;
* clientes;
* depoimentos;
* nav;
* footer.

Isso facilitará edição posterior.

---

# 51. Imagens

Utilizar:

`next/image`

Configurar corretamente:

* width;
* height;
* sizes;
* priority somente no hero;
* lazy loading no restante;
* WebP/AVIF quando possível.

---

# 52. Performance

Objetivo:

* Lighthouse alto;
* evitar JS desnecessário;
* evitar carrosséis pesados;
* evitar bibliotecas gigantes;
* fontes via `next/font`;
* imagens otimizadas;
* Server Components por padrão;
* Client Components somente quando necessários.

---

# 53. Regra anti-“cara de IA”

NÃO criar automaticamente:

* gradiente roxo/azul;
* glow exagerado;
* grids com dezenas de quadradinhos;
* blobs aleatórios;
* ícones dentro de quadrados idênticos;
* glassmorphism em tudo;
* cinco estilos diferentes de card;
* badges aleatórias;
* estrelas decorativas;
* bolinhas flutuantes;
* mockups falsos com números inventados;
* “AI sparkles”;
* backgrounds com mesh gradients genéricos.

---

# 54. Regra visual principal

Sempre preferir:

**tipografia + grid + espaçamento + produto real**

antes de adicionar decoração.

---

# 55. O produto é protagonista

Em uma empresa de software, screenshots não são detalhe.

Devem ser um dos principais elementos da identidade visual da página.

Se houver screenshots melhores do sistema no projeto, utilizá-los.

Nunca recriar uma interface fictícia se já houver uma tela real disponível.

Pode estilizar apresentação:

* browser frame;
* crop;
* máscaras;
* cards sobrepostos;
* device mockup;
* zoom em partes importantes.

Mas não adulterar informações da interface real.

---

# 56. Conteúdo que vale preservar do site antigo

Preservar conceitualmente:

* redução de erros e retrabalho;
* economia de tempo;
* otimização de recursos;
* melhoria na comunicação;
* conformidade com legislação trabalhista;
* gestão via web;
* multiempresa;
* multiusuário;
* dashboard;
* padronização das escalas;
* estrutura hierárquica;
* gestão remota;
* fases de montagem/análise/autorização/impressão;
* depoimentos;
* clientes;
* parceiros;
* conteúdo educacional/blog.

Reescrever a apresentação, não necessariamente as informações.

---

# 57. O que remover da arquitetura antiga

Não reproduzir:

* hero com imagem coberta de laranja;
* banner promocional dentro da página;
* pequenas colunas de texto difíceis de ler;
* seção de logos minúsculos;
* imagem redonda + texto;
* timeline antiga;
* oito quadradinhos de funcionalidade;
* testemunhos pequenos apertados;
* blog com excesso de protagonismo;
* footer visualmente pesado;
* botões minúsculos;
* inconsistência de larguras.

---

# 58. Curvas e divisores

As referências usam algumas seções com bordas curvas.

Podemos incorporar isso moderadamente.

Exemplo:

```css
border-radius: 0 0 50% 50% / 0 0 5% 5%;
```

Entretanto:

* não usar curva em toda seção;
* máximo 2–3 momentos da home;
* preferir grandes containers arredondados.

---

# 59. Referência de ritmo

A página deve alternar:

```text
WHITE HERO
↓
SOCIAL PROOF
↓
SOFT BACKGROUND
↓
WHITE FEATURE
↓
WHITE FEATURE INVERTIDA
↓
WARM PRODUCT
↓
DARK IMPACT SECTION
↓
WHITE BENEFITS
↓
SOFT INDUSTRIES
↓
WHITE TESTIMONIALS
↓
BLOG
↓
ORANGE CTA
↓
DARK/WHITE FOOTER
```

Isso evita monotonia.

---

# 60. Critério final de aprovação

Antes de considerar a home pronta, perguntar:

1. Parece software B2B premium?
2. O produto aparece claramente?
3. Em 5 segundos entendo o que a empresa vende?
4. A hierarquia visual está evidente?
5. Há bastante respiro?
6. Todos os elementos parecem pertencer ao mesmo design system?
7. O laranja está sendo usado com intenção?
8. O CTA de WhatsApp está claro?
9. O site funciona impecavelmente no mobile?
10. Parece projeto de design customizado ou template?

Se a resposta para a 10 for “template”, revisar.
