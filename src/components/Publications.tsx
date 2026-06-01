"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { useLang } from "./LangProvider";

const statusStyles: Record<string, string> = {
  published: "text-green-700 bg-green-50 border-green-200",
  review: "text-yellow-700 bg-yellow-50 border-yellow-200",
  preprint: "text-violet-700 bg-violet-50 border-violet-200",
};

export default function Publications() {
  const { t } = useLang();
  const config = useConfig();

  if (!config || !config.publications?.length) return null;

  return (
    <SectionWrapper id="publications" className="bg-neutral-100/50">
      <div className="space-y-4 mb-12">
        <span className="text-base text-neutral-400 font-medium tracking-wide uppercase">
          {t.publications.title}
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
          Publications
        </h2>
      </div>

      <div className="space-y-3">
        {config.publications.map((pub, i) => {
          const statusKey = pub.status as keyof typeof statusStyles;
          const statusClass = statusStyles[statusKey] || statusStyles.preprint;
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
    </SectionWrapper>
  );
}
