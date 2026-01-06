# ts-angular-webpack-example

Minimal Angular 19 + Webpack + Electron example with Overlayed integration.

## Prerequisites

- Node.js
- pnpm (or npm/yarn)
- Overlayed CLI: `pnpm i -g @overlayed/cli`
- Overlayed Dashboard access for authentication

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Authenticate with Overlayed:

```bash
overlayed login
```

3. Initialize your Overlayed project (if not already done):

```bash
overlayed init
```

4. Set your application ID:

```bash
# Create a .env file with your application ID
echo "VITE_APPLICATION_ID=your-app-id" > .env
```

## Development

Run the development server:

```bash
pnpm dev
```

This will:

- Start the Angular dev server on `http://localhost:4200`
- Build the Electron main/preload processes
- Launch Electron with the Overlayed runtime

## Build

Build for production:

```bash
pnpm build
```

## Project Structure

```
ts-angular-webpack-example/
├── src/
│   ├── main/              # Electron main process
│   │   ├── index.ts       # Entry point
│   │   └── overlayed.ts   # Overlayed configuration
│   ├── preload/
│   │   └── index.ts       # Context bridge
│   └── renderer/          # Angular app
│       └── src/
│           ├── app/
│           │   └── app.component.ts
│           ├── index.html
│           ├── main.ts
│           └── styles.css
├── angular.json           # Angular CLI config
├── package.json
├── tsconfig.json          # Angular tsconfig
├── tsconfig.main.json     # Electron main tsconfig
├── tsconfig.preload.json  # Preload tsconfig
└── overlayed.config.ts    # Overlayed deployment config
```

## Keybinds

- `Alt + X`: Toggle in-game overlay visibility

## Features

- Angular 19 with standalone components
- Webpack via `@angular-devkit/build-angular`
- Electron with Overlayed integration
- In-game overlay window with keybind toggle
- Basic hello-world UI
