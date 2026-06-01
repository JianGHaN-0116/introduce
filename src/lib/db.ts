import { neon } from "@neondatabase/serverless";

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return neon(databaseUrl);
}

export async function initDb() {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS site_profile (
      id INTEGER PRIMARY KEY DEFAULT 1,
      name TEXT DEFAULT '',
      title TEXT DEFAULT '',
      subtitle TEXT DEFAULT '',
      hero_description TEXT DEFAULT '',
      email TEXT DEFAULT '',
      github TEXT DEFAULT '',
      github_username TEXT DEFAULT '',
      slogan TEXT DEFAULT '',
      avatar TEXT DEFAULT '',
      about_background TEXT DEFAULT '',
      about_interests TEXT DEFAULT '',
      about_cards JSONB DEFAULT '[]',
      research JSONB DEFAULT '[]',
      projects JSONB DEFAULT '[]',
      publications JSONB DEFAULT '[]',
      patents JSONB DEFAULT '[]',
      experience JSONB DEFAULT '[]',
      skills JSONB DEFAULT '[]',
      nav JSONB DEFAULT '[]',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    INSERT INTO site_profile (id) VALUES (1)
    ON CONFLICT (id) DO NOTHING
  `;
}

export async function getConfig() {
  const sql = getSql();
  await initDb();

  const rows = await sql`SELECT * FROM site_profile WHERE id = 1`;
  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    name: row.name,
    title: row.title,
    subtitle: row.subtitle,
    heroDescription: row.hero_description,
    email: row.email,
    github: row.github,
    githubUsername: row.github_username,
    slogan: row.slogan,
    avatar: row.avatar,
    about: {
      background: row.about_background,
      interests: row.about_interests,
      cards: parseJson(row.about_cards),
    },
    research: parseJson(row.research),
    projects: parseJson(row.projects),
    publications: parseJson(row.publications),
    patents: parseJson(row.patents),
    experience: parseJson(row.experience),
    skills: parseJson(row.skills),
    nav: parseJson(row.nav),
  };
}

export async function saveConfig(config: Record<string, unknown>) {
  const sql = getSql();
  await initDb();

  const about = (config.about || {}) as Record<string, unknown>;

  await sql`
    UPDATE site_profile SET
      name = ${String(config.name || '')},
      title = ${String(config.title || '')},
      subtitle = ${String(config.subtitle || '')},
      hero_description = ${String(config.heroDescription || '')},
      email = ${String(config.email || '')},
      github = ${String(config.github || '')},
      github_username = ${String(config.githubUsername || '')},
      slogan = ${String(config.slogan || '')},
      avatar = ${String(config.avatar || '')},
      about_background = ${String(about.background || '')},
      about_interests = ${String(about.interests || '')},
      about_cards = ${JSON.stringify(about.cards || [])},
      research = ${JSON.stringify(config.research || [])},
      projects = ${JSON.stringify(config.projects || [])},
      publications = ${JSON.stringify(config.publications || [])},
      patents = ${JSON.stringify(config.patents || [])},
      experience = ${JSON.stringify(config.experience || [])},
      skills = ${JSON.stringify(config.skills || [])},
      nav = ${JSON.stringify(config.nav || [])},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `;
}

function parseJson(value: unknown): unknown[] {
  if (!value) return [];
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  }
  if (Array.isArray(value)) return value;
  return [];
}
