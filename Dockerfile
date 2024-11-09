# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos del proyecto en el contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el código fuente de la aplicación al contenedor
COPY . .

# Compila el proyecto NestJS
RUN npm run build

# Expone el puerto que la aplicación utilizará
EXPOSE 3000

# Establece el comando para instalar dependencias y ejecutar la aplicación
CMD ["sh", "-c", "npm install && npm run build && npm run start:prod"]
