"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { useLang } from "./LangProvider";

const statusMap: Record<string, { color: string; key: "published" | "review" | "preprint" }> = {
  published: {
    color: "text-emerald-700 border-emerald-200 bg-emerald-50",
    key: "published",
  },
  review: {
    color: "text-amber-700 border-amber-200 bg-amber-50",
    key: "review",
  },
  preprint: {
    color: "text-violet-700 border-violet-200 bg-violet-50",
    key: "preprint",
  },
};

export default function Publications() {
  const { t } = useLang();
  const config = useConfig();

  return (
    <SectionWrapper id="publications">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
          {t.publications.title}
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-600 to-violet-600" />
      </div>

      <div className="space-y-4">
        {config.publications.map((pub, i) => {
          const status = statusMap[pub.status] || statusMap.preprint;
          return (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                <h3 className="text-sm font-semibold text-zinc-800">{pub.title}</h3>
                <span
                  className={`shrink-0 px-2 py-0.5 text-[10px] rounded border ${status.color}`}
                >
                  {t.publications.status[status.key]}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-1">{pub.venue}</p>
              <p className="text-xs text-zinc-500">{pub.contribution}</p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
