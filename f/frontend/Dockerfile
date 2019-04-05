FROM node:8
USER root
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
WORKDIR /home/node
RUN npm install @angular/cli@1.2.6 -g
WORKDIR /src/app
COPY package*.json /src/app
RUN npm install && npm cache verify
COPY ./ /src/app

# create watch files
CMD ng serve --host 0.0.0.0 --disable-host-check --proxy-config proxy.conf.dev.json
EXPOSE 4200
