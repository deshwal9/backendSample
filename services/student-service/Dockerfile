FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm i --omit=dev
COPY tsconfig.json ./
COPY src ./src
RUN npm run build || (npm i && npm run build)
ENV PORT=3001
EXPOSE 3001
CMD [ "npm", "start" ]

