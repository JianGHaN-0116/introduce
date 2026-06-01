"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useConfig } from "./ConfigProvider";
import { useLang } from "./LangProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, t, toggleLang } = useLang();
  const config = useConfig();

  const navItems = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.research, href: "#research" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.academic, href: "#publications" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/80 backdrop-blur-xl border-b border-neutral-200/60 shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#home"
          className={`text-lg font-bold tracking-tight transition-colors ${
            scrolled ? "text-neutral-900" : "text-white"
          }`}
        >
          {config?.name || "My Site"}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors duration-200 relative group ${
                scrolled
                  ? "text-neutral-500 hover:text-neutral-900"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <button
            onClick={toggleLang}
            className={`flex items-center gap-1.5 text-sm transition-colors duration-200 ${
              scrolled
                ? "text-neutral-400 hover:text-neutral-600"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
            title={lang === "en" ? "切换中文" : "Switch to English"}
          >
            <Globe size={14} />
            <span className="text-xs font-medium uppercase">{lang}</span>
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleLang}
            className={`flex items-center gap-1 transition-colors ${
              scrolled ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            <Globe size={14} />
            <span className="text-xs uppercase">{lang}</span>
          </button>
          <button
            className={scrolled ? "text-neutral-600" : "text-neutral-300"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-neutral-200/60"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
