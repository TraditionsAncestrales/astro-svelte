import {portableTextToHtml} from 'astro-sanity';

const customComponents = {
  types: {},
};

export const sanityPortableText = (portabletext: any) => portableTextToHtml(portabletext, customComponents);
