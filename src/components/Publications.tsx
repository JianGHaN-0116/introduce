"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import SectionWrapper from "./SectionWrapper";

const statusConfig = {
  published: { label: "Published", className: "status-published" },
  review: { label: "Under Review", className: "status-review" },
  preprint: { label: "Preprint", className: "status-preprint" },
};

export default function Publications() {
  return (
    <SectionWrapper id="publications">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Publications
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400" />
      </div>

      <div className="space-y-4">
        {siteConfig.publications.map((pub, i) => {
          const status = statusConfig[pub.status];
          return (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <h3 className="text-sm font-semibold leading-snug">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-white/30">{pub.venue}</p>
                </div>
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${status.className}`}
                >
                  {status.label}
                </span>
              </div>
              <p className="text-xs text-white/25 mt-3 leading-relaxed">
                {pub.contribution}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
