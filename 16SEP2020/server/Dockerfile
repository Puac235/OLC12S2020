FROM node:alpine

# Crea la dirección en el Contenedor
WORKDIR /usr/src/app

#Copia las dependencias del package.json del host al contenedor
COPY package*.json ./

#ejecuta el package.json
RUN npm install


# Copiamos los archivos de la app (index.js)
COPY . .

#Indicamos el puerto
EXPOSE 3000

#ejecutamos el server
CMD npm start