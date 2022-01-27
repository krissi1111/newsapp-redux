# build environment
FROM node:17.2.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_BACKEND_PORT $REACT_APP_BACKEND_PORT
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.0 -g --silent
COPY . /app
RUN npm run build

COPY . ./

CMD ["npm", "start"]