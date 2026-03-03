# CEIT CMS Frontend (Public Website)

Public-facing CEIT website.

## Start This Project Only Terminal 1: Public Frontend

## Important: Use Collaboration Branch (not main)

This project must be run from the collaboration branch because the needed integration changes are not yet merged into `main`.

# 1) Fork the repository first on GitHub
#    Example fork: https://github.com/<your-username>/ceit-cms-frontend

# 2) Clone your fork
```bash
git clone https://github.com/<your-username>/ceit-cms-frontend.git
cd ceit-cms-frontend
```

# 3) Add original repo as upstream
```bash
git remote add upstream https://github.com/basarte-jasmine/ceit-cms-frontend.git
```

# 4) Fetch branches and switch to collaboration branch
```bash
git fetch upstream collaboration
git checkout -b collaboration --track upstream/collaboration
```

# 5) Keep your branch updated
```bash
git pull --rebase upstream collaboration
```

## Start This Project Only
```bash
cd /path/to/ceit-cms-frontend
npm install
npm run dev
```

## or if using yarn
```bash
yarn install
yarn dev
```

Open: `http://localhost:3000` or `http://localhost:3001` 

---

## Backend API (required)

```bash
cd /path/to/ceit-cms-backend
source .venv/bin/activate
alembic upgrade head
python scripts/seed.py
python -m app.main
```

## URLs

- Public site: `http://localhost:3000`
- API: `http://127.0.0.1:8000`

Open: `http://localhost:3000` or `http://localhost:3001` 

---

### Terminal 2: Backend API

```bash
cd /path/to/ceit-cms-backend
(OPTIONAL IF USING VENV) python3 -m venv .venv
(OPTIONAL IF USING VENV) source .venv/bin/activate
alembic upgrade head
python scripts/seed.py
python -m app.main
```

## URLs

- Public site: `http://localhost:3000` or `http://localhost:3001`
- API: `http://127.0.0.1:8000`
