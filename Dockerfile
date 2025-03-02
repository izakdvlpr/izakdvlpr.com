FROM node:lts-alpine AS base
ENV NODE_NO_WARNINGS=1
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS development
WORKDIR /usr/src/app
COPY . .
CMD ["sh", "-c", "npm install --force && npm run dev"]

FROM base AS production
WORKDIR /usr/src/app
COPY . .
RUN npm install --force
RUN npm run build
CMD ["npm", "run", "start"]