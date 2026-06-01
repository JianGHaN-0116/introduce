"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { useLang } from "./LangProvider";
import { ScrollText, Lightbulb } from "lucide-react";

const pubStatusStyles: Record<string, string> = {
  published: "text-green-700 bg-green-50 border-green-200",
  review: "text-yellow-700 bg-yellow-50 border-yellow-200",
  preprint: "text-violet-700 bg-violet-50 border-violet-200",
};

const patentStatusStyles: Record<string, string> = {
  granted: "text-green-700 bg-green-50 border-green-200",
  pending: "text-yellow-700 bg-yellow-50 border-yellow-200",
};

export default function Publications() {
  const { t } = useLang();
  const config = useConfig();

  if (!config) return null;

  const hasPublications = config.publications?.length > 0;
  const hasPatents = config.patents?.length > 0;

  if (!hasPublications && !hasPatents) return null;

  return (
    <SectionWrapper id="publications" className="bg-neutral-100/50">
      <div className="space-y-4 mb-12">
        <span className="text-base text-neutral-400 font-medium tracking-wide uppercase">
          {t.publications.title}
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
          Academic Achievements
        </h2>
      </div>

      {hasPublications && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <ScrollText size={18} className="text-neutral-400" />
            <h3 className="text-lg font-semibold text-neutral-700">{t.publications.title}</h3>
          </div>
          <div className="space-y-3">
            {config.publications.map((pub, i) => {
              const statusKey = pub.status as keyof typeof pubStatusStyles;
              const statusClass = pubStatusStyles[statusKey] || pubStatusStyles.preprint;
              const statusLabelKey = pub.status as "published" | "review" | "preprint";
              return (
                <motion.div
                  key={pub.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group rounded-xl p-5 bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-lg hover:shadow-neutral-200/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-semibold text-neutral-800 group-hover:text-neutral-600 transition-colors">
                      {pub.title}
                    </h3>
                    <span className={`shrink-0 px-2.5 py-1 text-xs rounded-md border ${statusClass}`}>
                      {t.publications.status[statusLabelKey]}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 mb-1">{pub.venue}</p>
                  <p className="text-sm text-neutral-500">{pub.contribution}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {hasPatents && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb size={18} className="text-neutral-400" />
            <h3 className="text-lg font-semibold text-neutral-700">{t.patents.title}</h3>
          </div>
          <div className="space-y-3">
            {config.patents.map((patent, i) => {
              const statusKey = patent.status as keyof typeof patentStatusStyles;
              const statusClass = patentStatusStyles[statusKey] || patentStatusStyles.pending;
              const statusLabelKey = patent.status as "granted" | "pending";
              return (
                <motion.div
                  key={patent.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group rounded-xl p-5 bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-lg hover:shadow-neutral-200/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-semibold text-neutral-800 group-hover:text-neutral-600 transition-colors">
                      {patent.title}
                    </h3>
                    <span className={`shrink-0 px-2.5 py-1 text-xs rounded-md border ${statusClass}`}>
                      {t.patents.status[statusLabelKey]}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 mb-1">{patent.number}</p>
                  <p className="text-sm text-neutral-500">{patent.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
