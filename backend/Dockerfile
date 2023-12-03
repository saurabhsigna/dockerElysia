FROM oven/bun:latest


ENV APP_HOME=/usr/src/app \
    TERM=xterm
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY package.json .
COPY bun.lockb .

RUN bun install


# COPY . /app/.
COPY . ./backend

ENV PORT 3000
ENV NODE_ENV production
CMD ["bun", "start"]

EXPOSE 3000