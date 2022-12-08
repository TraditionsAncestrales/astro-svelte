import {useSanityClient} from 'astro-sanity';
import type {z} from 'zod';

// FILL ====================================================================================================================================
export const fill = <V>(value: V) => {
  return <K extends string = string>(...keys: K[]): Record<K, V> => Object.fromEntries(keys.map((key) => [key, value])) as Record<K, V>;
};

// IS EMAIL ================================================================================================================================
const matcher = /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/;
export const isEmail = (value: string) => value.length <= 320 && matcher.test(value);

// PARSERS =================================================================================================================================
export const parseFormDataValue = <S extends string>(v?: S | 'undefined' | ''): S | undefined =>
  v === 'undefined' || v === '' || !v ? undefined : v;

export const refineFormDataValue = (v: string): boolean => !['undefined', ''].includes(v);

// PROCEDURE ===============================================================================================================================
export const procedure = <I extends unknown[] = [], O = unknown>(name: string, {debug = false, input, output, query}: ProcedureO<I, O>) => {
  return async (...args: I): Promise<O> => {
    try {
      if (debug) console.debug(`${name} - query:`, query);
      if (debug) console.debug(`${name} - args:`, args);
      const queryParams = input ? input.parse(args) : args;
      if (debug) console.debug(`${name} - params:`, queryParams);
      const raw = await useSanityClient().fetch(query, queryParams);
      if (debug) console.debug(`${name} - raw:`, raw);
      const data = output ? output.parse(raw) : raw;
      if (debug) console.debug(`${name} - data:`, data);
      return data;
    } catch (error) {
      throw (error as Error).toString(); //throw error(500, parsed.error.toString());
    }
  };
};

// TYPES ===================================================================================================================================
export type ProcedureO<I extends unknown[], O> = {debug?: boolean; input?: ZType<unknown, I>; output?: ZType<O>; query: string};
export type ZType<O = unknown, I = O> = z.ZodType<O, z.ZodTypeDef, I>;
