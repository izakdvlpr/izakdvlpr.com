import { Link } from "@tanstack/react-router";
import { Bot, DotIcon, Languages, Moon, Rss, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Image } from "@/components/ui/image";
import { Switch } from "@/components/ui/switch";
import { socials } from "@/lib/data";
import { env } from "@/lib/env";

export function Footer() {
	const { resolvedTheme, setTheme } = useTheme();

	// resolvedTheme is undefined during SSR; wait for mount to avoid hydration mismatch.
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const theme = mounted && resolvedTheme === "dark" ? "dark" : "light";

	return (
		<footer className="w-full py-10 flex flex-col items-center justify-between gap-4 md:flex-row md:items-start">
			<div className="flex items-center gap-2">
				<Link to="/ai">
					<Bot className="size-5" />
				</Link>

				<a href="/rss.xml" target="_blank" rel="noopener noreferrer">
					<Rss className="size-5" />
				</a>

				{socials
					.filter((social) =>
						["Github", "LinkedIn", "X", "Discord"].includes(social.name),
					)
					.map((social) => (
						<a
							key={social.name}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<social.icon className="size-5" />
						</a>
					))}
			</div>

			<div className="flex flex-col items-center gap-6">
				<div className="text-sm text-center">
					<p>
						Made with ♥ by{" "}
						<a
							href="https://github.com/izakdvlpr"
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							{"  "}
							Isaque Lima
						</a>
					</p>

					<p>© {new Date().getFullYear()} Isaque Lima. All rights reserved.</p>
				</div>

				<iframe
					title="DataXamas live visitors"
					src={`${env.VITE_DATAXAMAS_URL}/widgets/${env.VITE_DATAXAMAS_WEBSITE_ID}/live?theme=${theme}`}
					width="160"
					height="50"
				/>
			</div>

			<div className="flex items-center justify-end gap-4">
				<div className="flex items-center gap-2">
					<Sun className="size-4 text-muted-foreground" />

					<Switch
						checked={theme === "dark"}
						onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
						aria-label="Toggle theme"
					/>

					<Moon className="size-4 text-muted-foreground" />
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							type="button"
							size="icon"
							variant="outline"
							className="[&_svg]:size-5"
						>
							<Languages />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
						align="end"
					>
						<DropdownMenuGroup>
							<DropdownMenuItem className="[&_svg]:size-5">
								<Image
									src="https://flagpedia.net/data/flags/w1160/us.webp"
									alt="English"
									width={24}
									height={16}
									className="grayscale"
								/>
								English
								<DotIcon className="ml-auto text-foreground" />
							</DropdownMenuItem>

							<DropdownMenuItem disabled>
								<Image
									src="https://flagpedia.net/data/flags/w1160/br.webp"
									alt="Portuguese"
									width={24}
									height={16}
									className="grayscale"
								/>
								Portuguese
							</DropdownMenuItem>

							<DropdownMenuItem disabled>
								<Image
									src="https://flagpedia.net/data/flags/w1160/uy.webp"
									alt="Spanish"
									width={24}
									height={16}
									className="grayscale"
								/>
								Spanish
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</footer>
	);
}
