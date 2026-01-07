# Documentation Docker

Guide de déploiement de l'application via Docker Compose.

## Prérequis

- Docker version 20.10 ou supérieure
- Docker Compose version 2.0 ou supérieure
- 2 Go d'espace disque minimum

Vérification :
```bash
docker --version
docker compose version
```

## Démarrage rapide

1. Aller dans le dossier docker :
```bash
cd docker
```

2. Démarrer les services :
```bash
docker compose up --build
```

Pour lancer en arrière-plan :
```bash
docker compose up -d --build
```

3. Accéder à l'application :
- Application web : http://localhost:3001
- API REST : http://localhost:3001/api/books
- Documentation Swagger : http://localhost:3001/docs

4. Arrêter les services :
```bash
docker compose down
```

## Services

### API (`tp_api`)
- **Port** : 3001 (exposé) → 3000 (interne)
- **Technologies** : Express.js, Prisma
- **Fonctions** : API REST, frontend statique, documentation Swagger

### Base de données (`tp_db`)
- **Port** : 5432
- **Technologie** : PostgreSQL 16
- **Volume** : `db_data` (persistance des données)
- **Configuration** :
  - Utilisateur : `app`
  - Base de données : `appdb`
  - Mot de passe : `password123` par défaut

## Variables d'environnement

Créer un fichier `.env` dans le dossier `docker/` pour personnaliser :

```env
POSTGRES_PASSWORD=votre_mot_de_passe
```

## Ports utilisés

| Service | Port hôte | Port conteneur | Description |
|---------|-----------|----------------|-------------|
| API | 3001 | 3000 | Application web et API |
| Base de données | 5432 | 5432 | PostgreSQL |

## Choix techniques

- **Image Alpine** : Image légère pour réduire la taille
- **Utilisateur non-root** : Sécurité renforcée
- **Healthcheck** : L'API attend que la base de données soit prête
- **Volume persistant** : Les données sont conservées entre les redémarrages
- **Migrations automatiques** : Prisma exécute les migrations au démarrage

## Dépannage

### Les conteneurs ne démarrent pas
```bash
docker compose logs api
docker compose logs db
```

### Port déjà utilisé
Modifier le port dans `docker-compose.yaml` (ligne 33) : `"3002:3000"`

### Réinitialiser complètement
```bash
docker compose down -v
docker compose up --build
```

## Commandes utiles

```bash
# Voir les logs
docker compose logs -f

# Vérifier l'état
docker compose ps

# Redémarrer
docker compose restart

# Accéder au shell de l'API
docker compose exec api sh

# Accéder à la base de données
docker compose exec db psql -U app -d appdb
```
