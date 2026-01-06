declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_APPLICATION_ID: string;
      NODE_ENV?: "development" | "production";
    }
  }
}

export {};
