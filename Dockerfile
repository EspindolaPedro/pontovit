FROM node:20-alpine

WORKDIR /app

# Prisma precisa de uma URL durante a geração do client no build.
# O EasyPanel substitui este valor pela DATABASE_URL real em runtime.
ARG DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/postgres
ENV DATABASE_URL=${DATABASE_URL}

COPY package.json pnpm-lock.yaml ./

RUN npm install --global pnpm@10.15.1 && pnpm install --frozen-lockfile

COPY . .

RUN pnpm exec prisma generate
RUN pnpm run build
RUN mkdir -p .next/standalone/public .next/standalone/.next/static \
    && cp -r public/. .next/standalone/public/ \
    && cp -r .next/static/. .next/standalone/.next/static/ \
    && test -f .next/standalone/public/assets/product/pontovit-logo.png

ENV NODE_ENV=production
ENV PORT=3000
# O container fica em mais de uma rede Docker (ex.: EasyPanel), cada uma com um IP
# diferente. Sem isso, o server standalone do Next.js usa a variável HOSTNAME (que o
# Docker preenche sozinho com o ID do container) para decidir em qual IP escutar — e
# pode acabar ouvindo só numa das redes, deixando o proxy reverso sem conseguir
# alcançá-lo ("connection refused" -> 502). 0.0.0.0 faz escutar em todas as interfaces.
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["sh", "-c", "pnpm db:deploy && (pnpm db:restore-media || echo 'Aviso: nao foi possivel restaurar as midias publicas') && (pnpm db:seed-magno-photo || echo 'Aviso: nao foi possivel semear a foto do Magno') && node .next/standalone/server.js"]
