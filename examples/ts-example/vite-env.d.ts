interface ImportMetaEnv {
	readonly VITE_APPLICATION_ID: string;
	// Add other env variables as needed
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
