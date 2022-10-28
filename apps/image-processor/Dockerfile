FROM node:16-alpine AS base

WORKDIR /opt/app

ENV CI=1

RUN apk update
RUN corepack enable



FROM base AS builder

COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY package.json .
COPY apps/image-processor/package.json apps/image-processor/package.json
COPY packages/compressor/package.json packages/compressor/package.json
RUN pnpm install

COPY nx.json .
COPY tsconfig.base.json .
COPY apps/image-processor apps/image-processor
COPY packages/compressor packages/compressor

ENV NODE_ENV=production
RUN pnpm nx run-many --target build
RUN pnpm --filter image-processor --prod deploy bundled



FROM base as production

COPY --from=builder /opt/app/bundled/node_modules ./node_modules

COPY --from=builder /opt/app/apps/image-processor/package.json .
COPY --from=builder /opt/app/apps/image-processor/dist ./dist

CMD npm start
