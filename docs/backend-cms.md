# Backend e CMS

Este documento substitui a proposta antiga de Payload/SQLite. A implementação atual usa Next.js App Router, PostgreSQL em Docker e Prisma 7 com adapter PostgreSQL.

## Comandos locais

```bash
cp .env.example .env
docker compose up -d postgres
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

O compose usa a porta `5434` no host para evitar conflito com outros containers locais. O banco continua ouvindo em `5432` dentro do container.

## Estrutura de aplicação

- `src/server/db`: cliente Prisma singleton.
- `src/server/validation`: contratos Zod e normalização de entrada.
- `src/server/security`: sanitização e rate limiting persistido.
- `src/server/auth`: senha, sessão HttpOnly e API keys.
- `src/server/modules`: services de domínio, isolados dos Route Handlers.
- `src/app/api`: controllers HTTP do App Router.
- `prisma/schema.prisma`: modelos e relações do CMS.

## Endpoints iniciais

- `POST /api/admin/auth/login`: login com bloqueio após cinco falhas em cinco minutos.
- `POST /api/admin/auth/logout`: encerra a sessão.
- `POST /api/contact`: valida/sanitiza o formulário, aplica rate limiting e devolve a URL estruturada do WhatsApp.
- `GET /api/v1/posts`: posts publicados com paginação, busca e filtro por categoria.
- `POST /api/v1/posts`: criação via `Authorization: Bearer <API_KEY>` e escopo `posts:write`.

### Integração de mídia

- `POST /api/v1/media`: upload autenticado de JPG, PNG ou WebP.
- Requer `Authorization: Bearer <API_KEY>` com o escopo `media:write`.
- A imagem pode ter até 5 MB e deve ser enviada como `multipart/form-data`, no campo `file`.
- A resposta contém `data.id`, usado como `coverMediaId` na criação do post.

## Produção

Não versionar `.env`, senhas, tokens ou chaves. Aplicar `pnpm db:deploy` antes do novo processo da aplicação e fazer backup do PostgreSQL, que também armazena os bytes dos novos uploads. O diretório de mídia continua sendo usado como compatibilidade para arquivos legados. Em múltiplas instâncias, trocar o rate limit local do banco por Redis compartilhado sem alterar os contratos dos services.
