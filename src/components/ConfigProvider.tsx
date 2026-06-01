"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { siteConfig as defaultConfig } from "@/data/siteConfig";

type SiteConfig = typeof defaultConfig;

const ConfigContext = createContext<SiteConfig | null>(null);

export function useConfig() {
  return useContext(ConfigContext);
}

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object" && Object.keys(data).length > 0 && data.name) {
          setConfig(data as SiteConfig);
        } else {
          setConfig(null);
        }
      })
      .catch(() => setConfig(null));
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}
