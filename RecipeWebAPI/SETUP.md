# Setup Instructions

### Prerequisites
- Docker Desktop
- Git (for cloning the repository)

### Installation

```bash
git clone <repository-url>
cd RecipeWebAPI
docker compose up
```

Then open your browser to **http://localhost:3001**

## First-Time Startup

**The first `docker compose up` takes 2-3 minutes.**

This is due to 2 reasons:

1. **MySQL Database Initialization** (1-2 minutes)
   - MySQL 8.0 is setting up the database schema
   - Initial data is being created

2. **React Development Server Compilation** (1-2 minutes)
   - Frontend code is being compiled by webpack
   - Browser dependencies are being bundled

### What you'll see:

```
Container recipewebapi-db-1 Waiting
Container recipewebapi-db-1 Healthy
[then wait ~2 minutes for React to compile]
Compiled successfully!
```

After the first run, startup is much faster because Docker caches all the layers and compiled code.