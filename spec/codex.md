# `CODEX.md` — Instrução inicial para implementação

Você está desenvolvendo o novo website institucional da PontoVit.

Antes de escrever código:

1. Leia `site.md` por completo.
2. Leia `assets.md` por completo.
3. Analise os assets disponíveis no projeto.
4. Identifique logos, screenshots e imagens reaproveitáveis.
5. Não implemente baseado em suposições que contradigam esses documentos.

---

## Objetivo

Reconstruir completamente a home da PontoVit em Next.js.

O projeto antigo NÃO é referência visual.

O conteúdo existente da PontoVit é referência de negócio.

A nova UI deve seguir rigorosamente a direção definida em `site.md`.

---

# Stack

Usar:

* Next.js atual do projeto;
* App Router;
* TypeScript;
* Tailwind CSS;
* `next/image`;
* `next/font`;
* lucide-react.

Motion somente quando houver ganho visual real.

Não instalar bibliotecas desnecessárias.

---

# Primeira tarefa

Antes de implementar a página inteira, faça:

1. estrutura global;
2. design tokens;
3. container;
4. tipografia;
5. navbar;
6. hero;
7. mockup principal;
8. primeira seção de prova social.

Depois avalie consistência visual e continue as outras seções.

Não gere toda a página de uma vez com componentes genéricos.

---

# Qualidade visual

O resultado deve parecer:

* customizado;
* premium;
* SaaS B2B;
* limpo;
* editorial;
* preciso.

Referências visuais fornecidas ao projeto valorizam especialmente:

* menus largos;
* grandes headlines;
* whitespace;
* layouts assimétricos bem equilibrados;
* grandes screenshots de software;
* cards horizontais;
* grandes áreas arredondadas;
* alternância entre seções claras e escuras;
* elementos humanos integrados ao produto;
* seções amplas e bem compostas.

---

# Não inventar conteúdo

Não inventar:

* clientes;
* estatísticas;
* depoimentos;
* integrações;
* funcionalidades;
* preços;
* certificações.

Quando uma informação estiver marcada:

`[VALIDAR COM CLIENTE]`

ela não deve aparecer publicamente até confirmação.

---

# Regra de pricing

Não existe pricing no website.

Não criar nenhuma seção de preço.

Não colocar:

* planos;
* mensalidades;
* “começando em”;
* tabela comparativa;
* checkout.

---

# Conversão

A conversão comercial ocorre pelo WhatsApp.

CTA padrão:

> Agendar demonstração

CTA alternativo:

> Falar com um especialista

Centralizar a configuração do WhatsApp.

Não hardcodar o telefone em vários arquivos.

---

# WhatsApp

Número inicial:

`5551992998338`

Mensagem:

`Olá! Conheci a PontoVit pelo site e gostaria de entender como a plataforma pode ajudar na gestão de escalas da minha empresa.`

Criar helper para gerar o link.

Abrir em nova aba.

---

# Componentização

Não criar um componente gigantesco `page.tsx`.

Separar componentes da home.

Entretanto, não fragmentar exageradamente elementos triviais.

Componentes devem existir quando:

* possuem responsabilidade própria;
* são reutilizados;
* representam seção clara;
* possuem lógica própria.

---

# CSS/design

Não reproduzir estética default do shadcn.

Shadcn pode ser usado estruturalmente caso já exista, mas o visual precisa ser customizado.

Nunca deixar aparência de componente default.

---

# Screenshots do produto

Prioridade alta.

Procurar primeiro por screenshots reais nos assets.

Assets conhecidos do site anterior:

`home-2.png`

`home-3.png`

Se estiverem disponíveis, podem ser incorporados.

Caso haja screenshots novos e melhores, priorizar os novos.

---

# Hero

Não usar stock photo como background.

Hero deve ser baseado em:

* headline forte;
* copy;
* CTA;
* interface PontoVit;
* pequenos detalhes de marca.

Produto precisa aparecer sem o usuário rolar muito.

---

# Espaçamento

Não compactar.

Desktop deve ter bastante respiro.

Se o layout começar a parecer “cheio”, remova elementos antes de reduzir espaços.

---

# Cards

Não transformar cada informação em card.

Usar cards somente quando melhorarem agrupamento ou interação.

Preferir tipografia e composição.

---

# Laranja

Usar como accent.

Se uma tela inteira começar a ficar laranja, provavelmente está errado.

Exceção:

CTA final pode assumir fundo da cor da marca.

---

# Animações

Adicionar somente depois da estrutura visual estar correta.

Primeiro:

* layout;
* proporção;
* tipografia;
* contraste;
* alinhamento.

Depois:

* microinterações;
* reveal;
* navbar;
* marquee.

---

# Mobile

Não tratar responsividade no final.

Cada seção criada deve ser finalizada também em:

* desktop;
* tablet;
* mobile.

Não aceitar overflow horizontal.

---

# Critério de comparação

Após cada grande bloco, revisar visualmente.

Perguntar:

> Isto parece um website customizado de uma empresa de software B2B em 2026 ou parece uma landing page gerada automaticamente?

Se parecer genérico:

* aumentar qualidade da composição;
* simplificar;
* melhorar proporções;
* melhorar whitespace;
* utilizar melhor o produto real.

Não resolver adicionando mais decoração.

---

# Ordem de construção

Implementar nesta ordem:

1. Global styles
2. Header
3. Hero
4. Product mockup
5. Client logos
6. Metrics
7. Problem comparison
8. Platform overview
9. Feature showcase — escalas
10. Feature showcase — fluxo
11. Feature showcase — dashboard
12. Multidevice
13. Dark connected-operation section
14. Benefits
15. Cost efficiency
16. Industries
17. Testimonials
18. Blog
19. Final CTA
20. Footer

---

# Após implementar

Executar:

```bash
npm run build
```

Corrigir:

* TypeScript;
* lint;
* hydration;
* imagens;
* warnings;
* responsividade.

Depois fazer revisão visual completa em:

```text
375px
430px
768px
1024px
1440px
1920px
```

Não considerar concluído apenas porque compila.

---

# Resultado esperado

A nova PontoVit deve abandonar completamente a aparência antiga e estabelecer uma identidade digital nova:

> tecnológica sem ser futurista;
> corporativa sem ser fria;
> humana sem depender de stock photos;
> premium sem exageros;
> comercial sem parecer infoproduto;
> simples sem parecer vazia.

O produto e os benefícios da operação são os protagonistas.

Mantenha essa direção durante toda a implementação.
