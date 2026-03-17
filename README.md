# RocketPocket

A clean Expo + React Native app for exploring upcoming space launches and expeditions.

RocketPocket fetches live data from The Space Devs Launch Library API and presents it in a simple two-tab experience:

- Launches: Upcoming launches with quick details
- Expeditions: Current and planned expeditions

## Preview

- Platform support: iOS, Android, Web (via Expo)
- Navigation: Expo Router with tabs + detail route
- Visual style: custom neon-inspired space theme

## Features

- Browse upcoming launches in a fast scrolling list
- Open launch details with mission description and orbit info
- Browse expeditions with patch/station fallback imagery
- Loading and error states for all remote data views
- Shared card UI and themed background components

## Tech Stack

- Expo 55
- React 19 + React Native 0.83
- TypeScript
- Expo Router
- React Native Paper

## Project Structure

```text
app/
  (tabs)/
    index.tsx              # Launches tab
    expeditions.tsx        # Expeditions tab
    _layout.tsx            # Tab layout
  launchdetail/
    [id].tsx               # Launch detail screen
components/
  ObjectCard.tsx
  SpaceBackground.tsx
hooks/
  useLaunches.ts
  useExpeditions.ts
services/
  api.ts                   # Launch Library API calls
theme/
  colors.ts
  navigation.ts
  paperTheme.ts
types/
  Launch.ts
  Expeditions.ts
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run start
```

Then open:

- iOS simulator: press `i`
- Android emulator: press `a`
- Web: press `w`

## Available Scripts

- `npm run start` - Start Expo dev server
- `npm run android` - Start on Android
- `npm run ios` - Start on iOS
- `npm run web` - Start in browser
- `npm run typecheck` - Run TypeScript type checking

## Data Source

This app consumes:

- Launches: `https://ll.thespacedevs.com/2.2.0/launch/upcoming/`
- Expeditions: `https://ll.thespacedevs.com/2.3.0/expeditions/`

The app handles HTTP errors, including API rate limiting (429), in list views.

## Notes

- No environment variables are required for local development.
- Internet access is required to load launch and expedition data.

## Roadmap Ideas

- Search and filter launches
- Pull to refresh
- Favorites/bookmarking
- Offline caching
- Better detail error handling and retry

## License

Private project (no license specified).
