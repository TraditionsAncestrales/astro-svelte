import mailchimp from '@mailchimp/mailchimp_marketing';
import type {APIRoute} from 'astro';

export const post: APIRoute = async ({redirect}) => {
  mailchimp.setConfig({apiKey: import.meta.env.MAILCHIMP_API_KEY, server: import.meta.env.MAILCHIMP_SERVER});
  const res = await (mailchimp as any).ping.get();
  return redirect(`/?newsletter=${res.health_status}`, 302);
};
