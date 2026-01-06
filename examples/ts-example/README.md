# Overlayed TypeScript Example

This is a minimal example of using Overlayed with TypeScript

## Setup

Follow these steps to set up your project:

1. **Install pnpm** (if you haven't already):

   ```bash
   npm i -g pnpm
   ```

2. **Install the overlayed CLI** (if you haven't already):

   ```bash
   pnpm install -g @overlayed/cli
   ```

3. **Initialize the project**  
   This will create development-only files for the project.  
   Read more [here](https://docs.overlayed.gg/advanced/local-development):

   ```bash
   overlayed init
   ```

4. **Install dependencies:**

   ```bash
   pnpm install
   ```

5. **Set up environment variables:**  
   Create an `.env` file based on the `.env.example` file and fill in the required fields.
   - `VITE_APPLICATION_ID` – can be found at [https://overlay.dev/settings](https://overlay.dev/settings)

6. **Run the application:**

   ```bash
   pnpm start
   ```
