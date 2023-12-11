FROM oven/bun:latest


ENV APP_HOME=/usr/src/app

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME



COPY . .
RUN bun install

ENV PORT 3000
ENV NODE_ENV production
CMD [ "bun","run","dev" ]


EXPOSE 3000