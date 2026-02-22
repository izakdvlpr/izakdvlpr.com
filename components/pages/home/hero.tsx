import {
	type IconType,
	SiBluesky,
	SiDiscord,
	SiGithub,
	SiGmail,
	SiInstagram,
	SiLastdotfm,
	SiLinkedin,
	SiSpotify,
	SiX,
} from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface Social {
	name: string;
	icon: IconType;
	url: string;
}

const socials: Social[] = [
	{
		name: "Github",
		icon: SiGithub,
		url: "https://github.com/izakdvlpr",
	},
	{
		name: "Linkedin",
		icon: SiLinkedin,
		url: "https://linkedin.com/in/izakdvlpr",
	},
	{
		name: "Gmail",
		icon: SiGmail,
		url: "malito:izakdvlpr@gmail.com",
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
];

export function Hero() {
	return (
		<section className="my-28 flex items-center justify-between">
			<div className="flex flex-col gap-4">
				<p className="text-4xl font-bold">Hey, I'm Isaque.</p>

				<p className="max-w-100 text-xl">
					Full Stack Developer. Passionate about programming, technology and pizza.
				</p>

				<div className="flex items-center gap-2 flex-wrap">
					{socials.map((social) => (
						<Button type="button" size="icon" variant="outline" key={social.name} asChild>
							<Link href={social.url} target="_blank" rel="noopener noreferrer">
								<social.icon className="text-black" />
							</Link>
						</Button>
					))}
				</div>
			</div>

			<Image
				src="https://github.com/izakdvlpr.png"
				alt="avatar"
				width={200}
				height={200}
				priority
				className="w-52 h-52 rounded-full shadow-lg md:flex hidden"
			/>
		</section>
	);
}
