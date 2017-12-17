FROM node:8.9.3

RUN useradd -ms /bin/bash me

USER me

RUN npm config set save-exact true

WORKDIR /home/me/yletter
