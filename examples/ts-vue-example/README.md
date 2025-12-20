# ts-vue-example

An Overlayed Electron application with:

- Vue 3 (Easily replaceable with your favorite frontend framework)
- Typescript
- Vite
- Tailwind CSS
- HMR support in render process
- Hot reload for electron process
- Typesafe IPC setup

[Overlayed Documentation](https://docs.overlayed.gg)

## Project Setup

### Update Project

Before use, update the following:

1. `overlayed.config.ts` & `overlayed.ts` - replace `applicationId` with your applicationId.
2. Configure `overlayed.ts` based on your needs.

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

## Project Structure

This example comes with our recommended architecture for an Overlayed application.
