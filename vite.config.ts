import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mix, { nodeAdapter, vercelAdapter } from "vite-plugin-mix";
import { Adapter } from "vite-plugin-mix";



// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
//   build: {
//     rollupOptions: {
// 		output: {
// 		  assetFileNames: (assetInfo) => {
// 			var info = assetInfo.name.split(".");
// 			var extType = info[info.length - 1];
// 			if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
// 			  extType = "img";
// 			} else if (/woff|woff2/.test(extType)) {
// 			  extType = "css";
// 			}
// 			return `static/${extType}/[name]-[hash][extname]`;
// 		  },
// 		  chunkFileNames: "static/js/[name]-[hash].js",
// 		  entryFileNames: "static/js/[name]-[hash].js",
// 		},
// 	  }
//   },
  plugins: [
    react(),




    //@ts-ignore
    mix.default({

		
      handler: "./handler.ts",
      adapter: vercelAdapter(),
    }),
  ],
});
