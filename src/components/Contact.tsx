"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import SectionWrapper from "./SectionWrapper";
import { Mail, Code2, BookOpen, Link2, PenTool } from "lucide-react";
import { useLang } from "./LangProvider";

const contactItems = [
  { key: "email", icon: "mail", hrefPrefix: "mailto:" },
  { key: "github", icon: "github", hrefPrefix: "" },
  { key: "scholar", icon: "scholar", hrefPrefix: "" },
  { key: "linkedin", icon: "linkedin", hrefPrefix: "" },
  { key: "blog", icon: "blog", hrefPrefix: "" },
] as const;

const iconMap: Record<string, React.ElementType> = {
  mail: Mail,
  github: Code2,
  scholar: BookOpen,
  linkedin: Link2,
  blog: PenTool,
};

export default function Contact() {
  const { t } = useLang();

  return (
    <SectionWrapper id="contact">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t.contact.title}
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {contactItems.map((item, i) => {
          const Icon = iconMap[item.icon] || Mail;
          const value = siteConfig[item.key as keyof typeof siteConfig];
          if (typeof value !== "string") return null;
          const href =
            item.key === "email"
              ? `mailto:${value}`
              : value;
          return (
            <motion.a
              key={item.key}
              href={href}
              target={item.key === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-xl p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:border-cyan-500/30 transition-colors">
                <Icon size={16} className="text-cyan-400/70" />
              </div>
              <div>
                <div className="text-xs text-white/25 mb-0.5">
                  {t.contact[item.key as keyof typeof t.contact]}
                </div>
                <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors truncate max-w-[200px]">
                  {value}
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-sm text-white/20 italic">
          &ldquo;{siteConfig.slogan}&rdquo;
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
