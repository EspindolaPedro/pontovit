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
RUN cp -r public .next/standalone/public && cp -r .next/static .next/standalone/.next/static

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["sh", "-c", "pnpm db:deploy && pnpm db:restore-media && node .next/standalone/server.js"]
