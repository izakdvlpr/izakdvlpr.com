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

export interface Project {
	name: string;
	tagline: string;
	description: string;
	status: "live" | "in development" | "open source";
	tags: string[];
	githubUrl?: string;
	liveUrl?: string;
}

export const projects: Project[] = [
	{
		name: "TrackGeek",
		tagline: "Your personal media diary.",
		description:
			"A media tracking platform where you can log and rate anime, manga, books, TV series, and movies. Create custom lists, write reviews, mark favorites, and discover new content through a powerful search. Everything in one place for the true geek.",
		status: "in development",
		githubUrl: "https://github.com/TrackGeek",
		liveUrl: "https://trackgeek.net",
		tags: ["TypeScript", "TanStack", "NestJS", "PostgreSQL", "Redis"],
	},
	{
		name: "DataXamas",
		tagline: "Analytics without the complexity.",
		description:
			"A lightweight analytics tracker that monitors page views, visitor origins, devices, browsers and geographic data in real time — similar to Google Analytics but simpler and privacy-focused.",
		status: "in development",
		liveUrl: "https://dataxamas.izakdvlpr.com",
		tags: ["TypeScript", "Next.js", "PostgreSQL", "Redis"],
	},
	{
		name: "Hora Judaica",
		tagline: "The Jewish calendar in your pocket.",
		description:
			"A platform for the Jewish community that provides accurate Shabbat times, upcoming Jewish holidays, and the weekly Parasha reading. Users can subscribe to receive all of this information directly via email, keeping them connected to the Jewish calendar wherever they are.",
		status: "in development",
		liveUrl: "https://horajudaica.com",
		githubUrl: "https://github.com/izakdvlpr/horajudaica",
		tags: ["TypeScript", "Next.js", "Resend", "Node.js"],
	},
];

export interface SetupItem {
	name: string;
	description?: string;
};

export interface SetupCategory {
	title: string;
	items: SetupItem[];
};

export const setup: SetupCategory[] = [
	{
		title: "Work",
		items: [
			{ name: "Laptop", description: 'Apple MacBook Pro 14" 2021 — 16GB RAM' },
			{ name: "Mouse", description: "Logitech Pebble 2 M350s Bluetooth" },
			{
				name: "Keyboard",
				description: "Logitech Pebble Keys 2 K380s Bluetooth",
			},
			{ name: "MousePad", description: "Logitech Desk Mat Studio Series" },
		],
	},
	{
		title: "PC Build",
		items: [
			{
				name: "CPU",
				description: "AMD Ryzen 5 PRO 4650GE — 3.3GHz, 6-Cores 12-Threads, AM4",
			},
			{
				name: "GPU",
				description:
					"INNO3D SuperFrame NVIDIA GeForce RTX 3060 TWIN X2 — 12GB GDDR6, DLSS, Ray Tracing",
			},
			{ name: "Motherboard", description: "MSI B550M PRO-VDH WIFI" },
			{
				name: "RAM",
				description: "2x DDR4 Geil Orion RGB 8GB 3200MHz Red (16GB total)",
			},
			{ name: "PSU", description: "XPG Kyber SuperFrame 750W 80 Plus Gold" },
			{ name: "Case", description: "Cooler Master MasterBox Q300L" },
		],
	},
	{
		title: "Storage",
		items: [
			{
				name: "NVMe SSD",
				description: "500GB — WD Blue SN570 M.2 3500MBs Read, 2300MB/s Write",
			},
			{
				name: "SATA SSD",
				description:
					"480GB — Kingston SA400S37 Sata III 500MBs Read, 450MB/s Write",
			},
			{
				name: "SATA SSD",
				description: "120GB — Adata SU650 Sata III  520MBs Read, 450MB/s Write",
			},
		],
	},
	{
		title: "Peripherals",
		items: [
			{ name: "TV", description: "LG 55UA8550PSA — Smart TV 55” 4K" },
			{ name: "TV", description: "LG 24TL520S — Smart TV 24” LED" },
			{ name: "Monitor", description: 'LG 26WQ500 — 26" IPS Ultra Wide' },
			{ name: "Keyboard", description: "Attack Shark K86" },
			{ name: "Mouse", description: "T-Dagger Captain" },
			{ name: "Chair", description: "TGT Fury" },
		],
	},
	{
		title: "Audio",
		items: [
			{
				name: "Headset",
				description: "SuperFrame Odin — 50mm Drivers, 7.1 Surround",
			},
			{ name: "Earbuds", description: "QCY ArcBuds" },
			{ name: "Earbuds", description: "QKZ AK6" },
		],
	},
	{
		title: "Gaming",
		items: [
			{ name: "Console", description: "PS5 Slim — 825GB" },
			{ name: "Console", description: "Nintendo Switch Modded — 256GB" },
			{ name: "Console", description: "Nintendo Wii Modded" },
			{ name: "Controller", description: "Sony DualSense 5 — PS5" },
			{ name: "Controller", description: "Sony DualShock 4 — PS4" },
		],
	},
	{
		title: "Mobile & Wearables",
		items: [
			{ name: "Phone", description: "Redmi 10C Global — 64GB" },
			{ name: "Smartwatch", description: "Xiaomi Mi Band 8" },
		],
	},
];