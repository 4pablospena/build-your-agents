# Dash / Kubernetes — Nitro node-server (.output/server/index.mjs)
# Vercel uses its own build (preset `vercel`); do not deploy this image to Vercel.

FROM node:20-bookworm-slim AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

COPY package.json pnpm-lock.yaml ./

# postinstall runs sync/og scripts — source is not copied yet; build:dash runs them after COPY
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm run build:dash

FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=build /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
