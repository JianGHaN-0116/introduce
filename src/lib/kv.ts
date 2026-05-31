import { siteConfig } from "@/data/siteConfig";

const KV_KEY = "site_config";

async function getEdgeConfig() {
  try {
    const edgeConfig = await import("@vercel/edge-config");
    return edgeConfig;
  } catch {
    return null;
  }
}

export async function getConfig() {
  const ec = await getEdgeConfig();
  if (!ec) return siteConfig;
  try {
    const stored = await ec.get(KV_KEY);
    if (stored && typeof stored === "object") {
      return { ...siteConfig, ...(stored as Record<string, unknown>) };
    }
  } catch {}
  return siteConfig;
}

export async function saveConfig(config: Record<string, unknown>) {
  const edgeConfigId = process.env.EDGE_CONFIG_ID;
  const vercelToken = process.env.VERCEL_API_TOKEN;

  if (!edgeConfigId || !vercelToken) {
    throw new Error("EDGE_CONFIG_ID and VERCEL_API_TOKEN environment variables are required");
  }

  const res = await fetch(
    `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            operation: "upsert",
            key: KV_KEY,
            value: config,
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to save config: ${err}`);
  }
}
