import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mix, { vercelAdapter } from "vite-plugin-mix";

// https://vitejs.dev/config/
export default defineConfig({
	base:"./",
	build: {
		rollupOptions: {
			output:
			{
				format: 'es',
				strict: false,
				entryFileNames: "[name].js",
				dir: 'dist/'
			}
		 }
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
