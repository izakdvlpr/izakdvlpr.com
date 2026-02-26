import type { Metadata } from "next";
import Link from "next/link";
import {
	type IconType,
	SiBluesky,
	SiDiscord,
	SiGithub,
	SiGmail,
	SiInstagram,
	SiLastdotfm,
	SiLinkedin,
	SiReddit,
	SiSpotify,
	SiSteam,
	SiTwitch,
	SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

import { Form } from "@/components/pages/contact/form";
import { Button } from "@/components/ui/button";
import { SiAdobeacrobatreader } from "@icons-pack/react-simple-icons";

export const metadata: Metadata = {
	title: "Isaque Lima » Contact",
};

interface Social {
	name: string;
	icon: IconType;
	url: string;
}

export const socials: Social[] = [
	{
		name: "Github",
		icon: SiGithub,
		url: "https://github.com/izakdvlpr",
	},
	{
		name: "LinkedIn",
		icon: SiLinkedin,
		url: "https://linkedin.com/in/izakdvlpr",
	},
	{
		name: "Gmail",
		icon: SiGmail,
		url: "mailto:izakdvlpr@gmail.com",
	},
	{
		name: "Instagram",
		icon: SiInstagram,
		url: "https://instagram.com/izakdvlpr",
	},
	{
		name: "X",
		icon: SiX,
		url: "https://x.com/izakdvlpr",
	},
	{
		name: "Bluesky",
		icon: SiBluesky,
		url: "https://bsky.app/profile/izakdvlpr.bsky.social",
	},
	{
		name: "Discord",
		icon: SiDiscord,
		url: "https://discord.com/users/461273822360895491",
	},
	{
		name: "Spotify",
		icon: SiSpotify,
		url: "https://open.spotify.com/user/ppwml35eobqppac0xxfuwztzc?si=84cea6bfef764cce",
	},
	{
		name: "Last.fm",
		icon: SiLastdotfm,
		url: "https://www.last.fm/user/izakdvlpr",
	},
  {
    name: "Steam",
    icon: SiSteam,
    url: "https://steamcommunity.com/id/izakdvlpr"
  },
  {
    name: "Twitch",
    icon: SiTwitch,
    url: "https://www.twitch.tv/izakdvlpr"
  },
  {
    name: "Youtube",
    icon: SiYoutube,
    url: "https://www.youtube.com/@izakdvlpr"
  },
  {
    name: "Reddit",
    icon: SiReddit,
    url: "https://www.reddit.com/user/izakdvlpr"
  }
];

export default function ContactPage() {
	return (
		<main className="mt-10 flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold">Contact</h1>
        
				<p className="text-muted-foreground">
					Have a question or just want to say hi? Feel free to reach out through any of the channels below or send me a direct message.
				</p>
			</div>

			<section className="flex flex-col gap-4">
				<h2 className="text-xl font-semibold">Social Networks</h2>
        
				<div className="flex flex-wrap gap-3">
					{socials.map((social) => (
						<Button key={social.name} variant="outline" asChild>
							<Link href={social.url} target="_blank" rel="noopener noreferrer">
								<social.icon className="size-4" />
                
								{social.name}
							</Link>
						</Button>
					))}
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-xl font-semibold">Resume</h2>
        
				<p className="text-muted-foreground text-sm">
					Want to know more about my experience and skills? Download my resume below.
				</p>
        
				<Button variant="outline" className="w-fit" asChild>
					<Link href="/curriculo.pdf" target="_blank" rel="noopener noreferrer">
						<SiAdobeacrobatreader className="size-4" />
            
						Download Resume (PDF)
					</Link>
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
