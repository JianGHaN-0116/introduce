"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import SectionWrapper from "./SectionWrapper";
import { useLang } from "./LangProvider";

const statusColors: Record<string, string> = {
  Published: "text-emerald-400/70 border-emerald-400/20 bg-emerald-400/5",
  "Under Review": "text-amber-400/70 border-amber-400/20 bg-amber-400/5",
  Preprint: "text-violet-400/70 border-violet-400/20 bg-violet-400/5",
};

const statusKeys: Record<string, "published" | "review" | "preprint"> = {
  Published: "published",
  "Under Review": "review",
  Preprint: "preprint",
};

export default function Publications() {
  const { t } = useLang();

  return (
    <SectionWrapper id="publications">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t.publications.title}
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400" />
      </div>

      <div className="space-y-4">
        {siteConfig.publications.map((pub, i) => (
          <motion.div
            key={pub.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
              <h3 className="text-sm font-semibold">{pub.title}</h3>
              <span
                className={`shrink-0 px-2 py-0.5 text-[10px] rounded border ${
                  statusColors[pub.status] || statusColors["Preprint"]
                }`}
              >
                {t.publications.status[statusKeys[pub.status] || "preprint"]}
              </span>
            </div>
            <p className="text-xs text-white/30 mb-1">{pub.venue}</p>
            <p className="text-xs text-white/35">{pub.contribution}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
