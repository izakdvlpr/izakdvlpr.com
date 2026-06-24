import { Link, useLocation } from "@tanstack/react-router";
import { Code2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const links = [
	{ title: "About", href: "/about" },
	{ title: "Blog", href: "/blog" },
	{ title: "Projects", href: "/projects" },
	{ title: "Setup", href: "/setup" },
	{ title: "Contact", href: "/contact" },
] as const;

export function Header() {
	const pathname = useLocation({ select: (location) => location.pathname });

	return (
		<header className="flex items-center justify-between">
			<Link to="/" className="flex items-center gap-2">
				<Button
					type="button"
					size="icon"
					variant="outline"
					className="[&_svg]:size-5"
				>
					<Code2 className="text-black" />
				</Button>

				<h1 className="text-2xl font-bold">izakdvlpr</h1>
			</Link>

			<nav className="items-center gap-6 md:flex hidden">
				{links.map((link) => (
					<Link
						key={link.href}
						to={link.href}
						className={cn(
							"text-black",
							pathname.startsWith(link.href) && "font-bold text-black",
						)}
					>
						{link.title}
					</Link>
				))}
			</nav>

			<DropdownMenu>
				<DropdownMenuTrigger className="md:hidden flex" asChild>
					<Button
						type="button"
						size="icon"
						variant="outline"
						className="[&_svg]:size-5"
					>
						<Menu />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
					align="end"
				>
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link to="/" className="w-full">
								Home
							</Link>
						</DropdownMenuItem>

						{links.map((link) => (
							<DropdownMenuItem key={link.href} asChild>
								<Link to={link.href} className="w-full">
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
