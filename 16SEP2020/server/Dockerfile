FROM node:latest

# Crear el directorio del Contenedor.
WORKDIR /usr/src/app

# Copiar todas las dependencias al Contenedor.
COPY package*.json ./

# Instala todas las dependencias en base al archivo package.json.
RUN npm install

# Copiar todos los archivos del proyecto.
COPY . .

# Habilitar el puerto
EXPOSE 3000

# Ejecutar app
CMD [ "npm", "start" ]