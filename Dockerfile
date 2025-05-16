FROM node:18

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY jest.config.js ./
COPY playwright.config.ts ./

COPY src ./src
COPY tests ./tests

RUN npm install && npx playwright install

CMD ["npm", "run", "test"]
