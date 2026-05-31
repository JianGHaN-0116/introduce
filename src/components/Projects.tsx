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
    <SectionWrapper id="projects" variant="alt3">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          {t.projects.title}
        </h2>
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
        <p className="text-gray-500 max-w-2xl text-[15px]">{t.projects.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {config.projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card card-accent-top rounded-xl p-6 group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                {project.name}
              </h3>
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                  >
                    <Code2 size={14} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 text-[10px] rounded-md border border-indigo-200 bg-indigo-50 text-indigo-600"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.highlights && (
              <p className="text-[11px] text-gray-400 flex items-start gap-1.5">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                {project.highlights}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
