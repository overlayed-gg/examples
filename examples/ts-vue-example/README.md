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

Before use, create an `.env` file based on the `.env.example` file, and fill in the fields:

- `VITE_APPLICATION_ID` - can be found [https://overlay.dev/settings](https://overlay.dev/settings)

### Install the overlayed cli

If you haven't already, install the overlayed cli:

```bash
pnpm install -g @overlayed/cli
```

### Initialize the project

This will create development-only files for the project. Read more
[here](https://docs.overlayed.gg/advanced/local-development)

```bash
$ overlayed init
```

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
