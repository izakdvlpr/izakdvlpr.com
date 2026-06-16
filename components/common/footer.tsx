import Link from "next/link";
import { Bot, DotIcon, Languages, Rss } from "lucide-react";
import NextImage from "next/image";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { socials } from '@/app/contact/page';

export function Footer() {
	return (
		<footer className="w-full py-10 flex flex-col items-center justify-between gap-4 md:flex-row md:items-start">
			<div className='flex items-center gap-2'>
        <Link href="/ai">
          <Bot className="size-5" />
        </Link>
        
        <Link href="/rss.xml" target="_blank" rel="noopener noreferrer">
          <Rss className="size-5" />
        </Link>
        
        {socials.filter(social => ["Github", "LinkedIn", "X", "Discord"].includes(social.name)).map(social => (
          <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
            <social.icon className="size-5" />
          </Link>
        ))}
      </div>

			<div className="flex flex-col items-center gap-6">
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
        
        <iframe
          src="http://dataxamas.izakdvlpr.com/widgets/4cb1fc6f-b4d1-4f0e-98ed-017e3042d48f/live?theme=light"
          width="160"
          height="50"
        />
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
