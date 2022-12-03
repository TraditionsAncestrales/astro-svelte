import {createImageBuilder, useSanityClient} from 'astro-sanity';

export const imageBuilder = createImageBuilder(useSanityClient());
export const urlForImage = (source: any) => imageBuilder.image(source);
