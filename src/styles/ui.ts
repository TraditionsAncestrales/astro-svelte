import {cva} from 'class-variance-authority';
import type {Intent} from '~/data/schemas.ui';

// TYPES ===================================================================================================================================
export const bg = (intent: Intent) =>
  ({dark: 'bg-dark', light: 'bg-light', primary: 'bg-primary', secondary: 'bg-secondary', white: 'bg-white'}[intent]);

export const hoverBg = (intent: Intent) =>
  ({
    dark: 'hover:bg-dark/75',
    light: 'hover:bg-light/75',
    primary: 'hover:bg-primary/75',
    secondary: 'hover:bg-secondary/75',
    white: 'hover:bg-white/75',
  }[intent]);

export const focusRing = (intent: Intent) =>
  ({
    dark: 'focus:ring-dark',
    light: 'focus:ring-light',
    primary: 'focus:ring-primary',
    secondary: 'focus:ring-secondary',
    white: 'focus:ring-white',
  }[intent]);

export const bgHoverBgFocusRing = (intent: Intent) => [bg(intent), hoverBg(intent), focusRing(intent)].join(' ');

export const text = (intent: Intent) =>
  ({dark: 'text-dark', light: 'text-light', primary: 'text-primary', secondary: 'text-secondary', white: 'text-white'}[intent]);

export const BTN = cva('font-medium rounded px-5 py-2.5 focus:ring-4 focus:outline-none', {
  variants: {
    intent: {
      primary: [text('white'), bgHoverBgFocusRing('primary')],
      secondary: ['text-white bg-secondary hover:bg-secondary/75 focus:ring-secondary'],
    },
  },
  defaultVariants: {intent: 'primary'},
});

export const INPUT = cva(
  `block w-full p-2.5 text-sm border border-secondary/30 
  focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 
  invalid:border-red-500 placeholder-shown:invalid:border-secondary/30 invalid:text-red-600
  focus:invalid:border-red-500 focus:invalid:ring-red-500`,
  {
    variants: {
      iconed: {
        true: 'pl-8',
      },
    },
  }
);
