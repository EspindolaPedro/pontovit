# Backend e CMS

## Direção escolhida

O site será um único projeto Next.js com App Router, usando Server Components por padrão e um CMS headless self-hosted para conteúdo editorial.

CMS recomendado: Payload CMS com SQLite no primeiro deploy.

Motivos:

- o painel, a API e o front podem viver no mesmo processo Node;
- SQLite evita adicionar outro serviço de banco em um servidor com 1,9 GB de RAM;
- o conteúdo de páginas, posts, categorias, autores e mídia fica separado da apresentação;
- o banco pode ser migrado depois para Postgres sem reescrever os componentes da página;
- o acesso administrativo pode ficar atrás de `/admin` e de uma camada de reverse proxy.

## Coleções planejadas

### Users

Usuários administrativos do CMS. Não compartilhar credenciais do WordPress. Criar contas novas e individuais.

### Pages

Páginas institucionais com slug, título SEO, resumo, blocos de conteúdo e status de publicação.

### Posts

Artigos do blog com slug, categoria, resumo, conteúdo rico, imagem de capa, autor, data de publicação e status.

### Categories

Categorias preservadas do blog atual: Destaques, Escalas de trabalho, Gestão Empresarial, Leis Trabalhistas, Ponto Eletrônico e Sem categoria.

### Media

Imagens de conteúdo e screenshots do produto. Os assets estáticos da interface continuam em `public/assets`; mídia editorial deve ser gerenciada pelo CMS.

## Segurança de produção

- `PAYLOAD_SECRET` deve ser uma chave longa, aleatória e exclusiva do ambiente.
- Nunca commitar `.env` ou senha do banco.
- Criar usuários administrativos individuais; não usar conta compartilhada.
- Manter `/admin` protegido por HTTPS e, se possível, por uma camada extra no Apache/Nginx.
- Usar reverse proxy na frente do Node para limitar payload, requisições lentas e abuso.
- Fazer backup do arquivo SQLite e da pasta de mídia antes de cada deploy.
- Não reutilizar a chave SSH pessoal para automações do deploy; usar uma chave exclusiva e auditável.

## Deploy previsto no servidor atual

1. Instalar Node LTS e um gerenciador de processo, preferencialmente systemd ou PM2.
2. Gerar o build com `pnpm build`.
3. Executar `node .next/standalone/server.js` em localhost.
4. Manter Apache como reverse proxy HTTPS para o processo Node.
5. Servir assets estáticos via Apache/CDN quando fizer sentido.
6. Monitorar memória e cache de imagens antes de habilitar tarefas de processamento pesado.

O WordPress e seu banco não devem ser removidos durante a migração. A troca de DNS e a desativação do legado só acontecem depois de validar conteúdo, redirects, SEO e backups.
