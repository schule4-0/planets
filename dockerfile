# Schritt 1: Basis-Image
FROM node:18-bullseye AS base

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere nur die package.json und package-lock.json
COPY package.json package-lock.json ./

# Erhöhe das Timeout-Limit für npm
RUN npm config set fetch-retry-maxtimeout 600000

# Installiere alle Abhängigkeiten
RUN npm install

# Kopiere den Rest des Codes
COPY . .

# Schritt 2: Entwicklungs-Image
FROM node:18-bullseye AS development

WORKDIR /app

# Kopiere alle Dateien aus dem Basis-Build
COPY --from=base /app ./

# Exponiere den Port, auf dem die App laufen wird
EXPOSE 3000

# Starte die App im Entwicklungsmodus
CMD ["npm", "run", "dev"]