
# Application météo
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/elsadse/weather-app/deployment.yaml)
![GitHub package.json version](https://img.shields.io/github/package-json/v/elsadse/weather-app)
![GitHub repo size](https://img.shields.io/github/repo-size/elsadse/weather-app)
![GitHub License](https://img.shields.io/github/license/elsadse/weather-app)
![GitHub top language](https://img.shields.io/github/languages/top/elsadse/weather-app)
![GitHub commit activity](https://img.shields.io/github/commit-activity/t/elsadse/weather-app)
![GitHub Repo stars](https://img.shields.io/github/stars/elsadse/weather-app)

Responsive weather app with search functionality, unit conversion, and detailed forecasts using the Open-Meteo API.

## Features

- Search for weather information by entering a location in the search bar
- View current weather conditions, including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

## Run the application locally

The application is built and tested with **[Bun](https://bun.sh) (v1.3.6)**. While other runtimes may work, I recommended using Bun to install dependencies and run the project.

- **By serving the original source code (unbundled):**

```bash
git clone https://github.com/elsadse/weather-app.git
cd weather-app
bun install
bun run dev
```

- **by serving the production version:**

```bash
git clone https://github.com/elsadse/weather-app.git
cd weather-app
bun install
bun run build
bun run preview
```

## Tech Stack

- **Frontend Core:** [React](https://react.dev/) 19 with [TypeScript](https://www.typescriptlang.org/) for type-safe development.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) 4.1 for a modern, utility-first UI design.
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) for global state management.
- **Data Management:** [Zod](https://zod.dev/) for schema-driven API validation and the native Fetch API for network requests.
- **Build Tooling:** [Vite](https://vitejs.dev/) for an optimized development environment and fast bundling.
- **CI/CD & Infrastructure:** [GitHub Actions](https://github.com/features/actions) for automated Build & Deploy pipelines, hosted on [GitHub Pages](https://pages.github.com/).

## Auteurs

- [@elsadse](https://www.github.com/elsadse)
