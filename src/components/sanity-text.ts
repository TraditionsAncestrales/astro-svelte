import {portableTextToHtml} from 'astro-sanity';
import {urlForImage} from './sanity-image';

const customComponents = {
  types: {
    image: ({value}: any) => {
      return `
        <picture>
          <source
            srcset="${urlForImage(value.asset).format('webp').url()}"
            type="image/webp"
          />
          <img
            class="responsive__img"
            src="${urlForImage(value.asset).url()}"
            alt="${value.alt}"
          />
        </picture>
      `;
    },
  },
};

export const sanityPortableText = (portabletext: any) => portableTextToHtml(portabletext, customComponents);
