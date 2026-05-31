"use client";

import { useConfig } from "./ConfigProvider";
import { useLang } from "./LangProvider";

export default function Footer() {
  const { t } = useLang();
  const config = useConfig();

  return (
    <footer className="border-t border-zinc-200 py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} {config.name}. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#home"
            className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            {t.nav.home}
          </a>
          <a
            href="#about"
            className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            {t.nav.about}
          </a>
          <a
            href="#contact"
            className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            {t.nav.contact}
          </a>
        </div>
      </div>
    </footer>
  );
}
