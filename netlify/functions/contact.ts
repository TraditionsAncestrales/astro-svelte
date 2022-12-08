import type {Handler} from '@netlify/functions';

export const handler: Handler = async ({httpMethod}) => ({statusCode: httpMethod === 'POST' ? 200 : 404});
