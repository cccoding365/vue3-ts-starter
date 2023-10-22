import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import stylelitPlugin from "vite-plugin-stylelint";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), eslintPlugin(), stylelitPlugin({ fix: true })],
	server: {
		host: "localhost",
		port: 9999,
		open: true,
	},
});
