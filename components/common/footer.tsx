import Link from "next/link";
import { Dot, DotIcon, Languages } from "lucide-react";
import NextImage from "next/image";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export function Footer() {
	return (
		<footer className="w-full py-10 flex items-center justify-between gap-2">
			<div />

			<div className="text-sm text-center">
				<p>
					Made with ♥ by{" "}
					<Link href="https://github.com/izakdvlpr" target="_blank" rel="noopener noreferrer" className="underline">
						{"  "}
						Isaque Lima
					</Link>
				</p>

				<p>© {new Date().getFullYear()} Isaque Lima. All rights reserved.</p>
			</div>

			<div className="flex justify-end">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button type="button" size="icon" variant="outline" className="[&_svg]:size-5">
							<Languages />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56" align="end">
						<DropdownMenuGroup>
							<DropdownMenuItem className="[&_svg]:size-5">
								<NextImage
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
								<NextImage
									src="https://flagpedia.net/data/flags/w1160/br.webp"
									alt="Portuguese"
									width={24}
									height={16}
									className="grayscale"
								/>
								Portuguese
							</DropdownMenuItem>

							<DropdownMenuItem disabled>
								<NextImage
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
