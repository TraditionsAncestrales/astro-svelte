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
    dark: 'focus:ring-dark/50',
    light: 'focus:ring-light/50',
    primary: 'focus:ring-primary/50',
    secondary: 'focus:ring-secondary/50',
    white: 'focus:ring-white/50',
  }[intent]);

export const disabledBg = (intent: Intent) =>
  ({
    dark: 'disabled:bg-dark/75',
    light: 'disabled:bg-light/75',
    primary: 'disabled:bg-primary/75',
    secondary: 'disabled:bg-secondary/75',
    white: 'disabled:bg-white/75',
  }[intent]);

export const btnIntent = (intent: Intent) => [bg(intent), hoverBg(intent), disabledBg(intent), focusRing(intent)].join(' ');

export const text = (intent: Intent) =>
  ({dark: 'text-dark', light: 'text-light', primary: 'text-primary', secondary: 'text-secondary', white: 'text-white'}[intent]);

export const BTN = cva(
  `flex items-center font-medium rounded px-5 py-2.5 
  disabled:cursor-not-allowed
  focus:ring-4 focus:outline-none`,
  {
    variants: {
      intent: {
        primary: [text('white'), btnIntent('primary')],
        secondary: [text('white'), btnIntent('secondary')],
      },
    },
    defaultVariants: {intent: 'primary'},
  }
);

export const INPUT = cva(
  `block w-full p-2.5 text-sm border border-secondary/30 
  focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50`,
  {
    variants: {
      touched: {
        true: `invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500`,
      },
    },
  }
);
