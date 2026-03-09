import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Isaque Lima » Setup",
};

type SetupItem = {
	name: string;
	description?: string;
};

type SetupCategory = {
	title: string;
	items: SetupItem[];
};

const setup: SetupCategory[] = [
	{
		title: "Work",
		items: [
			{
				name: "Laptop",
				description: 'Apple MacBook Pro 14" 2021 — 16GB RAM',
			},
      {
				name: "Mouse",
				description: "Logitech Pebble 2 M350s Bluetooth",
			},
      {
				name: "Keyboard",
				description: "Logitech Pebble Keys 2 K380s Bluetooth",
			},
      {
				name: "MousePad",
				description: "Logitech Desk Mat Studio Series",
			},
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
				description: "INNO3D SuperFrame NVIDIA GeForce RTX 3060 TWIN X2 — 12GB GDDR6, DLSS, Ray Tracing",
			},
			{
				name: "Motherboard",
				description: "MSI B550M PRO-VDH WIFI",
			},
			{
				name: "RAM",
				description: "2x DDR4 Geil Orion RGB 8GB 3200MHz Red (16GB total)",
			},
			{
				name: "PSU",
				description: "XPG Kyber SuperFrame 750W 80 Plus Gold",
			},
			{
				name: "Case",
				description: "Cooler Master MasterBox Q300L",
			},
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
				description: "480GB — Kingston SA400S37 Sata III 500MBs Read, 450MB/s Write",
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
      {
        name: "TV",
        description: 'LG 55UA8550PSA — Smart TV 55” 4K',
      },
      {
        name: "TV",
        description: 'LG 24TL520S — Smart TV 24” LED',
      },
			{
				name: "Monitor",
				description: 'LG 26WQ500 — 26" IPS Ultra Wide',
			},
			{
				name: "Keyboard",
				description: "Attack Shark K86",
			},
			{
				name: "Mouse",
				description: "T-Dagger Captain",
			},
			{
				name: "Chair",
				description: "TGT Fury",
			},
		],
	},
	{
		title: "Audio",
		items: [
			{
				name: "Headset",
				description: "SuperFrame Odin — 50mm Drivers, 7.1 Surround",
			},
			{
				name: "Earbuds",
				description: "QCY ArcBuds",
			},
      {
				name: "Earbuds",
				description: "QKZ AK6",
			},
		],
	},
	{
		title: "Gaming",
		items: [
      {
				name: "Console",
				description: "PS5 Slim — 825GB",
			},
			{
				name: "Console",
				description: "Nintendo Switch Modded — 256GB",
			},
			{
				name: "Console",
				description: "Nintendo Wii Modded",
			},
      {
				name: "Controller",
				description: "Sony DualSense 5 — PS5",
			},
      {
				name: "Controller",
				description: "Sony DualShock 4 — PS4",
			},
		],
	},
	{
		title: "Mobile & Wearables",
		items: [
			{
				name: "Phone",
				description: "Redmi 10C Global — 64GB",
			},
			{
				name: "Smartwatch",
				description: "Xiaomi Mi Band 8",
			},
		],
	},
];

export default function SetupPage() {
	return (
		<main className="mt-10 flex flex-col gap-4">
			<h1 className="text-3xl font-bold">Setup</h1>

			<p className="text-lg text-black dark:text-white/70">Hardware and peripherals I use on a daily basis.</p>

			<div className="flex flex-col gap-4">
				{setup.map((category) => (
					<section key={category.title} className="flex flex-col gap-3">
						<h2 className="text-xl font-semibold border-b pb-2">{category.title}</h2>
						<ul className="flex flex-col gap-2">
							{category.items.map((item, index) => (
								<li
									key={`${item.name}-${index}`}
									className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2 border-b border-dashed last:border-0"
								>
									<span className="font-medium text-sm text-black/60 dark:text-white/50 uppercase tracking-wide min-w-35">
										{item.name}
									</span>
									{item.description && (
										<span className="text-base text-black dark:text-white/90 sm:text-right">{item.description}</span>
									)}
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</main>
	);
}
