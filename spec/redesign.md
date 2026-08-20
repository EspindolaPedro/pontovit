# REDESIGN-DIRECTION.md — Correção visual urgente PontoVit

## PARE A IMPLEMENTAÇÃO ATUAL

A direção visual atual da home NÃO foi aprovada.

O resultado está excessivamente genérico e distante das referências visuais fornecidas.

Não continue simplesmente adicionando as próximas seções seguindo o padrão atual.

Precisamos primeiro redesenhar a composição da página.

---

# 1. O erro atual

A implementação interpretou “clean” como:

* fundo branco;
* títulos pretos;
* pequenos textos laranja;
* cards claros;
* screenshots pequenos;
* muito espaço vazio.

Isso NÃO representa a direção das referências.

O objetivo NÃO é criar uma landing page SaaS minimalista genérica.

O objetivo é criar uma página com:

* direção de arte;
* ritmo;
* grandes composições;
* variações de layout;
* screenshots grandes;
* imagens humanas;
* áreas coloridas;
* elementos sobrepostos;
* seções memoráveis;
* forte presença visual.

---

# 2. PRINCIPAL REGRA

Não pensar em:

> “qual componente vem agora?”

Pensar em:

> “qual é a composição visual desta seção?”

Cada seção importante deve possuir uma composição própria.

Se uma seção puder ser facilmente substituída por um componente genérico do shadcn, ela provavelmente está errada.

---

# 3. REFERÊNCIAS — O QUE REALMENTE DEVEMOS EXTRAIR

As referências fornecidas possuem algumas características muito claras.

Devemos seguir MAIS FORTEMENTE essas características.

## 3.1 Grandes massas visuais

Existem áreas que ocupam grande parte da viewport.

Exemplo conceitual:

```text
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                       HEADLINE                           │
│                                                          │
│               [ PRODUTO MUITO GRANDE ]                  │
│                                                          │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Não utilizar um screenshot de 300px dentro de um card.

---

# 4. SCREENSHOTS PRECISAM SER GRANDES

Esta é uma das maiores correções necessárias.

O software é o produto.

Ele deve ser visível.

Quando houver screenshot:

* utilizar grande;
* permitir crop;
* permitir zoom;
* permitir sobreposição;
* mostrar detalhes;
* ocupar 45–65% da composição.

Em algumas seções o screenshot pode chegar a:

`700–900px`

de largura.

No hero pode ser ainda maior.

---

# 5. NÃO COLOCAR TODO SCREENSHOT DENTRO DE UM CARD BEGE

Essa repetição está proibida.

Alternativas:

* imagem solta;
* browser frame;
* tela entrando pela lateral;
* screenshot cortado pelo container;
* screenshot sobreposto a outro;
* painel saindo de trás da seção;
* screenshot com cards HTML flutuantes;
* composição com monitor/device;
* crop parcial mostrando detalhe do produto.

---

# 6. HERO — REFAZER COMPLETAMENTE

O hero atual ainda parece uma landing page genérica.

Refazer.

A primeira dobra deve ter mais presença.

Estrutura sugerida:

```text
                  HEADER AMPLO


          GESTÃO INTELIGENTE DE ESCALAS

       Escalas melhores.
       Operações mais eficientes.

   Organize jornadas, equipes e decisões
   com muito mais previsibilidade.

 [Agendar demonstração]   Conhecer plataforma


             ↓ PRODUTO ↓

┌──────────────────────────────────────────────────────────┐
│                                                          │
│              INTERFACE PONTOVIT GRANDE                   │
│                                                          │
│         cards menores parcialmente sobrepostos           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Pode ser centralizado.

Não é obrigatório manter hero em duas colunas.

Inclusive, testar versão:

**copy central em cima + dashboard enorme abaixo.**

Essa direção é mais próxima da principal referência SaaS fornecida.

---

# 7. HERO — PRODUTO

O mockup atual está minúsculo.

Remover a apresentação atual.

Criar composição usando o produto como grande peça visual.

Por exemplo:

```text
                 ┌──────────────┐
                 │ Turno hoje   │
                 └──────────────┘

      ╭────────────────────────────────────╮
      │                                    │
      │      SCREENSHOT REAL PONTOVIT      │
      │                                    │
      │                                    │
      ╰────────────────────────────────────╯

          ┌─────────────────┐
          │ Escala aprovada │
          └─────────────────┘
```

Os pequenos cards podem ser HTML.

Não gerar métricas falsas.

---

# 8. FUNDO DO HERO

Pode usar:

* branco;
* off-white muito suave;
* detalhe laranja;
* grid quase invisível;
* grande blur extremamente sutil.

Mas NÃO usar gradiente SaaS roxo/azul.

---

# 9. HEADER

O menu precisa possuir mais presença.

Atualmente está pequeno demais.

Desktop:

* container 1280–1360px;
* height 80–88px;
* logo maior;
* links mais legíveis;
* CTA maior.

A navbar deve transmitir empresa consolidada.

---

# 10. LOGOS

A seção de clientes atual está sem impacto.

Fazer uma faixa própria.

Possível composição:

```text
────────────────────────────────────────────

       Empresas que confiam na PontoVit

   LOGO     LOGO      LOGO      LOGO      LOGO

────────────────────────────────────────────
```

Pode ser marquee lento.

Dar mais área vertical.

---

# 11. NÚMEROS

Não colocar simplesmente quatro textos separados por linhas.

Criar composição editorial.

Exemplo:

```text
Até 25%          100% online
redução          acesso pela web

Multiempresa     Multiusuário
uma gestão       diferentes níveis
centralizada     de acesso
```

Números/títulos grandes.

Descriptions menores.

Sem quatro cards iguais.

---

# 12. PROBLEMA — REFAZER

A seção atual com dois cards pequenos parece componente de template.

Criar uma seção visualmente mais forte.

Possível composição:

```text
┌──────────────────────────────────────────────────────────┐
│                                                          │
│ SUA OPERAÇÃO NÃO DEVERIA                                 │
│ DEPENDER DE PROCESSOS                                    │
│ MANUAIS.                                                 │
│                                                          │
│            ┌─────────────┐   ┌─────────────────────┐     │
│            │  PLANILHAS  │ → │      PONTOVIT      │     │
│            │             │   │                     │     │
│            │  problemas  │   │    organização     │     │
│             caos         │   │    previsibilidade │     │
│            └─────────────┘   └─────────────────────┘     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Um card pode ser menor.

O card PontoVit pode ser maior.

Criar assimetria.

---

# 13. FUNCIONALIDADES — NÃO USAR LISTA GENÉRICA

A seção atual:

> Tudo que sua gestão de escalas precisa.

tem aparência de lista de features padrão.

Refazer.

Usar uma experiência mais próxima da referência.

Título:

> Tudo que sua operação precisa. Em um só lugar.

Abaixo criar linhas/pills expansíveis grandes.

Exemplo:

```text
╭─────────────────────────────╮ ╭─────────────────────────────╮
│ 01  Gestão de escalas    →  │ │ 02  Fluxo de aprovação  → │
╰─────────────────────────────╯ ╰─────────────────────────────╯

╭─────────────────────────────╮ ╭─────────────────────────────╮
│ 03  Multiempresa         →  │ │ 04  Multiusuário         → │
╰─────────────────────────────╯ ╰─────────────────────────────╯

╭─────────────────────────────╮ ╭─────────────────────────────╮
│ 05  Dashboard            →  │ │ 06  Relatórios           → │
╰─────────────────────────────╯ ╰─────────────────────────────╯
```

Altura maior.

Radius completo.

Hover sofisticado.

Possibilidade de item expandir.

---

# 14. NÃO REPETIR O MESMO FEATURE LAYOUT

Atualmente existem diversas seções:

texto | screenshot

screenshot | texto

texto | screenshot

Isso ainda parece montagem automática.

Cada feature importante precisa ser apresentada de maneira diferente.

---

# 15. FEATURE 01 — ESCALAS

Criar composição parecida com:

```text
┌──────────────────────────────────────────────────────────┐

   Pare de perder tempo
   montando escalas.

   COPY                    ┌────────────┐ ┌────────────┐
   ✓ benefício             │   turno A  │ │   turno B  │
   ✓ benefício             └────────────┘ └────────────┘
   ✓ benefício            ┌────────────────────────────┐
                          │                            │
   [Conhecer]             │  SCREENSHOT DE ESCALAS    │
                          │                            │
                          └────────────────────────────┘
```

O lado do produto deve ser visualmente dominante.

---

# 16. FEATURE 02 — FLUXO

Não repetir Feature 01 invertida.

Criar uma grande superfície.

Título central:

> Da montagem à autorização. Tudo no mesmo fluxo.

Visual abaixo ocupando quase a largura inteira:

```text
MONTAGEM
    ↓
ANÁLISE
    ↓
AUTORIZAÇÃO
    ↓
DIVULGAÇÃO
```

Mas integrado com screenshot real.

Pode existir uma tela central com estados sobrepostos.

---

# 17. FEATURE 03 — DECISÕES

Criar seção tipo dashboard showcase.

Headline central:

> Enxergue sua operação antes de tomar decisões.

Abaixo:

**dashboard muito grande.**

Pode cortar parte inferior da interface.

A composição deve lembrar a referência que mostra gráficos ocupando grande parte da tela.

---

# 18. MULTIDISPOSITIVO

Esta seção precisa ter mais personalidade.

Usar o asset com:

* desktop;
* notebook;
* smartphone.

Criar fundo warm:

`#fff7ef` aproximadamente.

Grande composição.

Não colocar imagem dentro de quadradinho bege.

Possível composição:

```text
╭──────────────────────────────────────────────────────────╮
│                                                          │
│      [ DEVICES GRANDES ]       Sua operação não fica     │
│                                presa ao escritório.      │
│                                                          │
│                                COPY                      │
│                                CTA                       │
│                                                          │
╰──────────────────────────────────────────────────────────╯
```

Container de 1200–1280px.

Altura aproximada:

`600–700px`.

---

# 19. PRECISAMOS DE PESSOAS

A página atual praticamente não possui presença humana.

As referências usam pessoas muito bem.

Adicionar no mínimo dois momentos humanos ao site.

Não utilizar pessoas como wallpaper.

Usar recortes editoriais.

---

# 20. COMPOSIÇÃO HUMANA 01

Seção de segmentos/operação.

Pessoa recortada à esquerda ou direita.

Exemplo:

```text
                   ┌───────────────┐
                   │ Turno 08–16h  │
                   └───────────────┘

     [PESSOA]

          ┌─────────────────┐
          │ Equipe completa │
          └─────────────────┘
```

Cards devem ser HTML.

Pessoa deve ser PNG/WebP transparente.

---

# 21. COMPOSIÇÃO HUMANA 02

Gestora/RH utilizando tablet.

Ao redor:

* um status;
* um horário;
* pequeno card;
* talvez gráfico real.

Não colocar coisas demais.

---

# 22. FORMAS ORGÂNICAS / QUEBRA DE SEÇÕES

As referências têm seções que não terminam sempre em linhas horizontais retas.

Podemos usar:

* grandes curvas;
* containers arredondados;
* backgrounds que invadem a próxima seção;
* imagens saindo do container.

Adicionar 2–3 momentos assim.

NÃO usar em todas as seções.

---

# 23. DARK SECTION

A seção preta atual está pequena e vazia.

Ela deveria ser um MOMENTO da página.

Aumentar bastante.

Exemplo:

```css
min-height: 680px;
```

ou equivalente proporcional.

Container grande.

Título maior.

Diagrama grande.

Elementos distribuídos.

Pode haver screenshot/cards flutuando.

Direção:

```text
╭──────────────────────────────────────────────────────────╮
│                                                          │
│       OPERAÇÃO CONECTADA                                 │
│                                                          │
│       Da estrutura da empresa                            │
│       à escala final.                                    │
│       Tudo conectado.                                    │
│                                                          │
│                     [EQUIPE]                              │
│                        │                                 │
│           [UNIDADE] — [ESCALA] — [GESTÃO]               │
│                        │                                 │
│                    [INDICADORES]                         │
│                                                          │
╰──────────────────────────────────────────────────────────╯
```

Usar cor laranja para pequenas conexões.

---

# 24. VARIAÇÃO DE BACKGROUNDS

A home não pode continuar:

```text
white
white
white
white
beige
white
black
white
```

Criar ritmo.

Sugestão:

```text
HERO                  #f7f8f9
PRODUCT OVERFLOW      #f7f8f9

CLIENTS               #ffffff

PROBLEM               #f2f4f5

PLATFORM              #ffffff

FEATURE ESCALAS       #ffffff

FLOW                   #fff7ef

DASHBOARD              #f5f6f7

MULTIDEVICE            #fff3e6

CONNECTED              #111111

BENEFITS               #ffffff

INDUSTRIES             #f5f6f7

TESTIMONIALS           #ffffff

CTA                    PONTOVIT ORANGE

FOOTER                 #111111
```

Não precisa usar exatamente essas cores.

É direção de ritmo.

---

# 25. GRANDES CONTAINERS

Adicionar containers especiais de:

* 32px radius;
* 40px radius;
* eventualmente 48px.

Referências usam grandes superfícies para estruturar blocos.

Não limitar tudo ao padrão:

`max-width + white background`.

---

# 26. ASSIMETRIA

A implementação está simétrica demais.

Adicionar composições como:

* 5 colunas texto / 7 imagem;
* screenshot passando do grid;
* card parcialmente cortado;
* imagem alinhada mais abaixo;
* elemento sobreposto.

Tudo deliberado.

Nada aleatório.

---

# 27. CARROSSEL HORIZONTAL

Usar em algum momento relevante.

Possíveis usos:

## Segmentos

```text
[Supermercados] [Indústria] [Condomínios] [Farmácias] [...]
```

ou:

## Depoimentos

cards grandes parcialmente visíveis.

Isso aproxima a experiência das referências.

---

# 28. TIPOGRAFIA

A tipografia atual ainda parece pequena nas seções intermediárias.

Aumentar headlines.

Desktop:

Hero:

`72–88px`

Principais H2:

`52–64px`

Feature headlines:

`42–52px`

Não usar bold excessivo.

A combinação de:

* peso médio;
* tamanho grande;
* line-height pequeno;

é parte importante da estética.

---

# 29. TEXT WIDTH

Não deixar parágrafos gigantescos horizontalmente.

Ideal:

`max-width: 520–620px`

Headlines podem usar larguras maiores.

---

# 30. IMAGENS GERADAS NÃO SÃO BANNERS

Quando forem adicionados os novos elementos:

* pessoa;
* gestor;
* equipe;
* calendário;
* objetos;

eles devem ser incorporados ao layout.

Não criar jpg completo de uma seção.

---

# 31. ELEMENTOS DE INTERFACE FLUTUANTES

Criar via HTML.

Exemplos:

```text
08:00 — 16:00
Turno aprovado
Equipe completa
Escala publicada
12 colaboradores
```

Usar somente informações neutras que não sejam estatísticas comerciais.

Esses pequenos elementos são permitidos.

---

# 32. NÃO DECORAR SEM MOTIVO

Não resolver este feedback adicionando:

* blobs;
* gradients;
* glows;
* várias bolinhas;
* grids 3D;
* backgrounds aleatórios.

O problema atual é COMPOSIÇÃO.

Não falta decoração.

---

# 33. PRINCÍPIO DAS REFERÊNCIAS

A estética desejada pode ser resumida como:

### Referência SaaS

Extrair:

* produto enorme;
* muito respiro;
* grandes headlines;
* cards horizontais;
* dashboards;
* dark section;
* narrativa de produto.

### Referência Acountech

Extrair:

* grandes mudanças de fundo;
* fotografia integrada;
* seções visualmente distintas;
* curvas;
* componentes grandes;
* uso forte da identidade da marca.

### Referência Ótica

Extrair:

* composição editorial;
* pessoa como peça visual;
* sobreposições;
* fotografia premium;
* cards/imagens que saem do grid;
* equilíbrio entre conteúdo e imagem.

### Referência Caravelas

Extrair somente:

* organização;
* grandes blocos;
* grids;
* separação visual entre áreas.

Não copiar estética de e-commerce.

---

# 34. OBJETIVO VISUAL

Quando a página for vista em zoom reduzido, deve ser possível reconhecer claramente:

* um hero;
* uma grande apresentação do produto;
* uma comparação;
* um feature showcase;
* uma área editorial;
* uma área warm;
* uma dark section;
* pessoas;
* uma área de prova social;
* um CTA final.

Hoje, em zoom reduzido, quase tudo parece uma sequência de textos e pequenos cards.

Isso deve mudar.

---

# 35. PRIMEIRA AÇÃO

Não implementar novas seções ainda.

Refazer primeiro:

1. Header
2. Hero
3. Product showcase
4. Social proof
5. Problem section
6. Platform capabilities

Depois parar e revisar visualmente.

Somente após esses seis blocos estarem aprovados, continuar.

---

# 36. IMPORTANTE

Não tente preservar o layout atual por medo de apagar código.

A composição atual não é a direção aprovada.

Pode refatorar ou remover seções inteiras.

O objetivo é qualidade visual, não aproveitar implementação anterior.

---

# 37. TESTE FINAL

Tirar screenshot da página completa em 1440px.

Reduzir visualmente para aproximadamente 25%.

Se a página parecer:

> uma coluna de texto com quadradinhos

falhou.

Ela precisa possuir GRANDES FORMAS VISUAIS claramente perceptíveis mesmo reduzida.

---

# 38. REGRA FINAL

Menos “landing page SaaS”.

Mais:

**direção de arte + produto real + editorial + identidade PontoVit.**
