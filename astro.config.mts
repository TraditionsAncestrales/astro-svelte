import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { imageService } from "@unpic/astro/service";
import icon from "astro-icon";
import pocketbase from "astro-pocketbase";
import superforms from "astro-superforms";
import { defineConfig, envField } from "astro/config";
import { pascalCase } from "es-toolkit";
import { FontaineTransform } from "fontaine";
import simpleStackQuery from "simple-stack-query";

// https://astro.build/config
export default defineConfig({
  site: "https://traditionsancestrales.fr",
  output: "server",
  adapter: vercel({
    isr: { bypassToken: process.env.VERCEL_REVALIDATE_TOKEN, exclude: ["/api/invalidate"] },
  }),

  prefetch: process.env.PROD ? { defaultStrategy: "load", prefetchAll: true } : undefined,

  image: {
    service: imageService({
      placeholder: "blurhash",
    }),
  },

  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
    icon({
      include: {
        bi: ["chevron-left", "chevron-right", "envelope-plus", "phone", "pin-map"],
        ph: ["at", "calendar-heart-thin", "facebook-logo-thin", "instagram-logo-thin", "list", "youtube-logo-thin"],
        "svg-spinners": ["ring-resize"],
      },
    }),
    simpleStackQuery(),
    superforms(),
    pocketbase({
      ignore: ["users"],
      nameEnumSchema: (name: string) => `z${pascalCase(name)}`,
      nameRecordSchema: (name: string) => `z${pascalCase(name)}Record`,
    }),
    sitemap(),
  ],

  vite: {
    plugins: [
      FontaineTransform.vite({
        fallbacks: ["Arial"],
        resolvePath: (id) => new URL(id.startsWith("/") ? `public/${id.slice(1)}` : `node_modules/${id}`, import.meta.url),
      }),
    ],
  },

  env: {
    schema: {
      ASTRO_POCKETBASE_ADMIN_EMAIL: envField.string({ context: "server", access: "secret" }),
      ASTRO_POCKETBASE_ADMIN_PASSWORD: envField.string({ context: "server", access: "secret" }),
      MAILCHIMP_API_KEY: envField.string({ context: "server", access: "secret" }),
      MAILCHIMP_LIST_ID: envField.string({ context: "server", access: "secret" }),
      MAILCHIMP_SERVER: envField.string({ context: "server", access: "secret" }),
      PUBLIC_ASTRO_POCKETBASE_URL: envField.string({ context: "server", access: "public" }),
      PUBLIC_IMGIX_URL: envField.string({ context: "server", access: "public" }),
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      VERCEL_REVALIDATE_TOKEN: envField.string({ context: "server", access: "secret" }),
    },
  },
});
