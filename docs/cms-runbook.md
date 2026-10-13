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

A API key é criada em **Usuários e API** (`/admin/users`) ou pela rota autenticada `POST /api/admin/api-keys`. O valor integral é exibido somente na criação; o banco guarda apenas o hash.

### Integração com o Manus

No CMS, abra **Usuários e API**, crie uma chave chamada `Integração Manus` e marque os escopos `posts:write` e `media:write`. O valor integral da chave aparece apenas uma vez.

Primeiro envie a imagem de capa:

```bash
curl --request POST 'https://www.pontovit.com.br/api/v1/media' \
  --header 'Authorization: Bearer pv_SUA_CHAVE' \
  --form 'file=@./imagem.webp' \
  --form 'altText=Descrição acessível da imagem'
```

A resposta inclui o identificador da mídia:

```json
{
  "data": {
    "id": "ID_DA_MIDIA",
    "filename": "imagem.webp",
    "mimeType": "image/webp",
    "altText": "Descrição acessível da imagem"
  },
  "url": "https://www.pontovit.com.br/api/media/ID_DA_MIDIA"
}
```

Consulte as categorias em `GET /api/v1/categories` e use o `id` desejado. Depois crie o post como rascunho:

```bash
curl --request POST 'https://www.pontovit.com.br/api/v1/posts' \
  --header 'Authorization: Bearer pv_SUA_CHAVE' \
  --header 'Content-Type: application/json' \
  --data '{
    "title": "Título do artigo",
    "slug": "titulo-do-artigo",
    "excerpt": "Resumo do artigo em até 320 caracteres.",
    "content": [
      { "type": "p", "html": "Parágrafo de abertura." },
      { "type": "h2", "text": "Primeiro tópico" },
      { "type": "p", "html": "Texto com <strong>destaque</strong>." },
      { "type": "ul", "items": ["Primeiro item", "Segundo item"] },
      { "type": "quote", "text": "Uma citação relevante." }
    ],
    "categoryIds": ["ID_DA_CATEGORIA"],
    "coverMediaId": "ID_DA_MIDIA",
    "status": "DRAFT",
    "seoTitle": "Título para o Google",
    "seoDescription": "Descrição para os resultados de busca.",
    "seoNoIndex": false
  }'
```

Formatos aceitos no campo `content`: documento JSON do Tiptap usado pelo editor ou a lista simplificada de blocos mostrada acima. Para automações, prefira a lista de blocos. Slugs repetidos retornam HTTP `409`; dados inválidos retornam `422`; credencial ausente ou inválida retorna `401`.

## Operação de produção

1. Gere segredos novos por ambiente e nunca copie o `.env` para o Git.
2. Faça backup do PostgreSQL, que contém os novos uploads, e preserve o diretório de mídia para os arquivos legados.
3. Execute `pnpm db:deploy` antes de iniciar a nova versão.
4. Execute `pnpm build` e valide login, Blog, formulário, sitemap e API.
5. Em múltiplas instâncias, mova `RateLimitBucket`/`LoginAttempt` para Redis compartilhado mantendo os mesmos services.
