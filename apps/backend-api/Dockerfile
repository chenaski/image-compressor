FROM node:16-alpine AS base

WORKDIR /opt/app

ENV CI=1

RUN apk update
RUN corepack enable



FROM base AS builder

COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY package.json .
COPY apps/backend-api/package.json apps/backend-api/package.json
RUN pnpm install

COPY nx.json .
COPY tsconfig.base.json .
COPY apps/backend-api apps/backend-api

ENV NODE_ENV=production
RUN pnpm nx run-many --target build
RUN pnpm --filter backend-api --prod deploy bundled



FROM base as production

COPY --from=builder /opt/app/bundled/node_modules ./node_modules

COPY --from=builder /opt/app/apps/backend-api/package.json .
COPY --from=builder /opt/app/apps/backend-api/dist ./dist

CMD npm start
