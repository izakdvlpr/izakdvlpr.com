import { Link } from "@tanstack/react-router";
import { Bot, DotIcon, Languages, Rss } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { Image } from "#/components/ui/image";
import { DATAXAMAS_URL, DATAXAMAS_WEBSITE_ID } from "#/lib/constants";
import { socials } from "#/lib/socials";

export function Footer() {
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
					src={`${DATAXAMAS_URL}/widgets/${DATAXAMAS_WEBSITE_ID}/live?theme=light`}
					width="160"
					height="50"
				/>
			</div>

			<div className="flex justify-end">
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
								<DotIcon className="ml-auto text-black" />
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
