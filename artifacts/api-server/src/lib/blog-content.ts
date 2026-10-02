export type BlogSeed = {
  id: number;
  title: string;
  slug: string;
  keyword: string;
  metaDescription: string;
  content: string;
  readTime: number;
  category: string;
  tags: string[];
  views: number;
  socialContent: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  internalLinks: string[];
  publishedAt: string;
};

const seedMarkdown = (title: string, summary: string, focus: string) => `# ${title}

${summary}

## Why this matters

Most traders focus on the headline price and ignore the rules underneath it. In prop trading, the real edge is often in understanding the trading framework before you risk a single dollar.

${focus}

## What to check before you apply

- Compare the profit target and maximum drawdown for each challenge.
- Review the payout split and whether the firm pays weekly or biweekly.
- Confirm the platform support, allowed instruments, and any restricted strategies.
- Read the daily drawdown and news-trading rules before your first funded attempt.

## A practical approach

Start with one firm that fits your account size, instrument preference, and risk tolerance. Trade the plan, not the emotion. A smaller challenge with clearer rules often produces better outcomes than a larger account with tighter constraints.

## Final takeaway

The best prop firm for you is not always the biggest brand or the loudest ad. It is the one that matches your execution style, risk plan, and consistency goals.

If you want a cleaner path to funded trading, choose a firm with transparent rules, realistic targets, and a payout structure that supports steady performance.`;

export const FALLBACK_BLOGS: BlogSeed[] = [
  {
    id: 1,
    title: "Best Prop Firm Challenge Rules for Indian Traders in 2026",
    slug: "best-prop-firm-challenge-rules-for-indian-traders-2026",
    keyword: "best prop firm challenge rules",
    metaDescription: "Compare the most trader-friendly prop firm challenge rules for Indian traders and learn what matters before you pay for a funded account.",
    content: seedMarkdown(
      "Best Prop Firm Challenge Rules for Indian Traders in 2026",
      "Prop firm challenges look simple on the surface, but the fine print decides whether they are realistic or just expensive marketing.",
      "The best challenge rules are the ones that let you trade without unnecessary friction, clearly explain drawdown limits, and support a clean path to payouts.",
    ),
    readTime: 6,
    category: "Guide",
    tags: ["Prop firms", "Rules", "India", "Funding"],
    views: 1840,
    socialContent: {
      twitter: "New guide: how to find the best prop firm challenge rules for Indian traders.",
      linkedin: "A practical breakdown of the rules that matter most before you fund a prop firm account.",
    },
    internalLinks: ["/blog/best-prop-firm-challenge-rules-for-indian-traders-2026"],
    publishedAt: "2026-10-01T09:00:00.000Z",
  },
  {
    id: 2,
    title: "How to Choose a Prop Firm With the Best Payout Structure",
    slug: "how-to-choose-a-prop-firm-with-best-payout-structure",
    keyword: "prop firm payout structure",
    metaDescription: "Learn how to evaluate prop firm payout timing, profit split, and withdrawal fairness before locking in a funded account.",
    content: seedMarkdown(
      "How to Choose a Prop Firm With the Best Payout Structure",
      "A prop firm can look attractive on a homepage and still disappoint you when payouts become realistic.",
      "The smartest evaluation looks beyond the headline split and checks the real monthly cadence, account eligibility, and payout reliability.",
    ),
    readTime: 7,
    category: "Payouts",
    tags: ["Payouts", "Profit split", "Funding"],
    views: 1290,
    socialContent: {
      twitter: "Your payout structure matters more than a flashy homepage. Here is what to look for.",
    },
    internalLinks: ["/blog/how-to-choose-a-prop-firm-with-best-payout-structure"],
    publishedAt: "2026-09-30T08:30:00.000Z",
  },
  {
    id: 3,
    title: "Prop Firm Comparison: What Actually Matters Before You Pay",
    slug: "prop-firm-comparison-what-actually-matters-before-you-pay",
    keyword: "prop firm comparison",
    metaDescription: "Compare the real decision points that matter most when choosing a prop firm: rules, payout behavior, platform support, and consistency requirements.",
    content: seedMarkdown(
      "Prop Firm Comparison: What Actually Matters Before You Pay",
      "A prop firm comparison should be about operating reality, not marketing claims.",
      "When you compare firms, the real questions are whether the rules are transparent, whether payouts are realistic, and whether the trading conditions match your strategy.",
    ),
    readTime: 8,
    category: "Comparison",
    tags: ["Comparison", "Best prop firm", "Strategy"],
    views: 2140,
    socialContent: {
      twitter: "Compare the real rules, not the sales copy. Here is the practical way to choose a prop firm.",
    },
    internalLinks: ["/blog/prop-firm-comparison-what-actually-matters-before-you-pay"],
    publishedAt: "2026-09-27T10:15:00.000Z",
  },
];

export function getFallbackBlogSummaries() {
  return FALLBACK_BLOGS.map(({ id, title, slug, metaDescription, readTime, category, tags, views, publishedAt }) => ({
    id,
    title,
    slug,
    metaDescription,
    readTime,
    category,
    tags: JSON.stringify(tags),
    views,
    publishedAt,
  }));
}

export function getFallbackBlogBySlug(slug: string) {
  const blog = FALLBACK_BLOGS.find((entry) => entry.slug === slug);
  if (!blog) return null;
  return {
    ...blog,
    tags: JSON.stringify(blog.tags),
  };
}

export function createGeneratedFallbackBlog(keyword: string) {
  const cleanKeyword = keyword.trim() || "prop firm strategy";
  const title = cleanKeyword
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-guide`;
  const blog = {
    id: Date.now(),
    title: `${title} Guide`,
    slug,
    keyword: cleanKeyword,
    metaDescription: `A practical guide to ${cleanKeyword.toLowerCase()} and how to apply it while evaluating funded trading options.`,
    content: seedMarkdown(`${title} Guide`, `This article covers the most important factors behind ${cleanKeyword.toLowerCase()} for modern funded trading.` , `A strong strategy begins with clean rules, realistic expectations, and a clear understanding of the market environment before you trust a challenge or platform.`),
    readTime: 5,
    category: "Guide",
    tags: JSON.stringify([cleanKeyword, "Prop firms", "Trading"]),
    views: 0,
    socialContent: JSON.stringify({
      twitter: `A practical guide to ${cleanKeyword.toLowerCase()} for funded trading.`,
      linkedin: `Learn how ${cleanKeyword.toLowerCase()} fits into a clearer trading plan.`,
    }),
    internalLinks: JSON.stringify([`/blog/${slug}`]),
    publishedAt: new Date().toISOString(),
  };

  return blog;
}
