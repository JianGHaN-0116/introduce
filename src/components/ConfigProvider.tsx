"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { siteConfig as defaultConfig } from "@/data/siteConfig";

type SiteConfig = typeof defaultConfig;

const ConfigContext = createContext<SiteConfig>(defaultConfig);

export function useConfig() {
  return useContext(ConfigContext);
}

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setConfig({ ...defaultConfig, ...data });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}
