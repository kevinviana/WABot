
FROM node:latest
RUN  npm install -g npm@7.10.0\
     && npm fund \
     && apt-get update \
#instal chrome
     && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
     && sudo apt install ./google-chrome-stable_current_amd64.deb -y
# Install Puppeteer under /node_modules so it's available system-wide
ADD package.json package-lock.json /
RUN npm install