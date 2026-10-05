# Weather App

A weather app built with vanilla HTML, JavaScript, and Tailwind CSS. Search for any location, add it as a card, and see its current weather. Saved locations stay on the page after a refresh.

🚧 **Status:** In progress

## Why I'm building this

After strengthening my JavaScript fundamentals with a tip calculator, I wanted a project that goes a step further. This app covers the skills I'll need before moving on to React: fetching data from APIs, managing state, building UI from data, handling errors, and organising code across multiple files with ES modules.

## Planned features

- Search for a location with an autocomplete dropdown
- Add locations as weather cards showing current conditions
- Remove cards
- Save locations with `localStorage` so they persist after a refresh
- Clear error messages and loading states

## Built with

- HTML
- JavaScript (vanilla, ES modules)
- Tailwind CSS
- Vite
- [Open-Meteo API](https://open-meteo.com/) for weather and geocoding data (free, no API key needed)

## Project structure

```
src/
├── main.js          # Connects everything and holds app state
├── api/             # Fetching weather and location data
├── components/      # Building cards and the search dropdown
├── ui/              # Error messages and loading states
└── utils/           # Input validation and localStorage helpers
```

## Progress

- [x] Project setup with Vite and Tailwind
- [x] Weather API call
- [x] Geocoding API call
- [x] Weather card component
- [ ] App state and rendering
- [ ] Search with autocomplete dropdown
- [ ] Removing cards
- [ ] Saving with localStorage
- [ ] Error handling and loading states
- [ ] Styling and polish

## Getting started

```bash
npm install
npm run dev
```

## What's next

After the core features, I plan to add a "Use my location" button with the Geolocation API, then convert the project to TypeScript.
