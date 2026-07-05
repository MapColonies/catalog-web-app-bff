FROM node:24.0.0 AS build

WORKDIR /tmp/buildApp

COPY ./package*.json ./
RUN npm install --ignore-scripts

COPY . .
RUN if [ -d patches ] && [ "$(ls -A patches 2>/dev/null)" ]; then npm run patch:deps && npm run copypatch:deps:wfs && npm run patch; fi
RUN npm run build


FROM node:24.0.0-alpine3.21 AS production

RUN apk add dumb-init

ENV NODE_ENV=production
ENV SERVER_PORT=8080

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci --only=production --unsafe-perm --ignore-scripts

COPY --chown=node:node --from=build /tmp/buildApp/dist .
COPY --chown=node:node ./config ./config


USER node
EXPOSE 8080
CMD ["dumb-init", "node", "--max_old_space_size=512", "./index.js"]
