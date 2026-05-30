import path from "path";
import vuePlugin from "@vitejs/plugin-vue";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { defineConfig } from "vite";
import * as packageJson from "./package.json";

const config = defineConfig({
    root: path.join(__dirname, "src", "renderer"),
    publicDir: "public",
    server: {
        port: 8080,
    },
    define: {
        "import.meta.env.VITE_APP_VERSION": JSON.stringify(packageJson.version),
        open: false,
    },
    build: {
        outDir: path.join(__dirname, "build", "renderer"),
        emptyOutDir: true,
        chunkSizeWarningLimit: NaN, // Not needed for a desktop app
    },
    plugins: [ nodePolyfills({ globals: { process: true, buffer: true } }),
        vuePlugin({
            template: {
                compilerOptions: {
                    isCustomElement: tag => tag.startsWith("x-"),
                },
            },
        }),
    ],
    resolve: {
        alias: {
            path: "path-browserify", "jimp": path.join(__dirname, "node_modules", "jimp", "dist", "esm", "index.js"),
        },
    },
});

export default config;
