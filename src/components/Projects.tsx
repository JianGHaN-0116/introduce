"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { ExternalLink, Code2 } from "lucide-react";
import { useLang } from "./LangProvider";

export default function Projects() {
  const { t } = useLang();
  const config = useConfig();

  return (
    <SectionWrapper id="projects">
      <div className="space-y-4 mb-12">
        <span className="text-sm text-neutral-400 font-medium tracking-wide uppercase">
          {t.projects.title}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
          Selected Projects
        </h2>
        <p className="text-neutral-500 max-w-2xl text-sm">{t.projects.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {config.projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group rounded-xl p-6 bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-lg hover:shadow-neutral-200/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold text-neutral-800 group-hover:text-neutral-600 transition-colors">
                {project.name}
              </h3>
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-neutral-600 transition-colors"
                  >
                    <Code2 size={14} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-neutral-600 transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-400 hover:bg-white transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.highlights && (
              <p className="text-[11px] text-neutral-400 flex items-start gap-1.5">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-300 shrink-0" />
                {project.highlights}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
