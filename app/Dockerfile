# imagem base com Node.js
FROM node:20-alpine

# pasta de trabalho dentro do container
WORKDIR /app

# copia arquivos de dependencia
COPY package*.json ./

# instala as dependencias
RUN npm install

# copia o restante do codigo da aplicacao
COPY . .

# expoe a porta utilizada pela aplicacao
EXPOSE 3000

# comando para iniciar a aplicacao
CMD ["npm", "start"]
