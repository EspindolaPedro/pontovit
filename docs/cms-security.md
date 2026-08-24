# CMS — regras de segurança e entrada

Toda entrada que chega por formulário, painel ou API é tratada como não confiável.

## Fluxo obrigatório

1. O Route Handler recebe o payload e limita o tamanho/conteúdo esperado.
2. O contrato Zod valida tipos, campos obrigatórios, limites e enumerações.
3. O normalizador remove caracteres de controle, padroniza e-mail/slug e valida protocolos de URL.
4. Rich text passa por allowlist de tags e atributos com `sanitize-html`.
5. O service aplica as regras de negócio e só então persiste no Prisma.
6. Conteúdo editorial é sanitizado novamente antes de ser renderizado publicamente.

Nunca usar `dangerouslySetInnerHTML` com valor vindo diretamente do request ou do banco sem passar pelo sanitizador. Snippets de HTML/CSS/JavaScript do CMS são uma exceção deliberada e devem ficar restritos a usuários `OWNER`/`ADMIN`, com auditoria e publicação explícita.

## Proteções já implementadas

- Login: cinco falhas por janela de cinco minutos bloqueiam a combinação IP/e-mail por cinco minutos.
- Formulário de contato: cinco envios por janela de cinco minutos por origem, com honeypot contra bots.
- Sessão: token aleatório armazenado apenas como hash no banco e cookie HttpOnly/SameSite.
- API do blog: escrita exige API key com hash, expiração, revogação e escopo `posts:write`.
- URLs: somente `http`, `https`, `mailto` e `tel` onde aplicável; `javascript:` e `data:` são rejeitados.
- Segredos: `.env` e `.env.*` estão no `.gitignore`; somente `.env.example` é versionável.

## Próxima camada de produção

O rate limit persistido no PostgreSQL cobre a fundação local. Em múltiplas instâncias, conectar o mesmo contrato a Redis/Upstash para que a janela seja compartilhada entre processos. Adicionar WAF/reverse proxy, limites de payload, logs estruturados e alertas antes de abrir o painel publicamente.
