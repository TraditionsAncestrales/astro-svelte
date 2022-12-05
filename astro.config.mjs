import tailwind from '@astrojs/tailwind';
import sanity from 'astro-sanity';
import { defineConfig } from 'astro/config';

// https://astro.build/config
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sanity({
      projectId: '7zo9q7sv',
      dataset: 'production',
      apiVersion: '2022-10-28',
      useCdn: true,
    }),
    svelte(),
  ],
});
