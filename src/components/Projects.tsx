"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import SectionWrapper from "./SectionWrapper";
import { Code2, ExternalLink } from "lucide-react";

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Projects
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400" />
        <p className="text-white/35 text-sm max-w-xl">
          Selected projects that represent my work in security research and
          engineering.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {siteConfig.projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold gradient-text-cyan">
                {project.name}
              </h3>
              <div className="flex items-center gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/20 hover:text-white/60 transition-colors"
                  >
                    <Code2 size={14} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/20 hover:text-white/60 transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-xs text-white/35 leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="mt-auto space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-2 py-0.5 rounded-full border border-violet-500/10 bg-violet-500/5 text-violet-300/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.highlights && (
                <div className="text-[10px] text-white/25 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-400/50" />
                  {project.highlights}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
