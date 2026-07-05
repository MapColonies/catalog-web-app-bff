FROM node:24.0.0 AS build

WORKDIR /tmp/buildApp

COPY ./package*.json ./
RUN npm install

COPY . .
RUN if [ -d patches ] && [ "$(ls -A patches 2>/dev/null)" ]; then npm run patch:deps && npm run copypatch:deps:wfs && npm run patch; fi
RUN npm run build


FROM node:24.0.0-slim AS production

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV SERVER_PORT=8080

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=build /tmp/buildApp/dist .
COPY --chown=node:node --from=build /tmp/buildApp/node_modules ./node_modules
COPY --chown=node:node ./config ./config


USER node
EXPOSE 8080
CMD ["dumb-init", "node", "--max_old_space_size=512", "./index.js"]
