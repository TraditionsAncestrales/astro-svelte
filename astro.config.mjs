import tailwind from '@astrojs/tailwind';
import sanity from 'astro-sanity';
import { defineConfig } from 'astro/config';

// https://astro.build/config
import solidJs from '@astrojs/solid-js';

// https://astro.build/config
//import netlify from '@astrojs/netlify/functions';

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
    solidJs(),
  ],
  //output: 'server',
  //adapter: netlify(),
});
