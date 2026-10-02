import OpenAI from "openai";

const client = process.env.AI_INTEGRATIONS_OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
      baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
    })
  : null;

export const SEO_KEYWORDS = [
  "best prop firms 2026",
  "cheap prop firm accounts India",
  "FTMO vs FundingPips comparison",
  "how to pass prop firm challenge",
  "best prop firms for beginners",
  "instant funding prop firms",
  "forex prop firm comparison India",
  "prop firm challenge rules explained",
  "highest payout prop firms 2026",
  "prop firm UPI payment India",
  "funded trader secrets tips",
  "best prop firm for scalping",
  "prop firm drawdown rules explained",
  "Funded Next review 2026",
  "True Forex Funds review India",
  "prop firm vs stock trading India",
  "how to get funded as a trader India",
  "best 1-step prop firm challenges",
  "prop firm profit split comparison",
  "trading psychology for prop firm challenges",
];

export const INTERNAL_LINKS = [
  { anchor: "best prop firms in India", url: "/best-prop-firms" },
  { anchor: "compare all prop firms", url: "/best-prop-firms" },
  { anchor: "top rated prop firms", url: "/best-prop-firms" },
  { anchor: "FTMO vs FundingPips", url: "/ftmo-vs-fundingpips" },
  { anchor: "FTMO comparison", url: "/ftmo-vs-fundingpips" },
  { anchor: "prop firm comparison tool", url: "/best-prop-firms" },
];

export function pickDailyKeyword(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return SEO_KEYWORDS[dayOfYear % SEO_KEYWORDS.length];
}

export function pickRandomKeyword(): string {
  return SEO_KEYWORDS[Math.floor(Math.random() * SEO_KEYWORDS.length)];
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 80);
}

function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(4, Math.ceil(words / 200));
}

function extractCategory(keyword: string): string {
  if (keyword.includes("vs") || keyword.includes("comparison")) return "Comparison";
  if (keyword.includes("beginner") || keyword.includes("what is") || keyword.includes("guide")) return "Beginner";
  if (keyword.includes("how to") || keyword.includes("pass") || keyword.includes("tips")) return "Strategy";
  if (keyword.includes("cheap") || keyword.includes("budget") || keyword.includes("under")) return "Budget";
  if (keyword.includes("payout") || keyword.includes("withdraw")) return "Payouts";
  return "Guide";
}

function extractTags(keyword: string): string[] {
  const tags: string[] = [];
  if (keyword.includes("India") || keyword.includes("INR") || keyword.includes("UPI")) tags.push("India");
  if (keyword.includes("FTMO")) tags.push("FTMO");
  if (keyword.includes("Funded Next") || keyword.includes("FundingPips")) tags.push("Funded Next");
  if (keyword.includes("beginner")) tags.push("Beginners");
  if (keyword.includes("forex")) tags.push("Forex");
  if (keyword.includes("futures") || keyword.includes("scalping")) tags.push("Strategy");
  if (tags.length === 0) tags.push("Prop Firms", "Trading");
  return tags;
}

export interface RelatedBlog {
  slug: string;
  title: string;
}

export function addInternalLinks(content: string, relatedBlogs: RelatedBlog[]): { content: string; usedLinks: string[] } {
  let updated = content;
  const usedLinks: string[] = [];
  let insertCount = 0;

  const lines = updated.split("\n");
  const processedLines = lines.map((line) => {
    if (insertCount >= 2) return line;
    if (!line.startsWith("##") && !line.startsWith("#") && line.trim().length > 60) {
      const link = INTERNAL_LINKS[insertCount];
      if (link && !line.includes(link.url)) {
        const mdLink = `[${link.anchor}](${link.url})`;
        const insertAt = Math.floor(line.length * 0.6);
        const spaceIdx = line.lastIndexOf(" ", insertAt);
        if (spaceIdx > 20) {
          const newLine = `${line.slice(0, spaceIdx)} — check out our ${mdLink} for more details.${line.slice(spaceIdx)}`;
          usedLinks.push(link.url);
          insertCount++;
          return newLine;
        }
      }
    }
    return line;
  });

  updated = processedLines.join("\n");

  if (relatedBlogs.length > 0) {
    const relatedSection = [
      "",
      "---",
      "",
      "## 📚 Related Articles",
      "",
      ...relatedBlogs.slice(0, 3).map(b => `- [${b.title}](/blog/${b.slug})`),
      "",
      `> 🔍 Want to find your perfect prop firm? Use our free **[prop firm comparison tool](/best-prop-firms)** — compare 40+ verified firms instantly.`,
      "",
    ].join("\n");
    updated += relatedSection;
    relatedBlogs.slice(0, 3).forEach(b => usedLinks.push(`/blog/${b.slug}`));
  }

  return { content: updated, usedLinks };
}

export interface SocialContent {
  twitter: string;
  reddit: string;
  quora: string;
  linkedIn: string;
  telegram: string;
}

export async function generateSocialContent(
  title: string,
  slug: string,
  keyword: string,
  metaDescription: string,
): Promise<SocialContent> {
  if (!client) {
    const url = `https://propfirmmarket.com/blog/${slug}`;
    return {
      twitter: `🚀 New guide: ${title}\n\n${metaDescription}\n\n🔗 ${url}\n\n#PropFirm #Trading #India`,
      reddit: `I just published a detailed guide on ${keyword}. Would love feedback from experienced traders: ${url}`,
      quora: `Here are the key insights on ${keyword} for 2026. I’ve put together a practical guide covering everything Indian traders need to know: ${url}`,
      linkedIn: `📊 New article: ${title}\n\n${metaDescription}\n\n${url}\n\n#PropFirm #Trading #FinancialMarkets`,
      telegram: `📝 New guide dropped: "${title}" — ${url}`,
    };
  }

  const url = `https://propfirmmarket.com/blog/${slug}`;

  const prompt = `You are a social media expert for a prop trading website targeting Indian traders.

Generate platform-specific content for this new blog post:
- Title: "${title}"
- Keyword: "${keyword}"  
- Description: "${metaDescription}"
- URL: ${url}

Generate in this EXACT format (keep each section short and punchy):

TWITTER:
[2-3 sentences max, use 2-3 relevant emojis, include keyword naturally, end with the URL, add 3 hashtags like #PropFirm #Trading #India]

REDDIT:
[Write as a genuine Reddit post for r/Forex or r/DayTrading. Conversational tone. 3-4 sentences. Ask for feedback. Include URL naturally. No hashtags.]

QUORA:
[Write as a helpful Quora answer to a question about ${keyword}. 4-5 sentences. Professional. Include URL as "read more" link. Start with a direct answer.]

LINKEDIN:
[Professional 3-4 sentence post. Include key insight from the article. Include URL. 2-3 hashtags.]

TELEGRAM:
[Short punchy message for a trading Telegram channel. 2 sentences. Include emoji. Include URL.]`;

  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
    messages: [{ role: "user", content: prompt }],
    max_completion_tokens: 1500,
    stream: true,
  });

  let raw = "";
  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) raw += content;
  }

  function extractSection(text: string, label: string, nextLabel?: string): string {
    const start = text.indexOf(`${label}:`);
    if (start === -1) return "";
    const contentStart = start + label.length + 1;
    const end = nextLabel ? text.indexOf(`${nextLabel}:`, contentStart) : text.length;
    return text.slice(contentStart, end === -1 ? text.length : end).trim();
  }

  return {
    twitter: extractSection(raw, "TWITTER", "REDDIT") ||
      `🚀 New guide: ${title}\n\n${metaDescription}\n\n🔗 ${url}\n\n#PropFirm #Trading #India`,
    reddit: extractSection(raw, "REDDIT", "QUORA") ||
      `I just published a detailed guide on ${keyword}. Would love feedback from experienced traders: ${url}`,
    quora: extractSection(raw, "QUORA", "LINKEDIN") ||
      `Here are the key insights on ${keyword} for 2026. I've put together a comprehensive guide covering everything Indian traders need to know: ${url}`,
    linkedIn: extractSection(raw, "LINKEDIN", "TELEGRAM") ||
      `📊 New article: ${title}\n\n${metaDescription}\n\n${url}\n\n#PropFirm #Trading #FinancialMarkets`,
    telegram: extractSection(raw, "TELEGRAM") ||
      `📝 New guide dropped: "${title}" — ${url}`,
  };
}

export interface GeneratedBlog {
  title: string;
  slug: string;
  keyword: string;
  metaDescription: string;
  content: string;
  readTime: number;
  category: string;
  tags: string;
}

export async function generateBlogPost(keyword: string): Promise<GeneratedBlog> {
  if (!client) {
    const safeKeyword = (keyword || "prop firm comparison").trim();
    const title = `${safeKeyword.replace(/\b\w/g, (c) => c.toUpperCase())} Guide`;
    const slug = slugify(title);
    const metaDescription = `Everything you need to know about ${safeKeyword} for Indian traders in 2026.`;
    const content = `## ${title}\n\n${metaDescription}\n\n## Why this matters\n\nThe best ${safeKeyword.toLowerCase()} strategy starts with clean rules and realistic expectations. Traders often get distracted by flashy promotions, but the real edge comes from understanding the conditions behind the offer.\n\n## What to check before you commit\n\n- Compare the profit target and drawdown rules\n- Review the payout structure and withdrawal timing\n- Check platform support, allowed instruments, and strategy restrictions\n- Think about the kind of trader you are before choosing a firm\n\n## Final takeaway\n\nChoose the prop firm that fits your style, risk tolerance, and preferred execution model. Not every brand is built for every trader.`;
    return {
      title,
      slug,
      keyword: safeKeyword,
      metaDescription,
      content,
      readTime: 5,
      category: extractCategory(safeKeyword.toLowerCase()),
      tags: JSON.stringify(extractTags(safeKeyword)),
    };
  }

  const prompt = `You are an expert SEO content writer for a prop firm comparison website targeting Indian traders.

Write a comprehensive 1200-word SEO article about: "${keyword}"

IMPORTANT FORMATTING RULES:
- Write in clean Markdown format
- Use ## for main headings, ### for sub-headings
- The article must include: Introduction, What Is It, Top 5 Options/Tips, Comparison Table (use markdown table), Pros and Cons, Conclusion, FAQ (3 questions)
- Make it simple, human, conversational, and SEO-optimized
- Mention India-specific details where relevant (UPI, INR prices, Indian traders)
- Include the keyword naturally 4-6 times in the text
- Keep sentences short and punchy
- Do NOT use filler phrases like "In this article we will..."
- Start with a compelling hook sentence

First line of your response must be the article TITLE (no # symbol, just plain text).
Second line must be the META DESCRIPTION (under 160 chars, plain text, include keyword).
Then a blank line.
Then the full article in Markdown.`;

  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
    messages: [{ role: "user", content: prompt }],
    max_completion_tokens: 8192,
    stream: true,
  });

  let raw = "";
  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) raw += content;
  }
  const lines = raw.split("\n");

  let title = "";
  let metaDescription = "";
  let contentLines: string[] = [];
  let lineIdx = 0;

  while (lineIdx < lines.length && !lines[lineIdx].trim()) lineIdx++;
  if (lineIdx < lines.length) {
    title = lines[lineIdx].replace(/^#+ /, "").trim();
    lineIdx++;
  }

  while (lineIdx < lines.length && !lines[lineIdx].trim()) lineIdx++;
  if (lineIdx < lines.length && lines[lineIdx].trim().length < 300 && !lines[lineIdx].startsWith("#")) {
    metaDescription = lines[lineIdx].trim();
    lineIdx++;
  }

  while (lineIdx < lines.length && !lines[lineIdx].trim()) lineIdx++;
  contentLines = lines.slice(lineIdx);

  if (!title) title = `Complete Guide: ${keyword}`;
  if (!metaDescription) metaDescription = `Everything you need to know about ${keyword}. India-focused guide for 2026.`;
  const content = contentLines.join("\n").trim();

  const slug = slugify(title);
  const readTime = estimateReadTime(content);
  const category = extractCategory(keyword.toLowerCase());
  const tags = JSON.stringify(extractTags(keyword));

  return { title, slug, keyword, metaDescription, content, readTime, category, tags };
}
