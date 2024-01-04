# common build stage
FROM node:17-alpine as common-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# development stage
FROM common-build as development-build
ENV NODE_ENV development
COPY --from=common-build /app/.env ./
RUN true
EXPOSE 5000
CMD [ "npm", "run", "dev" ]

# production stage
FROM common-build as production-build
ENV NODE_ENV production
WORKDIR /app
COPY --from=common-build /app/package*.json ./
RUN npm install --omit=dev
COPY --from=common-build /app/dist ./dist/
RUN true
COPY --from=common-build /app/.env ./dist/
RUN mkdir -p /app/dist/uploads && chown -R node:node /app/dist/uploads
USER node
EXPOSE 5000
CMD [ "npm", "start" ]