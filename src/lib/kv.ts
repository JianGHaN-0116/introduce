import { siteConfig } from "@/data/siteConfig";

const CONFIG_PATH = "src/data/siteConfig.json";

function getRepoInfo() {
  const repo = process.env.GITHUB_REPO || "JianGHaN-0116/introduce";
  const [owner, name] = repo.split("/");
  return { owner, name, repo };
}

function getGitHubToken() {
  return process.env.GITHUB_TOKEN || "";
}

export async function getConfig() {
  try {
    const { owner, name } = getRepoInfo();
    const token = getGitHubToken();
    
    if (!token) {
      return siteConfig;
    }

    const res = await fetch(
      `https://api.github.com/repos/${owner}/${name}/contents/${CONFIG_PATH}?ref=main`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return siteConfig;
    }

    const data = await res.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    const parsed = JSON.parse(content);
    return { ...siteConfig, ...parsed };
  } catch {
    return siteConfig;
  }
}

export async function saveConfig(config: Record<string, unknown>) {
  const { owner, name } = getRepoInfo();
  const token = getGitHubToken();

  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }

  // Get current file to obtain sha
  const getRes = await fetch(
    `https://api.github.com/repos/${owner}/${name}/contents/${CONFIG_PATH}?ref=main`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!getRes.ok) {
    const err = await getRes.text();
    throw new Error(`Failed to get file: ${err}`);
  }

  const fileData = await getRes.json();
  const sha = fileData.sha;

  // Update file
  const content = JSON.stringify(config, null, 2);
  const encodedContent = Buffer.from(content).toString("base64");

  const putRes = await fetch(
    `https://api.github.com/repos/${owner}/${name}/contents/${CONFIG_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Update site config via admin panel",
        content: encodedContent,
        sha,
        branch: "main",
      }),
    }
  );

  if (!putRes.ok) {
    const err = await putRes.text();
    throw new Error(`Failed to save config: ${err}`);
  }

  return await putRes.json();
}
