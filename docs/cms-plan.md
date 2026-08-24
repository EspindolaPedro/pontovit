# Plano do CMS PontoVit

## 1. Objetivo

Transformar o site atual em uma aplicação Next.js com CMS administrativo integrado, mantendo a identidade visual existente e substituindo gradualmente os dados estáticos por dados publicados no PostgreSQL.

O CMS será executado no mesmo projeto Next.js, com separação clara entre apresentação, aplicação, domínio e infraestrutura. O site público continuará funcionando com fallback local durante toda a migração.

## 2. Arquitetura escolhida

- Next.js App Router e TypeScript.
- PostgreSQL em container Docker para desenvolvimento local.
- Prisma como ORM, migrations versionadas e tipos gerados.
- Validação de entrada com Zod no limite de cada caso de uso.
- MVC adaptado ao App Router:
  - Models: schema Prisma e tipos de domínio.
  - Controllers: Route Handlers `/api` e actions do painel.
  - Services: regras de negócio reutilizáveis.
  - Repositories: acesso ao Prisma isolado do domínio.
- Sessão administrativa em cookie HttpOnly, Secure em produção e SameSite=Lax.
- Senhas com Argon2id quando disponível; bcryptjs como fallback compatível com o ambiente atual.
- Rate limiting persistido no PostgreSQL inicialmente; Redis será adicionado quando o volume justificar.
- Rich text com TipTap, armazenado como JSON estruturado e renderizado por componentes permitidos.
- Imagens armazenadas em disco persistente local no primeiro estágio, com adapter preparado para S3/Cloudflare R2.

## 3. Módulos do CMS

### Conteúdo

- Posts, categorias, autores, status de rascunho/publicado e agendamento.
- Editor rich text com parágrafos, títulos, listas, citações, links, imagens e alt text.
- Mídia com metadados, foco de enquadramento, largura, altura e texto alternativo.
- Preview protegido para rascunhos.
- Histórico mínimo de publicação e `updatedAt` para invalidar cache.

### Marca e configurações

- Dados da empresa: nome, descrição, logo, e-mail, telefone, WhatsApp e endereço.
- Redes sociais editáveis.
- Logos de clientes e parceiros: upload, nome, alt text, ordem, visibilidade e grupo.
- Links e textos dos botões de conversão.
- Snippets de header e footer, separados em HTML, CSS e JavaScript, com escopo e auditoria.

### Usuários e segurança

- Usuários administrativos com papéis `OWNER`, `ADMIN`, `EDITOR` e `AUTHOR`.
- Permissões por recurso e ação.
- Login com sessão HttpOnly, expiração e logout.
- Bloqueio após 5 tentativas inválidas por 5 minutos por combinação de IP e usuário.
- Rate limiting dos formulários públicos por IP, rota e janela de tempo.
- API keys armazenadas somente como hash, com escopos, expiração e revogação.
- Auditoria para login, publicação, alteração de configurações, snippets e exclusões.

## 4. Modelo de dados inicial

- `User`, `Session`, `LoginAttempt`, `AuditLog`.
- `Post`, `Category`, `PostCategory`, `Media`.
- `SiteSettings`, `SocialLink`, `BrandLogo`, `CtaSettings`.
- `CodeInjection`.
- `ApiKey`.

Todos os registros editoriais terão `createdAt`, `updatedAt` e, quando aplicável, `publishedAt`, `deletedAt`, `createdById` e `updatedById`.

## 5. API pública e administrativa

### Blog público

- `GET /api/v1/posts`: paginação, busca, categoria, status publicado e ordenação.
- `GET /api/v1/posts/:slug`: post publicado por slug.
- `GET /api/v1/categories`: categorias públicas.

### Blog de integração

- `POST /api/v1/posts`: criação por API key com escopo `posts:write`.
- `PATCH /api/v1/posts/:id`: edição por API key com escopo `posts:write`.
- `DELETE /api/v1/posts/:id`: exclusão lógica por API key com escopo `posts:delete`.

As rotas de escrita nunca aceitarão `authorId`, `createdAt`, `updatedAt`, permissões ou status sem validação explícita. A API retornará contratos JSON estáveis e mensagens de erro sem detalhes internos.

## 6. SEO

- Metadata por página e por post.
- `title`, description, canonical, robots e Open Graph editáveis.
- JSON-LD de Organization, WebSite, BreadcrumbList e Article.
- Sitemap dinâmico somente com URLs publicadas e indexáveis.
- Robots configurável sem permitir indexação de `/admin`, previews ou endpoints.
- Slugs únicos, redirects de slug antigo e prevenção de conteúdo duplicado.
- Imagens sociais e alt text obrigatórios no fluxo de publicação.
- RSS/Atom do blog em fase posterior.

## 7. Migração do site atual

1. Importar `src/data/blog-posts.json` para posts e categorias.
2. Preservar os slugs atuais e gerar redirects quando houver alteração.
3. Migrar `siteConfig` para `SiteSettings` e `SocialLink`.
4. Migrar arrays de logos para `BrandLogo`, preservando ordem e alt text.
5. Criar repositórios com fallback estático enquanto o banco não estiver configurado.
6. Trocar primeiro o Blog, depois configurações globais, logos e finalmente textos institucionais.
7. Remover o fallback somente depois de validar produção e fazer backup.

## 8. Painel administrativo

- `/admin/login`: login com feedback acessível e bloqueio visível quando aplicável.
- `/admin`: dashboard com posts publicados, rascunhos, categorias, mídia e atividade recente.
- Sidebar fixa no desktop, drawer no mobile e header fixo.
- Tabelas com busca, filtros, ordenação, paginação e ações em lote seguras.
- Formulários com autosave opcional, preview e confirmação para ações destrutivas.
- Design limpo alinhado à PontoVit: branco, grafite, laranja e amarelo como ênfase.

## 9. Operação local e produção

```bash
docker compose up -d postgres
pnpm install
pnpm prisma migrate dev
pnpm prisma db seed
pnpm dev
```

Produção deve usar `DATABASE_URL`, `AUTH_SECRET`, `PAYLOAD_SECRET`/segredo equivalente, chaves de API e storage persistente fora do Git. `.env` nunca será commitado; somente `.env.example` com placeholders permanecerá versionado.

Antes de cada deploy:

1. Backup do PostgreSQL e da mídia.
2. Aplicação das migrations.
3. Build e validação de tipos.
4. Smoke test do login, blog, API, formulário e sitemap.
5. Verificação de logs e rollback documentado.

## 10. Fases de implementação

### Fase 1 — fundação

Docker PostgreSQL, Prisma, schema, migrations, seed, contratos, validações, autenticação e rate limiting.

### Fase 2 — Blog

CRUD administrativo de posts/categorias, rich text, mídia, preview, publicação e integração da página pública.

### Fase 3 — configurações e marcas

SiteSettings, CTA, redes sociais, logos de clientes/parceiros e snippets administráveis.

### Fase 4 — SEO e qualidade

Metadata dinâmica, JSON-LD, sitemap, redirects, auditoria, testes e observabilidade.

### Fase 5 — produção

Backup, storage persistente, deploy, domínio do painel, revisão de permissões e remoção gradual dos fallbacks.

## 11. Critérios de aceite

- Nenhuma credencial ou `.env` versionada.
- Toda entrada externa validada no backend.
- Nenhuma regra de negócio duplicada entre página, API e painel.
- Usuário sem permissão não acessa nem por URL direta.
- Posts estáticos atuais importados sem perda de slug, imagem ou categoria.
- API de escrita exige key válida, escopo correto e rate limiting.
- Login bloqueia na quinta falha durante cinco minutos.
- Formulário público tem limite por IP e resposta genérica contra abuso.
- Build, migrations, seed e smoke tests documentados e reproduzíveis.
