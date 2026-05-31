"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import SectionWrapper from "./SectionWrapper";
import { Mail, BookOpen, Link2, Pen, ArrowUpRight, Code2 } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Code2,
    label: "GitHub",
    value: siteConfig.githubUsername,
    href: siteConfig.github,
  },
  {
    icon: BookOpen,
    label: "Google Scholar",
    value: "View Profile",
    href: siteConfig.scholar,
  },
  {
    icon: Link2,
    label: "LinkedIn",
    value: "Connect",
    href: siteConfig.linkedin,
  },
  {
    icon: Pen,
    label: "Blog",
    value: "Read Posts",
    href: siteConfig.blog,
  },
];

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Contact
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {contactLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="glass-card rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 group flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-cyan-500/20 transition-colors">
              <link.icon size={16} className="text-white/30" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-white/25 uppercase tracking-wider mb-0.5">
                {link.label}
              </div>
              <div className="text-xs text-white/50 truncate">
                {link.value}
              </div>
            </div>
            <ArrowUpRight
              size={12}
              className="text-white/10 group-hover:text-white/30 transition-colors"
            />
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-lg md:text-xl text-white/20 font-light italic tracking-wide">
          &ldquo;{siteConfig.slogan}&rdquo;
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
