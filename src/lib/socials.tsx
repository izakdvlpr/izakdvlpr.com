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

export interface Social {
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
		url: "https://bsky.app/profile/izakdvlpr.com",
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
		url: "https://steamcommunity.com/id/izakdvlpr",
	},
	{
		name: "Twitch",
		icon: SiTwitch,
		url: "https://www.twitch.tv/izakdvlpr",
	},
	{
		name: "Youtube",
		icon: SiYoutube,
		url: "https://www.youtube.com/@izakdvlpr",
	},
	{
		name: "Reddit",
		icon: SiReddit,
		url: "https://www.reddit.com/user/izakdvlpr",
	},
];
