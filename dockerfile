FROM node:20

WORKDIR /app

# Copiamos solo lo necesario para instalar dependencias
COPY package*.json ./

# Instalamos dependencias sin opcionales para evitar el bug de Rollup
RUN rm -rf node_modules package-lock.json

RUN npm install --no-optional --legacy-peer-deps

# Copiamos el resto del proyecto
COPY . .

# Activamos hot reload en Docker Desktop (Mac/Windows)
ENV CHOKIDAR_USEPOLLING=true

EXPOSE 4200

CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
