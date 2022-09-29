FROM node:16-alpine AS base

WORKDIR /opt/app

ENV CI=1

RUN apk update
RUN corepack enable



FROM base AS builder

COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY package.json .
COPY apps/website/package.json apps/website/package.json
RUN pnpm install

COPY nx.json .
COPY tsconfig.base.json .
COPY apps/website apps/website

ENV NODE_ENV=production
RUN pnpm nx run website:build
RUN pnpm --filter website --prod deploy bundled



FROM base as production

COPY --from=builder /opt/app/bundled/node_modules ./node_modules

COPY --from=builder /opt/app/apps/website/package.json .
COPY --from=builder /opt/app/apps/website/build ./build
COPY --from=builder /opt/app/apps/website/public ./public

CMD npm start
