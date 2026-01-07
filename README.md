# TP Express + Prisma

Application web de gestion de livres avec API REST, utilisant Express.js et Prisma.

## Technologies

- **Backend** : Express.js 5
- **Base de données** : PostgreSQL
- **ORM** : Prisma
- **Documentation** : Swagger
- **Tests** : Jest

## Installation

### Prérequis

- Node.js 20 ou supérieur
- PostgreSQL (ou utiliser Docker)

### Installation locale

1. Installer les dépendances :
```bash
npm install
```

2. Configurer la base de données :
   - Créer un fichier `.env` à la racine
   - Ajouter : `DATABASE_URL="postgresql://user:password@localhost:5432/dbname"`

3. Initialiser la base de données :
```bash
npx prisma generate
npx prisma migrate deploy
```

4. Lancer l'application :
```bash
npm start
```

L'application sera accessible sur http://localhost:3000

## Déploiement avec Docker

Pour déployer l'application avec Docker Compose, voir la documentation dans le dossier `docker/` :

```bash
cd docker
docker compose up --build
```

L'application sera accessible sur http://localhost:3001

## Endpoints

- **Application web** : http://localhost:3000
- **API REST** : http://localhost:3000/api/books
- **Documentation Swagger** : http://localhost:3000/docs

## Tests

```bash
npm test
```

## Structure du projet

```
├── docker/          # Configuration Docker
├── prisma/          # Schéma et migrations Prisma
├── public/          # Frontend statique
├── src/             # Code source backend
│   ├── controllers/ # Contrôleurs
│   ├── routes/      # Routes API
│   └── server.js    # Point d'entrée
└── tests/           # Tests unitaires

```

