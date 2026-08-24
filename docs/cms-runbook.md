# Runbook do CMS

## Inicialização local

```bash
cp .env.example .env
docker compose up -d postgres
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm db:import-blog
pnpm db:import-brand
pnpm dev
```

Abra `http://localhost:3000/admin/login` com os valores de `CMS_ADMIN_EMAIL` e `CMS_ADMIN_PASSWORD` do `.env`.

O PostgreSQL do projeto usa `localhost:5434` porque a porta 5433 já era utilizada por outro container local. Dentro da rede Docker, o serviço continua na porta 5432.

## Conteúdo público

O Blog consulta posts publicados no PostgreSQL em runtime. Se o banco estiver indisponível, o site mantém o conteúdo estático existente como fallback para evitar uma página quebrada durante a migração. O Home e a página de Parceiros consultam as logos do CMS e também têm fallback para os assets atuais.

## API de integração

```http
GET /api/v1/posts?page=1&pageSize=10&q=escala&category=tecnologia
POST /api/v1/posts
Authorization: Bearer pv_sua_api_key
Content-Type: application/json
```

A API key é criada em `/admin/users`/módulo de acesso quando a tela de gerenciamento de chaves for habilitada, ou pela rota autenticada `POST /api/admin/api-keys`. O valor integral é exibido somente na criação; o banco guarda apenas o hash.

## Operação de produção

1. Gere segredos novos por ambiente e nunca copie o `.env` para o Git.
2. Faça backup do PostgreSQL e do diretório de mídia.
3. Execute `pnpm db:deploy` antes de iniciar a nova versão.
4. Execute `pnpm build` e valide login, Blog, formulário, sitemap e API.
5. Em múltiplas instâncias, mova `RateLimitBucket`/`LoginAttempt` para Redis compartilhado mantendo os mesmos services.
