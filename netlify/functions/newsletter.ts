import mailchimp from '@mailchimp/mailchimp_marketing';
import type {Handler} from '@netlify/functions';
import md5 from 'md5';

export const handler: Handler = async ({body, httpMethod}) => {
  if (httpMethod !== 'POST') return {statusCode: 405};
  const email_address = new URLSearchParams(body ?? '').get('email');
  const listId = process.env.MAILCHIMP_LIST_ID;
  if (!email_address || !listId) return {statusCode: 400};
  const subscriberHash = md5(email_address.toLowerCase());
  mailchimp.setConfig({apiKey: process.env.MAILCHIMP_API_KEY, server: process.env.MAILCHIMP_SERVER});
  try {
    const {status} = await mailchimp.lists.getListMember(listId, subscriberHash);
    if (status !== 'unsubscribed') return {statusCode: 401};
    await mailchimp.lists.updateListMember(listId, subscriberHash, {status: 'subscribed'});
  } catch {
    await mailchimp.lists.addListMember(listId, {email_address, status: 'subscribed'});
  }
  return {statusCode: 200};
};
