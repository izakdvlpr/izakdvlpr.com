import { SiAdobeacrobatreader } from "@icons-pack/react-simple-icons";
import { createFileRoute } from "@tanstack/react-router";

import { Form } from "#/components/pages/contact/form";
import { Button } from "#/components/ui/button";
import { socials } from "#/lib/socials";

export const Route = createFileRoute("/contact")({
	head: () => ({
		meta: [{ title: "Isaque Lima » Contact" }],
	}),
	component: ContactPage,
});

function ContactPage() {
	return (
		<main className="mt-10 flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold">Contact</h1>

				<p className="text-muted-foreground">
					Have a question or just want to say hi? Feel free to reach out through
					any of the channels below or send me a direct message.
				</p>
			</div>

			<section className="flex flex-col gap-4">
				<h2 className="text-xl font-semibold">Social Networks</h2>

				<div className="flex flex-wrap gap-3">
					{socials.map((social) => (
						<Button key={social.name} variant="outline" asChild>
							<a href={social.url} target="_blank" rel="noopener noreferrer">
								<social.icon className="size-4" />

								{social.name}
							</a>
						</Button>
					))}
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-xl font-semibold">Resume</h2>

				<p className="text-muted-foreground text-sm">
					Want to know more about my experience and skills? Download my resume
					below.
				</p>

				<Button variant="outline" className="w-fit" asChild>
					<a href="/curriculo.pdf" target="_blank" rel="noopener noreferrer">
						<SiAdobeacrobatreader className="size-4" />
						Download Resume (PDF)
					</a>
				</Button>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-xl font-semibold">Send a Message</h2>
				<p className="text-muted-foreground text-sm">
					Fill in the form below and I'll get back to you as soon as possible.
				</p>
				<Form />
			</section>
		</main>
	);
}
