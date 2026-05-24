# 🚀 Guide de déploiement CROWDN
## crowdn.fr — Déploiement complet en 30 minutes

---

## Ce dont tu as besoin
- Un ordinateur (Mac ou Windows)
- Une connexion internet
- 30 minutes

---

## ÉTAPE 1 — Installer les outils (5 min)

### Installer Node.js
Va sur https://nodejs.org et télécharge la version "LTS"
Lance l'installeur et clique "Suivant" jusqu'à la fin.

### Vérifier que ça marche
Ouvre le Terminal (Mac) ou l'Invite de commandes (Windows) et tape :
```
node --version
```
Tu dois voir quelque chose comme `v20.0.0` ✅

---

## ÉTAPE 2 — Créer le compte Supabase (5 min)

1. Va sur https://supabase.com
2. Clique "Start your project" → crée un compte gratuit
3. Clique "New project"
4. Nom du projet : `crowdn`
5. Choisis une région : **West EU (Ireland)**
6. Attends 2 minutes que le projet se crée

### Récupérer les clés
Dans ton projet Supabase :
- Va dans **Settings** → **API**
- Copie **Project URL** → c'est ton `SUPABASE_URL`
- Copie **anon public** → c'est ton `SUPABASE_ANON_KEY`

### Créer les tables (copie-colle dans l'éditeur SQL de Supabase)
Va dans **SQL Editor** et colle ce code :

```sql
-- Table concerts à venir
create table upcoming_concerts (
  id serial primary key,
  artist text not null,
  date text not null,
  city text not null,
  venue text not null,
  category text not null,
  genre text not null,
  img text,
  created_at timestamp default now()
);

-- Table concerts passés
create table past_concerts (
  id serial primary key,
  artist text not null,
  date text not null,
  city text not null,
  venue text not null,
  category text not null,
  genre text not null,
  img text,
  jury_quote text,
  jury_name text,
  jury_avatar text,
  jury_handle text,
  tiktok_url text,
  created_at timestamp default now()
);

-- Table utilisateurs / jurés
create table profiles (
  id uuid references auth.users primary key,
  name text,
  email text,
  role text default 'user', -- user / jury / admin
  genre_expertise text,
  jury_type text,
  created_at timestamp default now()
);

-- Table candidatures jury
create table jury_applications (
  id serial primary key,
  name text not null,
  email text not null,
  profile_type text not null,
  genre text not null,
  motivation text,
  status text default 'pending',
  created_at timestamp default now()
);

-- Table notes jury (privées)
create table jury_ratings (
  id serial primary key,
  concert_id integer references upcoming_concerts(id),
  jury_id uuid references profiles(id),
  performance integer,
  scenographie integer,
  interaction integer,
  atmosphere integer,
  direction integer,
  setlist integer,
  comment text,
  created_at timestamp default now()
);

-- Sécurité : activer RLS
alter table upcoming_concerts enable row level security;
alter table past_concerts enable row level security;
alter table profiles enable row level security;
alter table jury_applications enable row level security;
alter table jury_ratings enable row level security;

-- Politiques publiques (lecture)
create policy "Concerts publics" on upcoming_concerts for select using (true);
create policy "Passés publics" on past_concerts for select using (true);

-- Notes jury : privées
create policy "Notes privées" on jury_ratings for select using (auth.uid() = jury_id);
create policy "Insérer notes" on jury_ratings for insert with check (auth.uid() = jury_id);
```

Clique **Run** ✅

### Insérer les concerts de démo
```sql
insert into upcoming_concerts (artist, date, city, venue, category, genre, img) values
('Indochine', '17 Juin 2025', 'Paris', 'Accor Arena', 'Arena Class', 'Rock', '🎸'),
('Imagine Dragons', '5 Juil 2025', 'Paris', 'Stade de France', 'Stadium Class', 'Rock', '🌩️'),
('Linkin Park', '11 Juil 2025', 'Paris', 'Stade de France', 'Stadium Class', 'Rock', '🤘'),
('Iron Maiden', '19 Juil 2025', 'Paris', 'Paris La Défense Arena', 'Arena Class', 'Metal', '💀'),
('Bob Dylan', '30 Oct 2025', 'Paris', 'Palais des Congrès', 'Olympia Class', 'Folk', '🎵'),
('Damso', '28 Mai 2026', 'Paris', 'Paris La Défense Arena', 'Arena Class', 'Hip-Hop', '👑'),
('The Weeknd', '8 Juil 2026', 'Paris', 'Stade de France', 'Stadium Class', 'R&B', '🌙'),
('Bigflo & Oli', '15 Oct 2026', 'Paris', 'Accor Arena', 'Arena Class', 'Hip-Hop', '🎤');

insert into past_concerts (artist, date, city, venue, category, genre, img, jury_quote, jury_name, jury_avatar, jury_handle, tiktok_url) values
('Billie Eilish', '10 Juin 2025', 'Paris', 'Accor Arena', 'Arena Class', 'Pop', '🖤', 'Une présence scénique hors du commun. Elle a rendu l''Accor Arena intime — c''est un tour de force.', 'Sophie L.', '👩‍🎤', '@sophiecrowdn', '#'),
('Ninho', '2 Mai 2025', 'Paris', 'Stade de France', 'Stadium Class', 'Hip-Hop', '🏆', 'Un stade plein à craquer pour un rappeur français. La scène du rap français a changé de dimension ce soir.', 'Marc F.', '🎧', '@marcjury', '#'),
('DJ Snake', '10 Mai 2025', 'Paris', 'Stade de France', 'Stadium Class', 'Électro', '🐍', 'Un show pyrotechnique à couper le souffle. La foule n''a jamais eu autant l''impression d''être au centre du monde.', 'Elena R.', '🎭', '@elenarjury', '#'),
('Slimane', '8 Avr 2025', 'Paris', 'Accor Arena', 'Arena Class', 'Pop', '🎶', 'Une voix qui transperce les murs. Slimane a prouvé qu''il appartient désormais aux plus grandes scènes.', 'Thomas V.', '🎤', '@thomasvjury', '#');
```

---

## ÉTAPE 3 — Configurer le projet (5 min)

### Télécharger le projet
Télécharge le dossier `crowdn` fourni par Claude et mets-le sur ton Bureau.

### Créer le fichier de configuration
Dans le dossier `crowdn`, crée un fichier `.env.local` avec :
```
REACT_APP_SUPABASE_URL=https://TON-PROJET.supabase.co
REACT_APP_SUPABASE_ANON_KEY=TA-CLE-ANON-SUPABASE
```
Remplace avec tes vraies clés récupérées à l'étape 2.

---

## ÉTAPE 4 — Tester en local (5 min)

Dans le Terminal, va dans le dossier crowdn :
```bash
cd Bureau/crowdn
npm install
npm start
```

L'app s'ouvre sur http://localhost:3000 ✅
Si tout est beau, on passe au déploiement.

---

## ÉTAPE 5 — Déployer sur Vercel (10 min)

### Créer un compte Vercel
Va sur https://vercel.com → "Sign Up" → connecte-toi avec GitHub

### Créer un compte GitHub si besoin
Va sur https://github.com → crée un compte gratuit

### Mettre le projet sur GitHub
```bash
git init
git add .
git commit -m "CROWDN v1 - Launch"
git branch -M main
git remote add origin https://github.com/TON-USERNAME/crowdn.git
git push -u origin main
```

### Déployer sur Vercel
1. Sur vercel.com → "New Project"
2. Importe ton repo GitHub `crowdn`
3. Dans "Environment Variables" ajoute :
   - `REACT_APP_SUPABASE_URL` = ton URL Supabase
   - `REACT_APP_SUPABASE_ANON_KEY` = ta clé Supabase
4. Clique "Deploy" ✅

---

## ÉTAPE 6 — Brancher crowdn.fr (5 min)

### Dans Vercel
1. Va dans ton projet → "Settings" → "Domains"
2. Ajoute `crowdn.fr`
3. Vercel te donne des DNS à configurer

### Dans IONOS
1. Va sur ton compte IONOS
2. Domaines → crowdn.fr → DNS
3. Ajoute les enregistrements DNS fournis par Vercel
4. Attends 10-30 minutes que ça se propage

**crowdn.fr est en ligne ! 🎉**

---

## En cas de problème

Tout le code est dans `/src/App.jsx`
Les clés Supabase sont dans `.env.local`
La config Vercel est dans `vercel.json`

Pour toute question, reviens sur Claude avec une capture d'écran de l'erreur.
