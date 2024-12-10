import { helpersFrom } from "astro-pocketbase";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const { getRecord, getRecords } = helpersFrom({ pocketbase: context.locals.pocketbase, cache: import.meta.env.DEV ? "1d" : undefined });
  context.locals.getRecord = getRecord;
  context.locals.getRecords = getRecords;
  return next();
});
