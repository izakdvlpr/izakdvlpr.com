import nodemailer from "nodemailer";

import { SENDER_EMAIL } from "@/utils";
import { environment } from "./environment";

interface SendEmailData {
	subject: string;
	context: Record<string, any>;
}

const transport = nodemailer.createTransport({
	host: environment.SMTP_HOST,
	port: environment.SMTP_PORT,
	secure: environment.SMTP_SECURE,
	auth: {
		user: environment.SMTP_USERNAME,
		pass: environment.SMTP_PASSWORD,
	},
});

export async function sendEmail({
	subject,
	context,
}: SendEmailData): Promise<boolean> {
	try {
		await transport.sendMail({
			from: SENDER_EMAIL,
			to: environment.RECIPIENT_EMAIL,
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

		return true;
	} catch {
		return false;
	}
}
