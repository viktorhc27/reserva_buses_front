# Usamos Node Slim (más estable que Alpine para npm)
FROM node:20-slim

# Instalamos dependencias del sistema
RUN apt-get update && apt-get install -y python3 make g++ git && rm -rf /var/lib/apt/lists/*

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Eliminar cualquier instalación previa (por si acaso)
RUN rm -rf node_modules package-lock.json

# Instalar dependencias locales sin opcionales (evita errores con Rollup)
RUN npm install --legacy-peer-deps --no-optional

# Instalar Angular CLI localmente
RUN npm install @angular/cli@18 --save-dev --legacy-peer-deps

# Copiar resto del proyecto
COPY . .

# Variables de entorno para hot reload
ENV CHOKIDAR_USEPOLLING=true
ENV NG_CLI_ANALYTICS=ci
# Comando para levantar Angular
#CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll=2000", "--disable-host-check"]
