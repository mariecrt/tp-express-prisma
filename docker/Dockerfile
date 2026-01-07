# Image légère
FROM node:20-alpine

# Dossier de travail
WORKDIR /app

# Copier seulement ce qui sert à installer d'abord (cache)
COPY package*.json ./

# Installer dépendances
RUN npm ci

# Copier le reste du code
COPY . .

# Prisma: générer le client (si tu utilises Prisma)
RUN npx prisma generate

# Sécurité : utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Port (adapte si ton API écoute ailleurs)
EXPOSE 3000

# Démarrage (adapte selon ton projet)
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
