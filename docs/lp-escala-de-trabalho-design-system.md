# Design system da LP — Escala de Trabalho

Status: base visual aprovada para iniciar a landing page. O roteiro, a oferta e os textos finais ainda serão incorporados.

Rota reservada: `/lp-escala-de-trabalho`

## 1. Objetivo

Esta especificação traduz a identidade visual da Home PontoVit para a nova landing page. Ela deve orientar layout, tipografia, cor, imagens, responsividade, movimento e componentes, sem copiar a Home seção por seção.

A LP deve parecer parte do mesmo produto e da mesma marca: software B2B brasileiro, claro, operacional, confiável e humano. O produto real é o principal elemento de prova visual.

## 2. Fontes de verdade

Ordem de prioridade quando houver divergência:

1. Aparência atual da Home renderizada.
2. Tokens em `src/app/design-system.css`.
3. Regras efetivas e overrides em `src/app/globals.css`.
4. Direção de arte em `spec/redesign.md`.
5. Direção de imagens em `spec/assets.md`.
6. Componentes compartilhados em `src/components/shared`.

Os estilos `.figma-*` descrevem a Home e servem como referência. A LP deve usar uma classe raiz própria, como `.work-schedule-lp`, para evitar acoplamento e efeitos colaterais.

## 3. Princípios da identidade

- Clareza operacional: a página explica um serviço complexo com hierarquia direta e linguagem concreta.
- Produto protagonista: telas reais do PontoVit devem ocupar entre 45% e 65% das composições em que aparecem.
- Direção de arte por seção: cada bloco importante recebe uma composição própria. Evitar uma sequência repetitiva de cards iguais.
- Contraste intencional: off-white e branco formam a base; o laranja marca palavras-chave, ações e pontos de atenção.
- Formas orgânicas controladas: círculos orbitais, curvas largas, ondas e cápsulas comunicam tempo, movimento e organização.
- Presença humana editorial: pessoas ajudam a contextualizar a operação, sem aparência de banco de imagens ou campanha genérica.
- Ritmo amplo: títulos grandes, áreas de respiro e imagens generosas. A página não deve parecer um template SaaS compacto.

## 4. Tipografia

As fontes já são carregadas com `next/font` em `src/app/layout.tsx`.

| Papel | Família | Pesos | Uso |
| --- | --- | --- | --- |
| Display | Manrope | 600, 700, 800 | H1, H2, H3, CTAs e números de impacto |
| Texto | Inter | 300, 400, 500, 600 | Parágrafos, navegação, labels e metadados |
| Fallback | Arial, sans-serif | — | Somente fallback técnico |

### Escala recomendada para a LP

| Elemento | Desktop | Mobile | Entrelinha | Tracking |
| --- | --- | --- | --- | --- |
| H1 do hero | `clamp(48px, 4.7vw, 68px)` | `clamp(29px, 8vw, 36px)` | `1.05–1.14` | `-0.045em` |
| H2 de impacto | `clamp(38px, 3.4vw, 52px)` | `30–34px` | `1.05–1.15` | `-0.04em` |
| H2 editorial | `36–42px` | `29–31px` | `1.15–1.2` | `-0.03em` |
| H3/card | `24–28px` | `21–24px` | `1.12–1.25` | `-0.02em` |
| Lead | `22–28px` | `17–19px` | `1.3–1.45` | normal |
| Corpo | `18–22px` | `16–18px` | `1.4–1.65` | normal |
| Eyebrow | `11–12px` | `11–12px` | `1.4` | `0.16–0.23em` |
| CTA | `18–20px` | `16px` | `1` | `-0.01em` |

Regras:

- Usar no máximo um H1.
- Destacar trechos curtos do headline com `var(--pv-orange)`.
- Títulos grandes devem ter quebras editoriais planejadas; no mobile, remover `<br>` de desktop quando a quebra natural for melhor.
- Limitar parágrafos de leitura a aproximadamente `560–650px`.
- Evitar corpo abaixo de `16px` e peso 300 sobre fundos coloridos.

## 5. Cor

### Paleta principal

| Token | Valor | Papel na LP |
| --- | --- | --- |
| `--pv-ink` | `#101010` | Headline, texto principal e contraste máximo |
| `--pv-ink-soft` | `#3d3d3d` | Títulos secundários e texto de apoio escuro |
| `--pv-muted` | `#656565` | Corpo, legendas e informações auxiliares |
| `--pv-orange` | `#ed8107` | Destaques de marca e palavras-chave |
| `--pv-orange-strong` | `#ea7e04` | CTA principal e superfícies laranja |
| `--pv-orange-deep` | `#dd5d0b` | Hover e contraste dentro da família laranja |
| `--pv-yellow` | `#ffd043` | Estado ativo pontual; usar com moderação |
| `--pv-page` | `#fafafa` | Canvas principal |
| `--pv-white` | `#ffffff` | Cards, faixas e áreas de leitura |
| `--pv-gray` | `#f3f3f3` | Seções neutras e prova social |
| `--pv-gray-soft` | `#eef1f2` | Alternância suave de fundo |
| `--pv-warm` | `#fff7ef` | Superfícies quentes ligadas ao produto |
| `--pv-line` | `#dedede` | Divisores e bordas discretas |
| `--pv-dark` | `#1c140d` | Seção escura de impacto, quando necessária |

### Distribuição

- 65–75%: `#fafafa` e branco.
- 15–25%: superfícies suaves, quentes ou cinza.
- 8–12%: laranja em CTAs, destaques, curvas e marcadores.
- Grafite/preto: texto e, no máximo, uma grande seção de contraste.

Não usar roxo, azul neon, mesh gradients, glassmorphism ou glows fortes. Não usar o laranja como fundo contínuo por muitas seções.

### Contraste

- Texto branco só sobre laranja forte ou grafite com contraste AA.
- Em áreas laranja, corpo deve ser branco ou quase branco e preferencialmente peso 400.
- Texto secundário sobre branco deve usar `--pv-muted`, evitando cinzas mais claros.

## 6. Grid e espaçamento

### Larguras

- Canvas máximo observado: `1760–1769px`.
- Container padrão da LP: `width: min(calc(100% - 80px), 1600px)` em desktop amplo.
- Conteúdo editorial: `1200–1320px`.
- Texto de hero centralizado: máximo de `976px`.
- Texto corrido: máximo de `650px`.

### Gutters

| Viewport | Gutter lateral |
| --- | --- |
| Acima de 1200px | `40px` |
| 721–1200px | `32px` |
| Até 720px | `20–28px` |

### Ritmo vertical

- Seção ampla desktop: `100–140px`.
- Seção padrão desktop: `80–112px`.
- Seção mobile: `70–92px`.
- Espaço entre eyebrow e título: `14–22px`.
- Espaço entre título e lead: `22–35px`.
- Espaço antes do CTA: `28–40px`.
- Espaço entre blocos de uma composição: `32–64px`.

Usar uma escala base de `4px`, priorizando `8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 112, 128`.

## 7. Breakpoints e comportamento responsivo

Os breakpoints efetivos da Home são:

- Mobile: `max-width: 720px`.
- Intermediário/tablet: `721px–1200px`.
- Desktop: acima de `1200px`.
- Ajustes finos existentes: `420px` e `480px`.

### Desktop

- Usar composições de uma, duas ou três áreas, de acordo com a narrativa.
- Screenshots podem ter `700–900px` e ultrapassar visualmente o grid, desde que fiquem contidos no canvas.
- Variar alinhamento: centralizado, texto/imagem, imagem/texto e composição sobreposta.

### Tablet

- Preservar a direção de arte com `clamp()` e dimensões fluidas.
- Reduzir sobreposições e manter área mínima de toque de `44px`.
- Empilhar uma composição quando o conteúdo ficar comprimido; não insistir em duas colunas estreitas.

### Mobile

- Recriar a composição em uma coluna; não apenas reduzir o desktop.
- Priorizar texto antes da imagem, salvo quando a imagem for necessária para entender a seção.
- Usar imagens específicas para mobile quando o crop desktop perder informação.
- Carrosséis podem ocupar `calc(100vw - 32px)` ou `calc(100vw - 56px)` por slide, com `scroll-snap`.
- Nenhuma decoração, screenshot ou trilho pode criar overflow horizontal.
- CTAs principais podem ocupar toda a largura útil, mantendo altura de `50–56px`.

## 8. Formas, bordas e sombras

### Raios

| Uso | Raio |
| --- | --- |
| CTA, tag e controle | `999px` |
| Cards compactos | `8–12px` |
| Imagens e cards editoriais | `18–28px` |
| Blocos grandes | `28–36px` |

As curvas grandes devem aparecer em dois ou três momentos da página, como transição de seção ou moldura de CTA. Evitar aplicar curvas em todas as seções.

### Sombras

- Card: `0 16px 35px rgba(16,16,16,.06)`.
- Elemento flutuante: `0 24px 70px rgba(16,16,16,.10)`.
- CTA laranja: `0 14px 28px rgba(234,126,4,.20)`.
- Mockup: `drop-shadow(0 18px 14px rgba(35,26,12,.16))`.

Sombras devem separar planos, sem criar aparência de vidro ou neon.

## 9. Elementos de marca

- Círculos orbitais com traço laranja em baixa opacidade.
- Rosetas formadas pelo símbolo da marca.
- Curvas ou ondas laranja em grandes transições.
- Cápsulas e pequenos círculos para CTAs e setas.
- Linhas, módulos e blocos que remetam a tempo, pessoas, turnos e organização.
- Textura de grid quase invisível apenas quando ajudar a estruturar a composição.

Usar esses elementos como apoio. Tipografia, grid e produto real devem continuar dominantes.

## 10. Componentes a reutilizar

- `SiteHeader`: navegação e menu mobile já consolidados.
- `SiteFooter`: CTA final, informações institucionais e navegação.
- `Container`: adaptar o padrão de largura compartilhado quando necessário.
- `ButtonLink` ou padrão visual `.figma-button`: CTA em cápsula com seta circular.
- `SectionIntro`: eyebrow, título e descrição.
- `Reveal`: entrada sutil e compatível com redução de movimento.

Na LP, criar componentes próprios apenas quando a composição ou a semântica exigir. Evitar copiar classes `.figma-*` ou duplicar header/footer.

## 11. CTA

Padrão principal:

- Fundo `--pv-orange-strong`.
- Texto branco em Manrope 600/700.
- Altura de `58–70px` no hero e `50–58px` nas demais seções.
- Raio `999px`.
- Seta em círculo branco com texto grafite.
- Hover de `translateY(-2px a -3px)` e sombra levemente maior.
- Foco visível com outline de alto contraste.

O roteiro definirá o texto e o destino. Até lá, não assumir promessa, preço, prazo ou condição comercial.

## 12. Imagens e direção de arte

### Ordem de preferência

1. Screenshot real do produto.
2. Fotografia real da operação, equipe ou cliente.
3. Fotografia gerada especificamente para a LP.
4. Objeto editorial ou abstração 3D.

### Screenshots do produto

- Mostrar interface real e legível.
- Usar recorte, zoom, browser frame, notebook ou sobreposição para destacar a função explicada.
- Não inserir todos os screenshots em cards bege idênticos.
- Não alterar dados ou inventar métricas dentro da interface.
- Usar `next/image`, `sizes` coerente e `priority` apenas para imagem crítica da primeira dobra.

### Imagens geradas

- Criar elementos isolados, não banners prontos.
- Pessoas brasileiras, naturais e adequadas a operações reais.
- Luz editorial suave, temperatura consistente e contraste moderado.
- Fundo transparente quando o layout precisar compor a pessoa ou objeto.
- Sem texto, logo, CTA, holograma ou interface fictícia.
- Telas de celular/tablet devem permanecer neutras para receber UI real no front-end.

### Formatos de referência

| Asset | Tamanho de trabalho |
| --- | --- |
| Screenshot/mídia de produto | `1536 × 1024` ou maior |
| Fundo amplo de seção | `1920 × 800–900` |
| Mídia de card | proporção `3:2` |
| Fundo mobile específico | cerca de `430 × 693` |
| Recorte de pessoa/objeto | PNG/WebP transparente em alta resolução |

O brief final de cada imagem será produzido depois que o roteiro definir a função narrativa de cada seção.

## 13. Movimento e interação

- Hover de card: `translateY(-2px a -4px)`.
- Entrada de conteúdo: opacity + `translateY(12–24px)`, duração `400–700ms`.
- Transições de controles: `180–300ms`.
- Carrossel: `scroll-snap` nativo antes de adicionar biblioteca.
- Marquee de logos: lento, pausável no hover.
- Órbita decorativa: rotação longa e linear; a Home usa `26s`.
- Respeitar `prefers-reduced-motion` para remover animações e scroll suave.

Evitar bounce, scroll hijacking, parallax forte e animações que desviem atenção do conteúdo.

## 14. Acessibilidade e conteúdo

- HTML semântico, ordem correta de headings e um único H1.
- Áreas de toque com mínimo de `44 × 44px`.
- Navegação completa por teclado e foco visível.
- `aria-label` em controles apenas por ícone.
- Alt descritivo para imagens informativas; alt vazio para ornamentos.
- Não depender somente de cor para estado, etapa ou benefício.
- Não inventar depoimentos, clientes, resultados, métricas ou capacidades do serviço.

## 15. Estrutura técnica prevista

```text
src/
├─ app/
│  └─ lp-escala-de-trabalho/
│     └─ page.tsx
├─ components/
│  └─ lp-escala-de-trabalho/
│     ├─ landing-page.tsx
│     └─ ...seções definidas pelo roteiro
└─ data/
   └─ lp-escala-de-trabalho.ts

public/
└─ assets/
   └─ lp-escala-de-trabalho/
      ├─ desktop/
      └─ mobile/
```

- Preferir Server Components.
- Usar Client Components somente para interação real.
- Manter conteúdo repetível em arrays/objetos fora do JSX principal.
- Criar metadata própria, canonical `/lp-escala-de-trabalho` e dados Open Graph quando a página estiver pronta.
- Reaproveitar destino de CTA e configurações públicas já vindas do CMS.

## 16. Ritmo recomendado

A sequência final dependerá do roteiro, mas deve alternar massas visuais para evitar monotonia:

```text
HERO CLARO E FORTE
↓
PROVA OU CONTEXTO IMEDIATO
↓
SEÇÃO DE PROBLEMA COM COMPOSIÇÃO MARCANTE
↓
PRODUTO REAL EM GRANDE ESCALA
↓
BENEFÍCIOS OU PROCESSO EM OUTRA ESTRUTURA
↓
MOMENTO QUENTE OU ESCURO DE IMPACTO
↓
PROVA SOCIAL / OBJEÇÕES
↓
CTA FINAL
↓
FOOTER COMPARTILHADO
```

Cada seção deve acrescentar informação ou prova. Não repetir a mesma promessa em layouts diferentes.

## 17. Critérios de aprovação

- Em cinco segundos fica claro o que está sendo oferecido.
- A página pertence visualmente à PontoVit mesmo sem o logo visível.
- O laranja orienta a leitura e as ações sem dominar a página inteira.
- O produto ou o serviço aparece de forma concreta.
- A composição muda de seção para seção sem perder consistência.
- Desktop, tablet e mobile foram compostos deliberadamente.
- Não há overflow horizontal entre `320px` e `1920px`.
- Textos, CTAs e imagens permanecem legíveis em zoom de 200%.
- A página respeita redução de movimento.
- Nenhuma afirmação comercial ou prova foi inventada.

## 18. Próxima etapa

Com o roteiro e o contexto comercial em mãos:

1. Mapear cada trecho do roteiro para uma função de seção.
2. Definir a hierarquia da oferta e o CTA principal.
3. Criar wireframe textual da página.
4. Listar os screenshots existentes que comprovam cada ponto.
5. Produzir briefs e gerar apenas as imagens que faltarem.
6. Implementar a rota e validar em desktop, tablet e mobile.
