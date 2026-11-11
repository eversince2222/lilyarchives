# Lily Archives — site

Site officiel de Lily Archives, artiste ambient / électronique basée à Strasbourg.

## Contenu

- `index.html` — accueil : landing interactif (boîte à bijoux + cartes de tarot), dernière sortie, teaser
- `about.html` — présentation, bio et cadre végétal
- `links.html` — liens vers les plateformes d'écoute et les réseaux
- `contact.html` — formulaire de contact (Formspree)

## Fichiers

- `style.css` — styles de base (fenêtres, typographies, mise en page), chargé sur toutes les pages
- `index.html` s'appuie sur `style.css`, `landing.css`, `layout.js` et `landing.js` (aucun script ni style en ligne), chargé sur toutes les pages
- `landing.css` — styles de l'accueil, du bronze, des rubans, des cadres végétaux et de la pluie
- `layout.js` — barre de navigation, pied de page, pluie animée, papillons au clic
- `landing.js` — landing interactif (boîte, cartes, fond animé)
- `assets/img/` — images, fond de forêt, icônes, textures
- `assets/fonts/` — polices (Angelic War, Day Roman)
- `robots.txt`, `sitemap.xml` — référencement

## Lancer en local

Ouvrir `index.html` dans un navigateur. Aucune installation, aucun build.
Pour que le formulaire et les liens fonctionnent comme en ligne, mieux vaut
passer par un petit serveur local (par exemple `python3 -m http.server`).

## Mise en ligne

Compatible GitHub Pages, Netlify ou tout hébergement statique. Le site n'a pas de base de données.

## Mettre à jour

- Textes et liens : `*.html`
- Couleurs : variables et valeurs hexadécimales dans `style.css` et `landing.css`
- Fond : remplacer `assets/img/wallpaper.jpg` (garder la même taille si possible)
- Contact : le destinataire des messages est réglé dans le compte Formspree, pas dans le code

## Palette

- Violet Prune Sourd `#2F222F` — fond, ombres
- Marron-Violet Foncé `#4A323A` — cadres, barre de fenêtre
- Violet Brume `#7A667A` — boutons, éléments actifs
- Mauve Éteint `#9E889E` — liens, textes secondaires
- Doré Tamisé `#C8B08B` — titres, accents
- Beige Biche Parcheminé `#F5EEDC` — intérieur des fenêtres
- Encre Sombre `#23171A` — texte

## Crédits

- Polices : SickCapital · Apostrophic Labs · Maelle.k
- Images : auteurs inconnus (voir `CREDITS_IMAGES.txt`)

## Licence

Tous droits réservés. © Lily Archives.
