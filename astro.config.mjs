import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    site: 'https://alexzweiter.com',
    devToolbar: {
        enabled: false,
    },
    i18n: {
        locales: ["es", "en", "pt"],
        defaultLocale: "en",
        routing: {
            prefixDefaultLocale: false,
        },
    },
    trailingSlash: "never",
    server: {
        port: 5050,
    },
    vite: {
        plugins: [tailwindcss()],
    },
});
