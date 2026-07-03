# Sitemap — Lily Archives (index.html)

Site **single-page** (une seule page HTML auto-contenue), navigation gérée en JS
via `showPage(name)` — pas de rechargement, pas d'URLs séparées, pas de fichiers
multiples. Le "sitemap" ci-dessous reflète donc l'arborescence logique des
écrans/sections plutôt qu'une hiérarchie de fichiers.

```
index.html
│
├── #landing (écran d'entrée)
│   ├── #landing-inner
│   ├── bouton "enter" (#landing-enter) → révèle l'app
│   └── #bg-layer (fond d'écran)
│
└── App principale (nav fixe + 4 sections togglées en JS)
    │
    ├── Nav (.nav-links)
    │   ├── "music"       → data-page="home"      (actif par défaut)
    │   ├── "tour dates"   → data-page="tour"
    │   ├── "archives"     → data-page="archives"
    │   └── "about"        → data-page="about"
    │
    ├── #page-home  — Music
    │   ├── Release en avant : "fragile ⋆𝜗𝜚" (EP, coming in july)
    │   │   └── Tracklist (8 titres, crédits prod par titre)
    │   ├── Crédits (cover, mix/master)
    │   └── Liens externes (.links-row)
    │       ├── Apple Music (désactivé — coming soon)
    │       ├── SoundCloud → soundcloud.com/lilyarchives
    │       ├── Spotify (désactivé — coming soon)
    │       ├── Instagram → instagram.com/lilyarchives11
    │       ├── Contact → mailto:eversince2222@gmail.com
    │       ├── Bandcamp → bandcamp.com/lilyarchives
    │       └── YouTube → youtube.com/@lilyarchives1
    │
    ├── #page-tour — Tour dates
    │   └── Liste (.tour-list)
    │       ├── 01·09·2022 — La Boule Noire, Paris (sold out)
    │       ├── 02·03·2023 — Le Chinois, Montreuil
    │       └── 05·06·2026 — TBA, Paris (upcoming)
    │
    ├── #page-archives — Archives
    │   └── Alias précédent : 4ffection
    │       ├── SoundCloud → soundcloud.com/4ffection1
    │       ├── Spotify → open.spotify.com/…/1llZ0ibk9ayEqzcyFMLT8j
    │       └── SoundCloud (archives) → soundcloud.com/4ffection_archives
    │
    └── #page-about — About
        ├── Illustration (.about-illustration)
        └── Bio (.about-bio)
            └── Liens cités dans le texte
                ├── SoundCloud staring girl / egobaby → soundcloud.com/4ffection_archives
                ├── SoundCloud 4ffection → soundcloud.com/4ffection1
                ├── Skrapes → soundcloud.com/officialskrapes
                │   ├── Scream → .../officialskrapes/scream
                │   └── Dogonyat → .../officialskrapes/dogonyat
                ├── love letters → soundcloud.com/4ffection1/love-letters-rework-prod-skrapes
                ├── looking for the stars → soundcloud.com/4ffection1/looking-for-the-stars-prod-skrapes
                └── All Flesh Rots → soundcloud.com/4ffection_archives/sets/all-flesh-rots-2025
```

## Notes techniques
- Navigation : `showPage(name)` retire `.visible/.shown` de toutes les `.page`,
  active `#page-<name>`, et anime `.tour-item` si `name === 'tour'`.
- Landing page indépendante de la nav (`#landing`), affichée avant l'app.
- Un projet séparé **Sanctuary** (mentionné dans la mémoire) n'apparaît pas dans
  ce fichier — c'est une landing page distincte, pas encore reliée à ce document.
