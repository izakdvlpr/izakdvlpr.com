import { Resend } from "resend";
import { env } from "#/env";
import { SENDER_EMAIL } from "#/lib/constants";

interface SendEmailData {
	subject: string;
	context: Record<string, any>;
}

const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmail({
	subject,
	context,
}: SendEmailData): Promise<boolean> {
	try {
		const start = Date.now();

		const response = await resend.emails.send({
			from: SENDER_EMAIL,
			to: SENDER_EMAIL,
			subject,
			html: `
        <div>
          <ul>
            <li>Name: ${context.name}</li>
            <li>Email: ${context.email}</li>
            <li>Subject: ${context.subject}</li>
            <li>Message: ${context.message}</li>
          </ul>
        </div>
      `,
		});

		if (response.error) {
			console.error(`Error sending email: ${response.error}`);

			return false;
		}

		console.info(
			`Email sent in ${Date.now() - start}ms with id ${response.data?.id}`,
		);

		return true;
	} catch (error) {
		console.error(`Error sending email: ${error}`);

		return false;
	}
}
