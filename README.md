# Mohalla 🏘️

> **Your street knows best** — A hyperlocal anonymous community web app.

## What It Does

Mohalla connects you with your neighbours anonymously. Real shop prices, verified auto fares, safety alerts — all from people who actually live in your area.

## Features

- **🏠 Home** — Editorial landing page with hero, about, zone map, explore sections & testimonial
- **🗺️ Map** — Interactive zone map with safe/unsafe zones, shop pins, and live zone chat
- **🏪 Shops** — Filterable shop directory with trust ratings, prices & crowd-sourced reviews
- **🛺 Fares** — Crowd-sourced auto/rickshaw fares with upvote/downvote accuracy system
- **💬 Chat** — Anonymous zone chat with message types (tip, question, alert, info)
- **👤 Profile** — Anonymous avatar creator — name, colour, zone — saved to localStorage only

## Tech Stack

- **React 18** (Create React App)
- **CSS Modules** for scoped, maintainable styles
- **Google Fonts** — Playfair Display + DM Sans
- **localStorage** for profile persistence (no backend, no server)
- **IntersectionObserver** for scroll-reveal animations
- **React Error Boundaries** for graceful error handling

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/
│   ├── ErrorBoundary.jsx   # React error boundary
│   ├── Navbar.jsx          # Top nav + bottom mobile nav
│   ├── Splash.jsx          # Animated splash screen
│   └── UI.jsx              # Shared UI components
├── context/
│   └── AppContext.js       # Global state (page, profile, toast)
├── data/
│   └── constants.js        # All data, validation, zone/shop/fare data
├── hooks/
│   └── useReveal.js        # Scroll-triggered reveal animation hook
├── pages/
│   ├── HomePage.jsx        # Full landing page
│   ├── MapPage.jsx         # Zone map + live chat
│   ├── ShopsPage.jsx       # Shop directory
│   ├── FaresPage.jsx       # Fare listing + submission
│   ├── ChatPage.jsx        # Anonymous zone chat
│   ├── ProfilePage.jsx     # Avatar & profile creator
│   └── InnerPage.jsx       # Shared inner page layout
├── styles/
│   └── globals.css         # CSS variables, resets, animations
├── App.js
└── index.js
```

## Design

- **Palette:** Near-black `#0d0d0b` · Warm cream `#f7f5ef` · Accent orange `#e8581a`
- **Typography:** Playfair Display (display/serif) + DM Sans (body)
- **Theme:** Editorial magazine aesthetic inspired by RunTribe — dark hero, light content sections, serif headlines
- **Animations:** CSS keyframes, scroll-reveal via IntersectionObserver, splash intro
- **Privacy:** Zero data collection. Everything stored in browser localStorage only.

## Customisation

Edit `src/data/constants.js` to update:
- `ZONES` — locality names
- `SHOPS` — shop listings
- `FARES` — fare data
- `INITIAL_MESSAGES` — default chat messages
- `AVATAR_COLORS` — available avatar colours
