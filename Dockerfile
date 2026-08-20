FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install --global pnpm@10.15.1 && pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "run", "start"]
