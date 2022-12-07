import type {Handler} from '@netlify/functions';

export const handler: Handler = async ({httpMethod}) => {
  if (httpMethod !== 'POST') return {statusCode: 404};
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {statusCode: 200};
};
