import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { sendEmailFn } from "@/lib/server/contact";

export function Form() {
	const sendEmail = useServerFn(sendEmailFn);
	const [isPending, setIsPending] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);
		const { name, email, subject, message } = Object.fromEntries(
			formData,
		) as Record<string, string>;

		setIsPending(true);

		try {
			const isEmailSended = await sendEmail({
				data: { name, email, subject, message },
			});

			if (!isEmailSended) {
				toast.error("An error occurred while sending the email");

				return;
			}

			toast.success("Email sent successfully");

			form.reset();
		} catch {
			toast.error("An error occurred while sending the email");
		} finally {
			setIsPending(false);
		}
	}

	return (
		<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<Input name="name" placeholder="Your name" required />

				<Input
					type="email"
					name="email"
					placeholder="your@email.com"
					required
				/>
			</div>

			<Input name="subject" placeholder="Subject" required />

			<Textarea
				name="message"
				placeholder="Message"
				className="min-h-[200px]"
				required
			/>

			<Button type="submit" className="w-full md:max-w-44" disabled={isPending}>
				{isPending ? <Spinner /> : "Send"}
			</Button>
		</form>
	);
}
