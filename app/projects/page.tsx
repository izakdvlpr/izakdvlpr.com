import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LinkIcon } from 'lucide-react';

export const metadata: Metadata = {
	title: "Isaque Lima » Projects",
};

interface Project {
	name: string;
	tagline: string;
	description: string;
	status: "live" | "in development" | "open source";
	tags: string[];
	githubUrl?: string;
	liveUrl?: string;
};

const projects: Project[] = [
  {
		name: "TrackGeek",
		tagline: "Your personal media diary.",
		description: "A media tracking platform where you can log and rate anime, manga, books, TV series, and movies. Create custom lists, write reviews, mark favorites, and discover new content through a powerful search. Everything in one place for the true geek.",
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

const statusStyles: Record<Project["status"], string> = {
	live: "bg-green-100 text-green-700 border-green-200",
	"in development": "bg-yellow-100 text-yellow-700 border-yellow-200",
	"open source": "bg-blue-100 text-blue-700 border-blue-200",
};

export default function ProjectsPage() {
	return (
		<main className="mt-10 flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold">Projects</h1>
				<p className="text-muted-foreground">
					A selection of things I've been building. From developer tools to community platforms.
				</p>
			</div>

			<div className="flex flex-col gap-4">
				{projects.map((project, index) => (
					<div key={project.name}>
						<article className="flex flex-col gap-4">
							<div className="flex items-center gap-3 flex-wrap">
								<h2 className="text-2xl font-bold">{project.name}</h2>
								<span
									className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${statusStyles[project.status]}`}
								>
									{project.status}
								</span>
							</div>

							<p className="text-lg font-medium text-muted-foreground">{project.tagline}</p>

							<p>{project.description}</p>

							<div className="flex flex-wrap items-center gap-2">
								{project.tags.map((tag) => (
									<Badge variant="outline" key={tag}>
										{tag}
									</Badge>
								))}
							</div>

							{(project.githubUrl || project.liveUrl) && (
								<div className="flex items-center gap-3">
									{project.githubUrl && (
										<Button variant="outline" size="sm" asChild>
											<Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
												<SiGithub className="size-4" />
												Source
											</Link>
										</Button>
									)}
                  
									{project.liveUrl && (
										<Button variant="outline" size="sm" asChild>
											<Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="size-4" />
                        
												Visit
											</Link>
										</Button>
									)}
								</div>
							)}
						</article>

						{index !== projects.length - 1 && <hr className="mt-8 border-gray-100" />}
					</div>
				))}
			</div>
		</main>
	);
}
