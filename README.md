# RocketPocket

RocketPocket är en modern Expo + React Native-app för att utforska kommande rymduppdrag och expeditioner.

Appen hämtar live-data från The Space Devs Launch Library API och visar den i en enkel, snabb och snygg tvåfliksupplevelse:

- **Launches:** Kommande uppskjutningar med detaljer och nedräkning
- **Expeditions:** Aktuella och planerade expeditioner

Klicka på ett kort för att se en detaljerad vy med all info om launch eller expedition.

## Preview

- Plattformar: iOS, Android, Web (Expo)
- Navigation: Expo Router med tabs och detaljvyer
- UI: Neon-inspirerat space-tema

## Features

- Bläddra bland kommande launches och expeditioner
- Klicka på ett kort för att se detaljerad vy (launch eller expedition)
- Filtrera på företag/organisation i båda listor
- Lägg till launches som favoriter (med persistent lagring)
- Nedräkning till launch i detaljvy
- Snyggt, responsivt och enhetligt UI
- Laddnings- och felhantering för all data

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
  expeditiondetail/
    [id].tsx               # Expedition detail screen
components/
  ObjectCard.tsx           # Reusable card for all items
  SpaceBackground.tsx      # Animated space background
hooks/
  useLaunches.ts
  useExpeditions.ts
  useFilt.ts               # Filtering logic
  useAsyncResource.ts      # Generic async hook
  useFollowedLaunches.ts   # Favorites logic
services/
  api.ts                   # API calls
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

Appen hämtar data från:

- Launches: `https://ll.thespacedevs.com/2.2.0/launch/upcoming/`
- Expeditions: `https://ll.thespacedevs.com/2.3.0/expeditions/`

Alla listor hanterar laddning, fel och API rate limiting.

## Notes

- Ingen konfiguration krävs för lokal utveckling
- Internet krävs för att ladda data

## Roadmap Ideas

- Sökning i listor
- Pull to refresh
- Offline-stöd
- Fler filter
- Ännu bättre felhantering

## License

Private project (no license specified).
