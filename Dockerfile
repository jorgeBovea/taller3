FROM node:14-alpine
WORKDIR /curso/service
COPY package*.json . 
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node","index.js"]