import {cva} from 'class-variance-authority';
import {z} from 'zod';
import {zIntent} from '~/data/schemas.ui';

// TYPES ===================================================================================================================================
export const zFromIntent = z.function().args(zIntent).returns(z.string());

export const bg = zFromIntent.implement(
  (intent) => ({dark: 'bg-dark', light: 'bg-light', primary: 'bg-primary', secondary: 'bg-secondary', white: 'bg-white'}[intent])
);

export const hoverBg = zFromIntent.implement(
  (intent) =>
    ({
      dark: 'hover:bg-dark/75',
      light: 'hover:bg-light/75',
      primary: 'hover:bg-primary/75',
      secondary: 'hover:bg-secondary/75',
      white: 'hover:bg-white/75',
    }[intent])
);

export const focusRing = zFromIntent.implement(
  (intent) =>
    ({
      dark: 'focus:ring-dark',
      light: 'focus:ring-light',
      primary: 'focus:ring-primary',
      secondary: 'focus:ring-secondary',
      white: 'focus:ring-white',
    }[intent])
);

export const bgHoverBgFocusRing = zFromIntent.implement((intent) => [bg(intent), hoverBg(intent), focusRing(intent)].join(' '));

export const text = zFromIntent.implement(
  (intent) => ({dark: 'text-dark', light: 'text-light', primary: 'text-primary', secondary: 'text-secondary', white: 'text-white'}[intent])
);

export const BTN = cva('font-medium rounded px-5 py-2.5 focus:ring-4 focus:outline-none', {
  variants: {
    intent: {
      primary: [text('white'), bgHoverBgFocusRing('primary')],
      secondary: ['text-white bg-secondary hover:bg-secondary/75 focus:ring-secondary'],
    },
  },
  defaultVariants: {intent: 'primary'},
});
