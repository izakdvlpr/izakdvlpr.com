"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const links = [
	{ title: "About", href: "/about" },
	{ title: "Blog", href: "/blog" },
	{ title: "Projects", href: "/projects" },
	{ title: "Setup", href: "/setup" },
	{ title: "Contact", href: "/contact" },
];

export function Header() {
	const pathname = usePathname();

	return (
		<header className="flex items-center justify-between">
			<Link href="/">
				<h1 className="text-2xl font-bold">izakdvlpr</h1>
			</Link>

			<nav className="items-center gap-6 md:flex hidden">
				{links.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className={cn("text-black", pathname.startsWith(link.href) && "font-bold text-black")}
					>
						{link.title}
					</Link>
				))}
			</nav>

			<DropdownMenu>
				<DropdownMenuTrigger className="md:hidden flex" asChild>
					<Button type="button" size="icon" variant="outline">
						<Menu />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56" align="end">
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Link href="/" className="w-full">
								Início
							</Link>
						</DropdownMenuItem>

						{links.map((link) => (
							<DropdownMenuItem key={link.href}>
								<Link href={link.href} className="w-full">
									{link.title}
								</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
}
