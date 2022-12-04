import mailchimp from '@mailchimp/mailchimp_marketing';
import type {Handler} from '@netlify/functions';

export const handler: Handler = async () => {
  mailchimp.setConfig({apiKey: process.env.MAILCHIMP_API_KEY, server: process.env.MAILCHIMP_SERVER});
  const res = await (mailchimp as any).ping.get();

	return {
		statusCode: 302,
		headers: {
			"Location": `/?newsletter=${res.health_status}`,
		},
	};
};
