import { siteConfig } from "@/data/siteConfig";
import { Code2, Mail, BookOpen, Link2, Pen } from "lucide-react";

export default function Footer() {
  const links = [
    { icon: Code2, href: siteConfig.github, label: "GitHub" },
    { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
    { icon: BookOpen, href: siteConfig.scholar, label: "Scholar" },
    { icon: Link2, href: siteConfig.linkedin, label: "LinkedIn" },
    { icon: Pen, href: siteConfig.blog, label: "Blog" },
  ];

  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/70 transition-colors duration-200"
              aria-label={link.label}
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>
        <p className="text-xs text-white/20">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
