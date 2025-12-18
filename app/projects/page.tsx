
"use client";

import Link from "next/link";
import { Github, ExternalLink, Code } from "lucide-react";
import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  liveLink: string;
  githubLink: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.data);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen text-foreground flex justify-center items-center">Loading...</div>;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 border-l-4 border-[var(--accent)] pl-4">
            Notable Projects
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Here are some of the projects I&apos;ve worked on. Each project represents a unique challenge and a solution engineered with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group relative bg-muted border border-border rounded-lg overflow-hidden hover:border-[var(--accent)] transition-all duration-300 flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-background rounded-md border border-border group-hover:border-[var(--accent)] transition-colors">
                    <Code className="w-6 h-6 text-[var(--accent)]" />
                  </div>
                  <div className="flex gap-2">
                    {project.githubLink && (
                        <Link
                        href={project.githubLink}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        target="_blank"
                        >
                        <Github className="w-5 h-5" />
                        </Link>
                    )}
                    {project.liveLink && (
                        <Link
                        href={project.liveLink}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        target="_blank"
                        >
                        <ExternalLink className="w-5 h-5" />
                        </Link>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="px-6 py-4 border-t border-border bg-background/50">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {projects.length === 0 && (
            <div className="text-center text-gray-500 mt-12">
                No projects found. Add them from the Admin Dashboard (/me).
            </div>
        )}

        <div className="mt-16 text-center">
            <Link 
                href="#"
                className="inline-flex items-center text-[var(--accent)] hover:underline font-semibold text-lg transition-colors"
            >
                View all projects on GitHub <Github className="ml-2 w-5 h-5" />
            </Link>
        </div>
      </div>
    </div>
  );
}
