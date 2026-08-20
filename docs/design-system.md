# Design system PontoVit

Fonte visual: composição da Home PontoVit e assets exportados do Figma.

## Direção

Uma interface clara, operacional e humana. A base é branca e cinza muito claro, com laranja como cor de ação e destaque. O preto é usado para contraste, navegação e blocos institucionais. Curvas, círculos orbitais, sombras suaves e imagens com bastante respiro reforçam a ideia de organização sem deixar a experiência fria.

## Tokens

Os tokens vivem em `src/app/design-system.css` e são carregados antes dos estilos da aplicação.

| Token | Valor | Uso |
| --- | --- | --- |
| `--pv-ink` | `#101010` | Texto principal e superfícies escuras |
| `--pv-ink-soft` | `#3d3d3d` | Títulos secundários |
| `--pv-muted` | `#656565` | Corpo de texto e informações auxiliares |
| `--pv-orange` | `#ed8107` | Marca, destaques e estados ativos |
| `--pv-orange-deep` | `#dd5d0b` | Hover e contraste do laranja |
| `--pv-page` | `#fafafa` | Fundo de composição |
| `--pv-gray-soft` | `#eef1f2` | Seções de apoio e páginas internas |
| `--pv-warm` | `#fff7ef` | Superfícies quentes e cards de produto |
| `--pv-line` | `#dedede` | Divisores e bordas |

## Tipografia

- `Manrope`: títulos, marca textual, botões e elementos de maior impacto.
- `Inter`: textos corridos, navegação, labels e metadados.
- Títulos usam tracking negativo e line-height compacto; corpo usa line-height entre `1.35` e `1.65` para manter leitura confortável.

## Componentes

- `SiteHeader`: navegação desktop, dropdowns acessíveis e menu mobile.
- `SiteFooter`: CTA final, grupos de páginas e pontos de redes sociais preparados para receber os links oficiais.
- `PageHero`: abertura consistente das páginas internas, com círculo decorativo da marca.
- `SectionIntro`: eyebrow, título e descrição com a mesma hierarquia da Home.
- `ButtonLink`: CTA arredondado com seta, sombra e estados de foco/hover.
- `Container`: largura máxima e gutters responsivos compartilhados.
- Carrosséis da Home: benefícios, logos e depoimentos aceitam arraste por toque/mouse e mantêm snap suave no mobile.

## Layout responsivo

- Desktop: composição arejada, grids de duas a quatro colunas e imagens grandes sem compressão adicional.
- Mobile: uma coluna, gutters de `16–32px`, cards em trilho horizontal e assets específicos em `public/assets/figma/mobile` quando fornecidos pelo Figma.
- A seção de depoimentos usa `testimonials-bg-mobile.png`, exportado de `assets-mon/bg-depoimento.png`.
- Imagens decorativas continuam em `picture`/`img` para preservar o PNG original e permitir troca por breakpoint.

## Aplicação nas páginas

As páginas internas usam a classe `pv-page` e herdam o ritmo e os tokens da Home. O conteúdo existente do WordPress foi preservado, mas a apresentação é organizada em hero, blocos de conteúdo, cards, CTA e footer compartilhados:

- `/quem-somos/`
- `/escalas-de-trabalho/`
- `/contato-antigo/`
- `/blog/`
- `/blog/[slug]/`

Os links sociais estão centralizados em `src/config/site.ts`. Enquanto os URLs oficiais não forem enviados, eles aparecem como ícones inativos, sem inventar destinos externos.
