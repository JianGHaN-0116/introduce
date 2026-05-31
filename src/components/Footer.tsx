"use client";

import { useConfig } from "./ConfigProvider";
import { useLang } from "./LangProvider";

export default function Footer() {
  const { t } = useLang();
  const config = useConfig();

  return (
    <footer className="border-t border-gray-200 bg-white/60 backdrop-blur-sm py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} {config.name}. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#home"
            className="text-xs text-gray-400 hover:text-indigo-500 transition-colors"
          >
            {t.nav.home}
          </a>
          <a
            href="#about"
            className="text-xs text-gray-400 hover:text-indigo-500 transition-colors"
          >
            {t.nav.about}
          </a>
          <a
            href="#contact"
            className="text-xs text-gray-400 hover:text-indigo-500 transition-colors"
          >
            {t.nav.contact}
          </a>
        </div>
      </div>
    </footer>
  );
}
