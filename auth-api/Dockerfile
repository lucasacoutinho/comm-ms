# Transpile TS to JS
FROM node:20.4.0-alpine as TEMP_BUILD_IMAGE

ENV APP_DIR=/app

WORKDIR $APP_DIR

# Copy package.json and package-lock.json before other files to cache dependencies installation if unchanged
COPY package*.json .

COPY tsconfig*.json .

RUN yarn

# Copy source code
COPY . .

RUN ls

RUN yarn build

# Run JS server
FROM node:20.4.0-alpine AS SERVER

ENV APP_DIR=/app

WORKDIR $APP_DIR

# Copy package.json and package-lock.json before other files to cache dependencies installation if unchanged
COPY package*.json .

RUN yarn install --production

# Copy source code
COPY --from=TEMP_BUILD_IMAGE $APP_DIR/dist ./dist

EXPOSE 3000

CMD node dist/app.js
