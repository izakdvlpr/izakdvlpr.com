import { SiGithub } from "@icons-pack/react-simple-icons";
import { createFileRoute } from "@tanstack/react-router";
import { LinkIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, type Project } from '@/lib/data';

export const Route = createFileRoute("/projects")({
	head: () => ({
		meta: [{ title: "Isaque Lima » Projects" }],
	}),
	component: ProjectsPage,
});

const statusStyles: Record<Project["status"], string> = {
	live: "bg-green-100 text-green-700 border-green-200",
	"in development": "bg-yellow-100 text-yellow-700 border-yellow-200",
	"open source": "bg-blue-100 text-blue-700 border-blue-200",
};

function ProjectsPage() {
	return (
		<main className="mt-10 flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold">Projects</h1>
				<p className="text-muted-foreground">
					A selection of things I've been building. From developer tools to
					community platforms.
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

							<p className="text-lg font-medium text-muted-foreground">
								{project.tagline}
							</p>

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
											<a
												href={project.githubUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<SiGithub className="size-4" />
												Source
											</a>
										</Button>
									)}

									{project.liveUrl && (
										<Button variant="outline" size="sm" asChild>
											<a
												href={project.liveUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<LinkIcon className="size-4" />
												Visit
											</a>
										</Button>
									)}
								</div>
							)}
						</article>

						{index !== projects.length - 1 && (
							<hr className="mt-8 border-gray-100" />
						)}
					</div>
				))}
			</div>
		</main>
	);
}
