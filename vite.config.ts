import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import mix, { vercelAdapter } from "vite-plugin-mix";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: path.join(__dirname, "dist"),
		rollupOptions: {
		  input: {
			main: './index.html',
		  },
		},
	},
	plugins: [
		react(),
		
		//@ts-ignore
		mix.default({
			adapter: vercelAdapter,
			handler: "./handler.ts",
		}),
	],
});
