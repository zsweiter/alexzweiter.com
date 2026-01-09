import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";

export default defineConfig({
    integrations: [svelte()],
    i18n: {
        locales: ["es", "en", "pt"],
        defaultLocale: "en",
        routing: {
            prefixDefaultLocale: false,
        },
    },
    trailingSlash: 'never',
    server: {
        port: 5050,
    },
    vite: {
        plugins: [tailwindcss()],
    },
});
