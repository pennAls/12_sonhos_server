FROM node:22 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala TODAS as dependências, incluindo as de desenvolvimento como o 'typescript'
RUN npm install

# Copia o resto do seu código-fonte (.ts, tsconfig.json, etc.)
COPY . .

# Roda o script de build para criar a pasta /dist
# Garanta que no seu package.json, o script "build" executa o "tsc"
RUN npm run build


FROM node:22-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala APENAS as dependências de PRODUÇÃO
RUN npm install --omit=dev

# A MÁGICA ACONTECE AQUI:
# Copia APENAS a pasta 'dist' que foi gerada no estágio 'builder'
COPY --from=builder /app/dist ./dist

# Expõe a porta que a sua aplicação vai rodar
EXPOSE 8483

# Define o comando para iniciar a aplicação, usando o código já compilado
CMD ["node", "./dist/server.js"]