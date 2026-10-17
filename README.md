# SkyNow – Weather App (Next.js + Tailwind CSS)

Simple weather app using the free [Open-Meteo](https://open-meteo.com/) API (no API key needed).

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm start
```

## Pages
- `/` Home – Header, Weather Display, About section, Footer
- `/about` About
- `/services` Services
- `/contact` Contact form

## Structure
- `components/Header.js`, `components/Footer.js` – shared components
- `components/WeatherDisplay.js` – fetches and shows temperature, time, interval, humidity, wind speed
- `components/ContactForm.js` – form with validation
