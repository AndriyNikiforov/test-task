
FROM node:lts

WORKDIR "/app"

COPY . .

RUN npm i -g pm2
RUN pm2-runtime -h
RUN npm i

CMD ["sh","-c","pm2-runtime start ecosystem.config.js --watch"]
