
# Application météo
[![Netlify Status](https://api.netlify.com/api/v1/badges/bbb90ea1-05e9-423e-9170-1268825316ee/deploy-status)](https://app.netlify.com/projects/weather-elsadse/deploys)
![GitHub package.json version](https://img.shields.io/github/package-json/v/elsadse/weather-app)
![GitHub repo size](https://img.shields.io/github/repo-size/elsadse/weather-app)
![GitHub License](https://img.shields.io/github/license/elsadse/weather-app)
![GitHub top language](https://img.shields.io/github/languages/top/elsadse/weather-app)
![GitHub commit activity](https://img.shields.io/github/commit-activity/t/elsadse/weather-app)
![GitHub Repo stars](https://img.shields.io/github/stars/elsadse/weather-app)

Application météo responsive avec fonctionnalité de recherche, conversion d'unités et prévisions détaillées utilisant l'API Open-Meteo.

## Configuration

- **Configuration de l'environnement de devéloppement:**

```bash
git clone https://github.com/elsadse/weather-app.git
cd weather-app
bun install
bun run dev
```

- **Production build et déploiement:**

```bash
git clone https://github.com/elsadse/weather-app.git
cd weather-app
bun install
bun run build
bun run preview
```

## Caractéristiques

- Recherchez des informations météorologiques en saisissant un lieu dans la barre de recherche
- Consultez les conditions météorologiques actuelles, notamment la température, l'icône météo et les détails du lieu
- Consultez des données météorologiques supplémentaires telles que la température ressentie, le taux d'humidité, la vitesse du vent et les précipitations
- Consultez les prévisions météorologiques à 7 jours avec les températures maximales/minimales quotidiennes et les icônes météo
- Consultez les prévisions horaires indiquant les changements de température tout au long de la journée
- Passez d'un jour à l'autre à l'aide du sélecteur de jour dans la section des prévisions horaires
- Passez des unités de mesure impériales aux unités métriques via le menu déroulant des unités
- Passez d'une unité de température spécifique (Celsius et Fahrenheit) à une autre et d'une unité de mesure de la vitesse du vent (km/h et mph) à une autre et d'une unité de mesure des précipitations (millimètres) à une autre via le menu déroulant des unités
- Affichez la disposition optimale de l'interface en fonction de la taille de l'écran de votre appareil
- Affichez les états de survol et de mise au point pour tous les éléments interactifs de la page


## Stack technologique

- Typescript
- React 19 + Vite
- Tailwind CSS
- Netlify


## Auteurs

- [@elsadse](https://www.github.com/elsadse)
