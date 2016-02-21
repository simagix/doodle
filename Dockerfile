FROM node:4-onbuild
EXPOSE 3000

ADD . /usr/src/app
WORKDIR /usr/src/app
CMD ["npm", "start"]

