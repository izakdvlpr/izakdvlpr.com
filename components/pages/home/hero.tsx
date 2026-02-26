import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Hero() {
	return (
		<section className="my-28 flex items-center justify-between">
			<div className="flex flex-col gap-4">
				<p className="text-4xl font-bold">Hey, I'm Isaque.</p>

				<p className="max-w-100 text-xl">Full Stack Developer. Passionate about programming, technology and pizza.</p>

				<div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/blog">Read my blog</Link>
          </Button>
          
          <Button className="w-fit" asChild>
          <Link href="/contact">
            Contact Me
          </Link>
        </Button>
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
