# `assets.md` — Direção de Imagens e Elementos PontoVit

## Objetivo

Este documento define os elementos visuais que poderão ser produzidos para complementar a nova interface.

IMPORTANTE:

Não queremos gerar banners completos.

Não queremos pedir para IA gerar páginas de site.

O objetivo é gerar assets individuais que o Next.js possa posicionar livremente no layout.

---

# 1. Assets existentes a reaproveitar

## Interface em notebook

Asset do WordPress existente:

`/wp-content/uploads/2023/09/home-2.png`

Conteúdo:

* notebook;
* tela real do sistema;
* fundo transparente.

Utilização sugerida:

* feature de gestão de escala;
* seção intermediária;
* não necessariamente hero.

---

## Interface multidispositivo

Asset:

`/wp-content/uploads/2023/09/home-3.png`

Conteúdo:

* monitor;
* notebook;
* smartphone;
* sistema PontoVit real.

É o melhor asset existente encontrado para comunicar:

> acesso em qualquer lugar.

Utilização sugerida:

seção “Sua operação não fica presa ao escritório”.

---

# 2. Assets antigos que não devemos transformar em direção visual

Não utilizar como referência estética:

* banner publicitário atual;
* fotografia com overlay laranja do hero;
* composição gráfica da home antiga;
* ilustrações pequenas antigas;
* cards e ícones existentes.

Podem ser preservados apenas quando contêm informação relevante.

---

# 3. Logos

Reaproveitar logos de:

* clientes;
* parceiros.

Padronizar no front-end.

Nunca editar os logos das empresas com IA.

Criar visualização normalizada:

```css
height: 28px;
width: auto;
object-fit: contain;
```

Em alguns contextos:

* grayscale;
* opacity reduzida;

e restaurar cor no hover.

---

# 4. Pessoas

Precisamos de elementos humanos melhores para evitar que a página seja apenas software + cards.

A pessoa nunca deverá parecer o foco de uma campanha publicitária.

Ela é elemento editorial.

Preferência:

* fundo transparente;
* enquadramento corpo inteiro ou 3/4;
* iluminação suave;
* aparência natural;
* fotografia premium;
* roupa relacionada ao trabalho;
* sem texto;
* sem computador com interface inventada.

---

# 5. Asset A — Colaboradora de supermercado

Objetivo:

representar operações de varejo.

Prompt conceitual:

> Fotografia editorial premium de uma colaboradora brasileira de supermercado, aproximadamente 30 anos, uniforme profissional moderno e discreto, postura natural e confiante, expressão amigável sem sorriso exagerado, fotografia de estúdio com iluminação suave e sofisticada, corpo em três quartos, composição clean para website SaaS B2B, recorte isolado, fundo transparente, aparência extremamente realista, sem texto, sem logotipos, sem objetos flutuantes, sem estética de banco de imagens.

Arquivo esperado:

`retail-worker.webp`

Uso:

* segmentos;
* operação;
* composição lateral.

---

# 6. Asset B — Gestora com tablet

Prompt conceitual:

> Fotografia editorial de uma gestora brasileira de operações ou RH, aproximadamente 35 a 45 anos, segurando um tablet de maneira natural, roupa profissional contemporânea sem formalidade excessiva, expressão concentrada e confiante, iluminação de estúdio moderna, fotografia corporativa premium para empresa de tecnologia B2B, enquadramento três quartos, fundo transparente, tablet sem conteúdo legível na tela, sem texto, sem logos, sem hologramas, sem estética futurista.

Arquivo:

`operations-manager.webp`

Uso:

* gestão;
* dashboard;
* tomada de decisão.

---

# 7. Asset C — Grupo operacional

Prompt:

> Grupo diverso de quatro profissionais brasileiros representando uma operação real: colaborador de supermercado, supervisora, profissional de logística e gerente de loja. Poses naturais, leves diferenças de profundidade, fotografia editorial premium, iluminação uniforme de estúdio, aparência autêntica e profissional, roupas de trabalho discretas e contemporâneas, fundo transparente, composição horizontal, sem logotipos, sem texto, sem aparência de fotografia corporativa genérica.

Arquivo:

`operations-team.webp`

Uso:

* para quem é;
* segmentos;
* CTA institucional.

---

# 8. Asset D — Objeto visual de escala

Aqui NÃO usar pessoa.

Prompt:

> Objeto editorial tridimensional minimalista inspirado em calendário e escala de trabalho. Estrutura formada por cartões de dias e pequenos blocos que representam turnos, acabamento branco fosco com detalhes laranja suave, sombras naturais extremamente discretas, estética de produto tecnológico premium, composição isométrica limpa, fundo transparente, nenhum texto ou número legível, sem neon, sem glow futurista, sem aparência infantil.

Arquivo:

`schedule-object.webp`

Uso:

* backgrounds;
* pequenas composições;
* seção de benefícios.

---

# 9. Asset E — Operação conectada

Prompt:

> Composição abstrata tridimensional sofisticada representando uma operação conectada, pequenos cartões modulares ligados de maneira organizada a um núcleo central, inspiração em equipes, unidades, turnos e planejamento, materiais foscos em branco, grafite e laranja, estética SaaS empresarial premium, iluminação realista de estúdio, fundo transparente, sem texto, sem ícones genéricos de IA, sem neon, sem visual cyberpunk.

Arquivo:

`connected-operation.webp`

Uso:

dark section.

---

# 10. Não colocar UI gerada dentro das imagens

Regra fundamental.

Se uma pessoa estiver segurando:

* celular;
* tablet;
* notebook;

a tela deve ser neutra.

O conteúdo real do PontoVit será sobreposto no front-end.

Isso evita interfaces falsas e textos deformados.

---

# 11. Composição pessoas + UI

O front-end pode fazer:

```text
                     ┌─────────────┐
                     │ Escala hoje │
                     └─────────────┘

        [GESTORA]

    ┌───────────┐
    │  Turnos   │
    └───────────┘
```

Pessoa = imagem.

Cards = HTML real.

Isso gera qualidade muito superior a criar tudo numa única imagem.

---

# 12. Background graphics

Podemos criar via CSS/SVG:

* linhas;
* pontos;
* pequenos círculos;
* timeline;
* conexões;
* grids extremamente discretos.

Não gerar raster para esses elementos.

---

# 13. Formas de marca

Explorar como motif:

* círculos;
* pontos;
* pequenas barras;
* blocos de calendário;
* linhas conectando turnos;
* cantos arredondados.

O conceito gráfico deve remeter a:

**tempo + pessoas + organização + escala.**

---

# 14. Fotografia

Caso existam fotografias reais dos clientes/equipe PontoVit, preferir fotografias reais.

Ordem de preferência:

1. produto real;
2. fotografia real;
3. fotografia gerada especificamente;
4. abstrações gráficas.

Nunca começar por stock photo genérica.

---

# 15. Tratamento

Todas as imagens devem parecer fazer parte da mesma campanha.

Manter:

* iluminação semelhante;
* contraste semelhante;
* temperatura semelhante;
* recortes de alta qualidade;
* proporções planejadas.

---

# 16. Output

Preferencial:

* WebP;
* alta resolução;
* fundo transparente quando aplicável;
* sem texto;
* sem logo;
* sem CTA;
* sem composição final da página.

O Codex cuidará da composição.
