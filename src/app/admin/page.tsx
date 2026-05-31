"use client";

import { useState, useEffect } from "react";
import { siteConfig as defaultConfig } from "@/data/siteConfig";
import {
  Save,
  RotateCcw,
  Download,
  Upload,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  ArrowLeft,
} from "lucide-react";

type SectionKey =
  | "basic"
  | "about"
  | "research"
  | "projects"
  | "publications"
  | "experience"
  | "skills";

const sections: { key: SectionKey; label: string }[] = [
  { key: "basic", label: "基本信息" },
  { key: "about", label: "关于我" },
  { key: "research", label: "研究方向" },
  { key: "projects", label: "项目经历" },
  { key: "publications", label: "论文成果" },
  { key: "experience", label: "经历时间线" },
  { key: "skills", label: "技术能力" },
];

export default function AdminPage() {
  const [config, setConfig] = useState(JSON.parse(JSON.stringify(defaultConfig)));
  const [activeSection, setActiveSection] = useState<SectionKey>("basic");
  const [saved, setSaved] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem("siteConfig");
    if (stored) {
      try {
        setConfig(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("siteConfig", JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("确定要重置为默认配置吗？")) {
      setConfig(JSON.parse(JSON.stringify(defaultConfig)));
      localStorage.removeItem("siteConfig");
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "siteConfig.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          setConfig(data);
        } catch {
          alert("JSON 格式错误");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const updateField = (path: string, value: unknown) => {
    const newConfig = JSON.parse(JSON.stringify(config));
    const keys = path.split(".");
    let obj: Record<string, unknown> = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]] as Record<string, unknown>;
    }
    obj[keys[keys.length - 1]] = value;
    setConfig(newConfig);
  };

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const addItem = (path: string, template: Record<string, unknown>) => {
    const newConfig = JSON.parse(JSON.stringify(config));
    const keys = path.split(".");
    let obj: Record<string, unknown> = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]] as Record<string, unknown>;
    }
    const arr = obj[keys[keys.length - 1]] as Record<string, unknown>[];
    arr.push(template);
    setConfig(newConfig);
  };

  const removeItem = (path: string, index: number) => {
    const newConfig = JSON.parse(JSON.stringify(config));
    const keys = path.split(".");
    let obj: Record<string, unknown> = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]] as Record<string, unknown>;
    }
    const arr = obj[keys[keys.length - 1]] as Record<string, unknown>[];
    arr.splice(index, 1);
    setConfig(newConfig);
  };

  const renderBasicSection = () => (
    <div className="space-y-4">
      {[
        { key: "name", label: "姓名" },
        { key: "title", label: "头衔" },
        { key: "subtitle", label: "副标题" },
        { key: "heroDescription", label: "个人简介" },
        { key: "email", label: "邮箱" },
        { key: "github", label: "GitHub 链接" },
        { key: "githubUsername", label: "GitHub 用户名" },
        { key: "scholar", label: "Google Scholar" },
        { key: "linkedin", label: "LinkedIn" },
        { key: "blog", label: "博客" },
        { key: "slogan", label: "个人 Slogan" },
        { key: "avatar", label: "头像 URL" },
      ].map(({ key, label }) => (
        <div key={key}>
          <label className="block text-xs text-white/30 mb-1">{label}</label>
          {key === "heroDescription" ? (
            <textarea
              value={config[key] as string}
              onChange={(e) => updateField(key, e.target.value)}
              rows={3}
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-cyan-500/30 resize-none"
            />
          ) : (
            <input
              type="text"
              value={config[key] as string}
              onChange={(e) => updateField(key, e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-cyan-500/30"
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderAboutSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-white/30 mb-1">背景介绍</label>
        <textarea
          value={config.about.background}
          onChange={(e) => updateField("about.background", e.target.value)}
          rows={3}
          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-cyan-500/30 resize-none"
        />
      </div>
      <div>
        <label className="block text-xs text-white/30 mb-1">研究兴趣</label>
        <textarea
          value={config.about.interests}
          onChange={(e) => updateField("about.interests", e.target.value)}
          rows={3}
          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-cyan-500/30 resize-none"
        />
      </div>
      <div>
        <label className="block text-xs text-white/30 mb-2">卡片列表</label>
        {config.about.cards.map((card: { title: string; description: string; icon: string }, i: number) => (
          <div key={i} className="mb-3 p-3 border border-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/40">卡片 {i + 1}</span>
              <button onClick={() => removeItem("about.cards", i)} className="text-red-400/50 hover:text-red-400">
                <Trash2 size={12} />
              </button>
            </div>
            <input
              type="text"
              value={card.title}
              onChange={(e) => updateField(`about.cards.${i}.title`, e.target.value)}
              placeholder="标题"
              className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 mb-2 focus:outline-none focus:border-cyan-500/30"
            />
            <textarea
              value={card.description}
              onChange={(e) => updateField(`about.cards.${i}.description`, e.target.value)}
              placeholder="描述"
              rows={2}
              className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30 resize-none"
            />
          </div>
        ))}
        <button
          onClick={() => addItem("about.cards", { title: "新卡片", description: "描述", icon: "flask" })}
          className="text-xs text-cyan-400/50 hover:text-cyan-400 flex items-center gap-1"
        >
          <Plus size={12} /> 添加卡片
        </button>
      </div>
    </div>
  );

  const renderArraySection = (
    path: string,
    items: Record<string, unknown>[],
    templates: Record<string, unknown>,
    renderItem: (item: Record<string, unknown>, index: number) => React.ReactNode
  ) => (
    <div>
      {items.map((item, i) => (
        <div key={i} className="mb-3">
          <div
            className="flex items-center justify-between p-3 border border-white/5 rounded-lg cursor-pointer hover:border-white/10"
            onClick={() => toggleExpand(`${path}.${i}`)}
          >
            <div className="flex items-center gap-2">
              {expandedItems[`${path}.${i}`] ? <ChevronDown size={12} className="text-white/30" /> : <ChevronRight size={12} className="text-white/30" />}
              <span className="text-xs text-white/50">
                {String(item.title || item.name || `项目 ${i + 1}`)}
              </span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); removeItem(path, i); }}
              className="text-red-400/50 hover:text-red-400"
            >
              <Trash2 size={12} />
            </button>
          </div>
          {expandedItems[`${path}.${i}`] && (
            <div className="p-3 border border-white/5 border-t-0 rounded-b-lg">
              {renderItem(item, i)}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => addItem(path, templates)}
        className="text-xs text-cyan-400/50 hover:text-cyan-400 flex items-center gap-1 mt-2"
      >
        <Plus size={12} /> 添加项目
      </button>
    </div>
  );

  const renderResearchSection = () =>
    renderArraySection("research", config.research, {
      title: "新研究方向",
      description: "描述",
      tags: ["Tag1"],
    }, (item, i) => (
      <div className="space-y-2">
        <input type="text" value={String(item.title)} onChange={(e) => updateField(`research.${i}.title`, e.target.value)} placeholder="标题" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
        <textarea value={String(item.description)} onChange={(e) => updateField(`research.${i}.description`, e.target.value)} placeholder="描述" rows={2} className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30 resize-none" />
        <input type="text" value={((item.tags as string[]) || []).join(", ")} onChange={(e) => updateField(`research.${i}.tags`, e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} placeholder="标签（逗号分隔）" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
      </div>
    ));

  const renderProjectsSection = () =>
    renderArraySection("projects", config.projects, {
      name: "新项目",
      description: "描述",
      techStack: ["Tech1"],
      highlights: "亮点",
      github: "",
      demo: "",
    }, (item, i) => (
      <div className="space-y-2">
        <input type="text" value={String(item.name)} onChange={(e) => updateField(`projects.${i}.name`, e.target.value)} placeholder="项目名" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
        <textarea value={String(item.description)} onChange={(e) => updateField(`projects.${i}.description`, e.target.value)} placeholder="描述" rows={2} className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30 resize-none" />
        <input type="text" value={((item.techStack as string[]) || []).join(", ")} onChange={(e) => updateField(`projects.${i}.techStack`, e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} placeholder="技术栈（逗号分隔）" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
        <input type="text" value={String(item.highlights || "")} onChange={(e) => updateField(`projects.${i}.highlights`, e.target.value)} placeholder="亮点" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
        <input type="text" value={String(item.github || "")} onChange={(e) => updateField(`projects.${i}.github`, e.target.value)} placeholder="GitHub 链接" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
        <input type="text" value={String(item.demo || "")} onChange={(e) => updateField(`projects.${i}.demo`, e.target.value)} placeholder="Demo 链接" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
      </div>
    ));

  const renderPublicationsSection = () =>
    renderArraySection("publications", config.publications, {
      title: "新论文",
      venue: "会议/期刊",
      status: "preprint",
      contribution: "贡献说明",
    }, (item, i) => (
      <div className="space-y-2">
        <input type="text" value={String(item.title)} onChange={(e) => updateField(`publications.${i}.title`, e.target.value)} placeholder="论文标题" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
        <input type="text" value={String(item.venue)} onChange={(e) => updateField(`publications.${i}.venue`, e.target.value)} placeholder="期刊/会议" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
        <select value={String(item.status)} onChange={(e) => updateField(`publications.${i}.status`, e.target.value)} className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30">
          <option value="published">Published</option>
          <option value="review">Under Review</option>
          <option value="preprint">Preprint</option>
        </select>
        <textarea value={String(item.contribution)} onChange={(e) => updateField(`publications.${i}.contribution`, e.target.value)} placeholder="贡献说明" rows={2} className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30 resize-none" />
      </div>
    ));

  const renderExperienceSection = () =>
    renderArraySection("experience", config.experience, {
      year: "2024 - Present",
      title: "新经历",
      organization: "组织",
      description: "描述",
    }, (item, i) => (
      <div className="space-y-2">
        <input type="text" value={String(item.year)} onChange={(e) => updateField(`experience.${i}.year`, e.target.value)} placeholder="时间" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
        <input type="text" value={String(item.title)} onChange={(e) => updateField(`experience.${i}.title`, e.target.value)} placeholder="标题" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
        <input type="text" value={String(item.organization)} onChange={(e) => updateField(`experience.${i}.organization`, e.target.value)} placeholder="组织" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
        <textarea value={String(item.description)} onChange={(e) => updateField(`experience.${i}.description`, e.target.value)} placeholder="描述" rows={2} className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30 resize-none" />
      </div>
    ));

  const renderSkillsSection = () =>
    renderArraySection("skills", config.skills, {
      category: "新分类",
      items: ["Skill1"],
    }, (item, i) => (
      <div className="space-y-2">
        <input type="text" value={String(item.category)} onChange={(e) => updateField(`skills.${i}.category`, e.target.value)} placeholder="分类名" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
        <input type="text" value={((item.items as string[]) || []).join(", ")} onChange={(e) => updateField(`skills.${i}.items`, e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} placeholder="技能（逗号分隔）" className="w-full bg-white/[0.03] border border-white/10 rounded px-2 py-1.5 text-xs text-white/70 focus:outline-none focus:border-cyan-500/30" />
      </div>
    ));

  const sectionRenderers: Record<SectionKey, () => React.ReactNode> = {
    basic: renderBasicSection,
    about: renderAboutSection,
    research: renderResearchSection,
    projects: renderProjectsSection,
    publications: renderPublicationsSection,
    experience: renderExperienceSection,
    skills: renderSkillsSection,
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white/70">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a href="/" className="text-white/30 hover:text-white/60 transition-colors">
              <ArrowLeft size={18} />
            </a>
            <div>
              <h1 className="text-xl font-bold text-white/80">内容管理</h1>
              <p className="text-xs text-white/25">编辑网站内容，保存后实时生效</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleImport} className="p-2 rounded-lg border border-white/10 hover:border-white/20 text-white/40 hover:text-white/60 transition-all" title="导入">
              <Upload size={14} />
            </button>
            <button onClick={handleExport} className="p-2 rounded-lg border border-white/10 hover:border-white/20 text-white/40 hover:text-white/60 transition-all" title="导出">
              <Download size={14} />
            </button>
            <button onClick={handleReset} className="p-2 rounded-lg border border-white/10 hover:border-red-500/20 text-white/40 hover:text-red-400/60 transition-all" title="重置">
              <RotateCcw size={14} />
            </button>
            <button onClick={handleSave} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${saved ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20"}`}>
              <span className="flex items-center gap-1.5">
                <Save size={12} />
                {saved ? "已保存" : "保存"}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <nav className="space-y-1 sticky top-8">
              {sections.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                    activeSection === s.key
                      ? "bg-white/[0.05] text-white/80 border border-white/10"
                      : "text-white/30 hover:text-white/50 hover:bg-white/[0.02]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-sm font-semibold text-white/60 mb-4">
                {sections.find((s) => s.key === activeSection)?.label}
              </h2>
              {sectionRenderers[activeSection]()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
