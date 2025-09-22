FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm i --omit=dev
COPY tsconfig.json ./
COPY src ./src
RUN npm run build || (npm i && npm run build)
ENV PORT=3000
EXPOSE 3000
CMD [ "npm", "start" ]

