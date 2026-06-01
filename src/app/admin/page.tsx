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
  Lock,
  LogOut,
  User,
  KeyRound,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { LangProvider, useLang } from "@/components/LangProvider";

type SectionKey =
  | "basic"
  | "about"
  | "research"
  | "projects"
  | "academic"
  | "experience"
  | "skills";

function AdminContent() {
  const { t } = useLang();

  const sections: { key: SectionKey; label: string }[] = [
    { key: "basic", label: t.admin.sections.basic },
    { key: "about", label: t.admin.sections.about },
    { key: "research", label: t.admin.sections.research },
    { key: "projects", label: t.admin.sections.projects },
    { key: "academic", label: t.admin.sections.academic },
    { key: "experience", label: t.admin.sections.experience },
    { key: "skills", label: t.admin.sections.skills },
  ];

  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [token, setToken] = useState("");
  const [config, setConfig] = useState(JSON.parse(JSON.stringify(defaultConfig)));
  const [activeSection, setActiveSection] = useState<SectionKey>("basic");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const storedToken = sessionStorage.getItem("admin_token");
    if (storedToken) {
      setToken(storedToken);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetch("/api/config")
        .then((res) => res.json())
        .then((data) => {
          if (data && typeof data === "object" && data.name) {
            setConfig({ ...JSON.parse(JSON.stringify(defaultConfig)), ...data });
          } else {
            setConfig({ ...JSON.parse(JSON.stringify(defaultConfig)), name: "", email: "", github: "" });
          }
        })
        .catch(() => {
          setConfig({ ...JSON.parse(JSON.stringify(defaultConfig)), name: "", email: "", github: "" });
        });
    }
  }, [authenticated]);

  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        setAuthenticated(true);
        setLoginError(false);
        sessionStorage.setItem("admin_token", data.token);
      } else {
        setLoginError(true);
      }
    } catch {
      setLoginError(true);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setToken("");
    sessionStorage.removeItem("admin_token");
    setUsername("");
    setPassword("");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ config }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data.error || `HTTP ${res.status}`;
        alert(`保存失败: ${msg}`);
        if (res.status === 401) handleLogout();
      }
    } catch (err: any) {
      alert(`保存失败: ${err.message || "网络错误"}`);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("确定要重置为默认配置吗？")) {
      setConfig(JSON.parse(JSON.stringify(defaultConfig)));
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

  const inputCls =
    "w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-100 transition-colors";
  const textareaCls =
    "w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-100 resize-none transition-colors";
  const smallInputCls =
    "w-full bg-white border border-zinc-200 rounded px-2 py-1.5 text-xs text-zinc-700 focus:outline-none focus:border-cyan-400 transition-colors";
  const smallTextareaCls =
    "w-full bg-white border border-zinc-200 rounded px-2 py-1.5 text-xs text-zinc-700 focus:outline-none focus:border-cyan-400 resize-none transition-colors";

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center mx-auto mb-6">
              <Lock size={22} className="text-cyan-600" />
            </div>
            <h1 className="text-lg font-bold text-zinc-800 mb-1">
              {t.admin.login.title}
            </h1>
            <p className="text-xs text-zinc-400 mb-6">
              {t.admin.login.hint}
            </p>

            <div className="space-y-3">
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setLoginError(false); }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder={t.admin.login.username}
                  className="w-full bg-white border border-zinc-200 rounded-lg pl-9 pr-4 py-3 text-sm text-zinc-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-100 transition-colors"
                />
              </div>
              <div className="relative">
                <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder={t.admin.login.password}
                  className="w-full bg-white border border-zinc-200 rounded-lg pl-9 pr-10 py-3 text-sm text-zinc-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-100 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {loginError && (
                <p className="text-xs text-red-500">{t.admin.login.error}</p>
              )}
              <button
                onClick={handleLogin}
                disabled={loginLoading}
                className="w-full py-3 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loginLoading && <Loader2 size={14} className="animate-spin" />}
                {t.admin.login.button}
              </button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              ← {t.nav.home}
            </a>
          </div>
        </div>
      </div>
    );
  }

  const renderBasicSection = () => (
    <div className="space-y-4">
      {[
        { key: "name", label: "姓名 / Name" },
        { key: "title", label: "头衔 / Title" },
        { key: "subtitle", label: "副标题 / Subtitle" },
        { key: "heroDescription", label: "个人简介 / Bio" },
        { key: "email", label: "邮箱 / Email" },
        { key: "github", label: "GitHub URL" },
        { key: "githubUsername", label: "GitHub Username" },
        { key: "slogan", label: "Slogan" },
        { key: "avatar", label: "头像 URL / Avatar URL" },
      ].map(({ key, label }) => (
        <div key={key}>
          <label className="block text-xs text-zinc-500 mb-1">{label}</label>
          {key === "heroDescription" ? (
            <textarea
              value={config[key] as string}
              onChange={(e) => updateField(key, e.target.value)}
              rows={3}
              className={textareaCls}
            />
          ) : (
            <input
              type="text"
              value={config[key] as string}
              onChange={(e) => updateField(key, e.target.value)}
              className={inputCls}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderAboutSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-zinc-500 mb-1">背景介绍 / Background</label>
        <textarea
          value={config.about.background}
          onChange={(e) => updateField("about.background", e.target.value)}
          rows={3}
          className={textareaCls}
        />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-1">研究兴趣 / Interests</label>
        <textarea
          value={config.about.interests}
          onChange={(e) => updateField("about.interests", e.target.value)}
          rows={3}
          className={textareaCls}
        />
      </div>
      <div>
        <label className="block text-xs text-zinc-500 mb-2">卡片 / Cards</label>
        {config.about.cards.map((card: { title: string; description: string; icon: string }, i: number) => (
          <div key={i} className="mb-3 p-3 border border-zinc-200 rounded-lg bg-zinc-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">卡片 {i + 1}</span>
              <button onClick={() => removeItem("about.cards", i)} className="text-red-400 hover:text-red-500">
                <Trash2 size={12} />
              </button>
            </div>
            <input
              type="text"
              value={card.title}
              onChange={(e) => updateField(`about.cards.${i}.title`, e.target.value)}
              placeholder="标题"
              className={`${smallInputCls} mb-2`}
            />
            <textarea
              value={card.description}
              onChange={(e) => updateField(`about.cards.${i}.description`, e.target.value)}
              placeholder="描述"
              rows={2}
              className={smallTextareaCls}
            />
          </div>
        ))}
        <button
          onClick={() => addItem("about.cards", { title: "新卡片", description: "描述", icon: "flask" })}
          className="text-xs text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
        >
          <Plus size={12} /> {t.admin.add}
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
            className="flex items-center justify-between p-3 border border-zinc-200 rounded-lg cursor-pointer hover:border-zinc-300 bg-white"
            onClick={() => toggleExpand(`${path}.${i}`)}
          >
            <div className="flex items-center gap-2">
              {expandedItems[`${path}.${i}`] ? <ChevronDown size={12} className="text-zinc-400" /> : <ChevronRight size={12} className="text-zinc-400" />}
              <span className="text-xs text-zinc-600">
                {String(item.title || item.name || `项目 ${i + 1}`)}
              </span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); removeItem(path, i); }}
              className="text-red-400 hover:text-red-500"
            >
              <Trash2 size={12} />
            </button>
          </div>
          {expandedItems[`${path}.${i}`] && (
            <div className="p-3 border border-zinc-200 border-t-0 rounded-b-lg bg-zinc-50">
              {renderItem(item, i)}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => addItem(path, templates)}
        className="text-xs text-cyan-600 hover:text-cyan-700 flex items-center gap-1 mt-2"
      >
        <Plus size={12} /> {t.admin.add}
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
        <input type="text" value={String(item.title)} onChange={(e) => updateField(`research.${i}.title`, e.target.value)} placeholder="标题" className={smallInputCls} />
        <textarea value={String(item.description)} onChange={(e) => updateField(`research.${i}.description`, e.target.value)} placeholder="描述" rows={2} className={smallTextareaCls} />
        <input type="text" value={((item.tags as string[]) || []).join(", ")} onChange={(e) => updateField(`research.${i}.tags`, e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} placeholder="标签（逗号分隔）" className={smallInputCls} />
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
        <input type="text" value={String(item.name)} onChange={(e) => updateField(`projects.${i}.name`, e.target.value)} placeholder="项目名" className={smallInputCls} />
        <textarea value={String(item.description)} onChange={(e) => updateField(`projects.${i}.description`, e.target.value)} placeholder="描述" rows={2} className={smallTextareaCls} />
        <input type="text" value={((item.techStack as string[]) || []).join(", ")} onChange={(e) => updateField(`projects.${i}.techStack`, e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} placeholder="技术栈（逗号分隔）" className={smallInputCls} />
        <input type="text" value={String(item.highlights || "")} onChange={(e) => updateField(`projects.${i}.highlights`, e.target.value)} placeholder="亮点" className={smallInputCls} />
        <input type="text" value={String(item.github || "")} onChange={(e) => updateField(`projects.${i}.github`, e.target.value)} placeholder="GitHub 链接" className={smallInputCls} />
        <input type="text" value={String(item.demo || "")} onChange={(e) => updateField(`projects.${i}.demo`, e.target.value)} placeholder="Demo 链接" className={smallInputCls} />
      </div>
    ));

  const renderAcademicSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-zinc-500 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          论文
        </h3>
        {renderArraySection("publications", config.publications, {
          title: "新论文",
          venue: "会议/期刊",
          status: "preprint",
          contribution: "贡献说明",
        }, (item, i) => (
          <div className="space-y-2">
            <input type="text" value={String(item.title)} onChange={(e) => updateField(`publications.${i}.title`, e.target.value)} placeholder="论文标题" className={smallInputCls} />
            <input type="text" value={String(item.venue)} onChange={(e) => updateField(`publications.${i}.venue`, e.target.value)} placeholder="期刊/会议" className={smallInputCls} />
            <select value={String(item.status)} onChange={(e) => updateField(`publications.${i}.status`, e.target.value)} className={smallInputCls}>
              <option value="published">Published</option>
              <option value="review">Under Review</option>
              <option value="preprint">Preprint</option>
            </select>
            <textarea value={String(item.contribution)} onChange={(e) => updateField(`publications.${i}.contribution`, e.target.value)} placeholder="贡献说明" rows={2} className={smallTextareaCls} />
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-zinc-500 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          专利
        </h3>
        {renderArraySection("patents", config.patents, {
          title: "新专利",
          number: "专利号",
          status: "pending",
          description: "描述",
        }, (item, i) => (
          <div className="space-y-2">
            <input type="text" value={String(item.title)} onChange={(e) => updateField(`patents.${i}.title`, e.target.value)} placeholder="专利名称" className={smallInputCls} />
            <input type="text" value={String(item.number || "")} onChange={(e) => updateField(`patents.${i}.number`, e.target.value)} placeholder="专利号" className={smallInputCls} />
            <select value={String(item.status)} onChange={(e) => updateField(`patents.${i}.status`, e.target.value)} className={smallInputCls}>
              <option value="granted">Granted / 已授权</option>
              <option value="applied">Applied / 申请中</option>
              <option value="pending">Pending / 审查中</option>
            </select>
            <textarea value={String(item.description || "")} onChange={(e) => updateField(`patents.${i}.description`, e.target.value)} placeholder="描述" rows={2} className={smallTextareaCls} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperienceSection = () =>
    renderArraySection("experience", config.experience, {
      year: "2024 - Present",
      title: "新经历",
      organization: "组织",
      description: "描述",
    }, (item, i) => (
      <div className="space-y-2">
        <input type="text" value={String(item.year)} onChange={(e) => updateField(`experience.${i}.year`, e.target.value)} placeholder="时间" className={smallInputCls} />
        <input type="text" value={String(item.title)} onChange={(e) => updateField(`experience.${i}.title`, e.target.value)} placeholder="标题" className={smallInputCls} />
        <input type="text" value={String(item.organization)} onChange={(e) => updateField(`experience.${i}.organization`, e.target.value)} placeholder="组织" className={smallInputCls} />
        <textarea value={String(item.description)} onChange={(e) => updateField(`experience.${i}.description`, e.target.value)} placeholder="描述" rows={2} className={smallTextareaCls} />
      </div>
    ));

  const renderSkillsSection = () =>
    renderArraySection("skills", config.skills, {
      category: "新分类",
      items: ["Skill1"],
    }, (item, i) => (
      <div className="space-y-2">
        <input type="text" value={String(item.category)} onChange={(e) => updateField(`skills.${i}.category`, e.target.value)} placeholder="分类名" className={smallInputCls} />
        <input type="text" value={((item.items as string[]) || []).join(", ")} onChange={(e) => updateField(`skills.${i}.items`, e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} placeholder="技能（逗号分隔）" className={smallInputCls} />
      </div>
    ));

  const sectionRenderers: Record<SectionKey, () => React.ReactNode> = {
    basic: renderBasicSection,
    about: renderAboutSection,
    research: renderResearchSection,
    projects: renderProjectsSection,
    academic: renderAcademicSection,
    experience: renderExperienceSection,
    skills: renderSkillsSection,
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-700">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a href="/" className="text-zinc-400 hover:text-zinc-600 transition-colors">
              <ArrowLeft size={18} />
            </a>
            <div>
              <h1 className="text-xl font-bold text-zinc-800">{t.admin.title}</h1>
              <p className="text-xs text-zinc-400">{t.admin.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleImport} className="p-2 rounded-lg border border-zinc-200 hover:border-zinc-300 text-zinc-400 hover:text-zinc-600 transition-all bg-white" title={t.admin.import}>
              <Upload size={14} />
            </button>
            <button onClick={handleExport} className="p-2 rounded-lg border border-zinc-200 hover:border-zinc-300 text-zinc-400 hover:text-zinc-600 transition-all bg-white" title={t.admin.export}>
              <Download size={14} />
            </button>
            <button onClick={handleReset} className="p-2 rounded-lg border border-zinc-200 hover:border-red-300 text-zinc-400 hover:text-red-500 transition-all bg-white" title={t.admin.reset}>
              <RotateCcw size={14} />
            </button>
            <button onClick={handleSave} disabled={saving} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${saved ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-50"}`}>
              <span className="flex items-center gap-1.5">
                {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                {saved ? t.admin.saved : t.admin.save}
              </span>
            </button>
            <button onClick={handleLogout} className="p-2 rounded-lg border border-zinc-200 hover:border-red-300 text-zinc-400 hover:text-red-500 transition-all bg-white" title="Logout">
              <LogOut size={14} />
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
                      ? "bg-white text-zinc-800 border border-zinc-200 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-600 hover:bg-white/50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-sm font-semibold text-zinc-600 mb-4">
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

export default function AdminPage() {
  return (
    <LangProvider>
      <AdminContent />
    </LangProvider>
  );
}
