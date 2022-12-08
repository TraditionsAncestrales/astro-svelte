import {createImageBuilder, useSanityClient} from 'astro-sanity';
import type {Image} from '~/schemas';

const imageBuilder = createImageBuilder(useSanityClient());

export const getImageProps = (
  image: Image,
  {maxW = 1920, minStep = 0.1, extraSteps = []}: {extraSteps?: number[]; maxW?: number; minStep?: number} = {}
) => {
  if (!image?.asset?._ref) return {};
  const builder = imageBuilder.image(image).fit('max').auto('format');
  const [w, h] = image.asset._ref
    .split('-')[2]
    .split('x')
    .map((size) => +size);
  const ratio = w / h;
  const baseSizes = [maxW, 360, 414, 768, 1366, 1536, 1920, ...extraSteps];

  const retinaSizes = [...new Set([...baseSizes, ...baseSizes.map((size) => size * 2), ...baseSizes.map((size) => size * 3)])]
    .sort((a, b) => a - b)
    .filter((size) => size <= w * 1.1 && size <= maxW * 3)
    .filter((size, i, arr) => {
      const nextSize = arr[i + 1];
      return nextSize ? nextSize / size > minStep + 1 : true;
    });

  return {
    src: builder.width(maxW).url(),
    srcset: retinaSizes.map((size) => `${builder.width(size).url()} ${size}w`).join(', '),
    sizes: '100vw', //props.maxWidth === '100vw' ? '100vw' : sizes || `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,
    width: retinaSizes[0],
    height: retinaSizes[0] / ratio,
  };
};
