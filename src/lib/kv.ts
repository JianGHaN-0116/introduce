import { neon } from "@neondatabase/serverless";
import { siteConfig } from "@/data/siteConfig";

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return neon(databaseUrl);
}

export async function getConfig() {
  try {
    const sql = getSql();
    const rows = await sql`SELECT data FROM site_config WHERE id = 1`;
    if (rows.length > 0 && rows[0].data) {
      const data = typeof rows[0].data === "string" ? JSON.parse(rows[0].data) : rows[0].data;
      return { ...siteConfig, ...data };
    }
  } catch (e: any) {
    if (e.message?.includes("relation \"site_config\" does not exist")) {
      return siteConfig;
    }
    console.error("[getConfig]", e);
  }
  return siteConfig;
}

export async function saveConfig(config: Record<string, unknown>) {
  const sql = getSql();
  const json = JSON.stringify(config);

  await sql`
    CREATE TABLE IF NOT EXISTS site_config (
      id INTEGER PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    INSERT INTO site_config (id, data, updated_at)
    VALUES (1, ${json}, CURRENT_TIMESTAMP)
    ON CONFLICT (id)
    DO UPDATE SET data = EXCLUDED.data, updated_at = CURRENT_TIMESTAMP
  `;
}
