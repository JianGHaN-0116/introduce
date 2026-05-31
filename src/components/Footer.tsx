"use client";

import { siteConfig } from "@/data/siteConfig";
import { useLang } from "./LangProvider";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-white/5 py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/20">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#home"
            className="text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            {t.nav.home}
          </a>
          <a
            href="#about"
            className="text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            {t.nav.about}
          </a>
          <a
            href="#contact"
            className="text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            {t.nav.contact}
          </a>
        </div>
      </div>
    </footer>
  );
}
