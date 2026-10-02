import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { EcosystemBar } from '../components/EcosystemBar';
import { Navbar } from '../components/Navbar';
import { PageMetadata } from '@/components/PageMetadata';

const API_BASE = '/api';

interface SocialContent {
  twitter: string;
  reddit: string;
  quora: string;
  linkedIn: string;
  telegram: string;
}

interface BlogWithSocial {
  id: number;
  title: string;
  slug: string;
  keyword: string;
  metaDescription: string;
  readTime: number;
  category: string;
  tags: string;
  views: number;
  socialContent: string;
  internalLinks: string;
  publishedAt: string;
}

interface Stats {
  totalPosts: number;
  totalViews: number;
  totalInternalLinks: number;
  avgViewsPerPost: number;
}

const PLATFORMS: Array<{ key: keyof SocialContent; label: string; icon: string; color: string }> = [
  { key: 'twitter',  label: 'X / Twitter',  icon: '𝕏', color: '#000' },
  { key: 'reddit',   label: 'Reddit',        icon: '🔴', color: '#ff4500' },
  { key: 'quora',    label: 'Quora',         icon: '❓', color: '#a82400' },
  { key: 'linkedIn', label: 'LinkedIn',      icon: '💼', color: '#0077b5' },
  { key: 'telegram', label: 'Telegram',      icon: '✈️', color: '#2ca5e0' },
];

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button className="seo-copy-btn" onClick={handleCopy} title={`Copy ${label}`}>
      {copied ? '✅ Copied!' : `📋 Copy ${label}`}
    </button>
  );
}

function SocialPanel({ social, slug }: { social: SocialContent; slug: string }) {
  const [activeTab, setActiveTab] = useState<keyof SocialContent>('twitter');

  return (
    <div className="seo-social-panel">
      <div className="seo-social-tabs">
        {PLATFORMS.map(p => (
          <button
            key={p.key}
            className={`seo-social-tab${activeTab === p.key ? ' active' : ''}`}
            onClick={() => setActiveTab(p.key)}
            style={{ '--tab-color': p.color } as React.CSSProperties}
          >
            {p.icon} {p.label}
          </button>
        ))}
      </div>
      <div className="seo-social-content">
        <pre className="seo-social-text">{social[activeTab] || 'No content generated yet.'}</pre>
        <div className="seo-social-actions">
          <CopyButton text={social[activeTab] || ''} label={PLATFORMS.find(p => p.key === activeTab)?.label || ''} />
          {activeTab === 'twitter' && (
            <a
              className="seo-share-link"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent((social[activeTab] || '').substring(0, 280))}`}
              target="_blank" rel="noopener noreferrer"
            >
              Post on X →
            </a>
          )}
          {activeTab === 'reddit' && (
            <a
              className="seo-share-link"
              href="https://reddit.com/r/Forex/submit"
              target="_blank" rel="noopener noreferrer"
            >
              Post on Reddit →
            </a>
          )}
          {activeTab === 'telegram' && (
            <a
              className="seo-share-link"
              href={`https://t.me/share/url?url=${encodeURIComponent(`https://propfirmmarket.com/blog/${slug}`)}`}
              target="_blank" rel="noopener noreferrer"
            >
              Share on Telegram →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogDashCard({ blog, onNavigate }: { blog: BlogWithSocial; onNavigate: (s: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const tags: string[] = (() => { try { return JSON.parse(blog.tags); } catch { return []; } })();
  const links: string[] = (() => { try { return JSON.parse(blog.internalLinks); } catch { return []; } })();
  const social: SocialContent = (() => {
    try { return JSON.parse(blog.socialContent) as SocialContent; }
    catch { return { twitter: '', reddit: '', quora: '', linkedIn: '', telegram: '' }; }
  })();

  const hasSocial = Object.values(social).some(v => v.length > 0);

  return (
    <div className={`seo-blog-card${expanded ? ' expanded' : ''}`}>
      <div className="seo-blog-card-header" onClick={() => setExpanded(!expanded)}>
        <div className="seo-blog-card-meta">
          <span className="seo-blog-cat">{blog.category}</span>
          <span className="seo-blog-date">{new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <span className="seo-blog-views">👁 {blog.views}</span>
          <span className="seo-blog-links">🔗 {links.length} links</span>
          <span className="seo-blog-rt">⏱ {blog.readTime}m</span>
          {hasSocial && <span className="seo-badge-social">📤 Social ready</span>}
        </div>
        <div className="seo-blog-card-title-row">
          <h3 className="seo-blog-card-title">{blog.title}</h3>
          <button className="seo-expand-btn">{expanded ? '▲' : '▼'}</button>
        </div>
        <div className="seo-blog-keyword">🔑 {blog.keyword}</div>
      </div>

      {expanded && (
        <div className="seo-blog-card-body">
          <div className="seo-blog-links-list">
            <div className="seo-section-label">🔗 Internal Links Injected</div>
            {links.length > 0 ? (
              <ul className="seo-link-list">
                {links.map((l, i) => <li key={i}><code>{l}</code></li>)}
              </ul>
            ) : (
              <p className="seo-empty-text">No internal links (older post — regenerate to add links)</p>
            )}
          </div>

          <div className="seo-blog-meta-desc">
            <div className="seo-section-label">📝 Meta Description</div>
            <p>{blog.metaDescription}</p>
            <CopyButton text={blog.metaDescription} label="Meta" />
          </div>

          <div className="seo-blog-tags">
            {tags.map(t => <span key={t} className="blp-tag">{t}</span>)}
          </div>

          {hasSocial && (
            <div className="seo-social-section">
              <div className="seo-section-label">📤 Social Content (Ready to Post)</div>
              <SocialPanel social={social} slug={blog.slug} />
            </div>
          )}

          {!hasSocial && (
            <div className="seo-no-social">
              ℹ️ Social content not generated for this post. Regenerate newer posts to get social content.
            </div>
          )}

          <div className="seo-blog-actions">
            <button className="btn btn-o seo-action-btn" onClick={() => onNavigate(`/blog/${blog.slug}`)}>
              📖 Read Article
            </button>
            <a
              className="btn btn-o seo-action-btn"
              href={`/api/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔌 Raw JSON
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export function SeoDashboard() {
  const [blogs, setBlogs] = useState<BlogWithSocial[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [genKeyword, setGenKeyword] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [lastGenerated, setLastGenerated] = useState<{ title: string; url: string } | null>(null);
  const [error, setError] = useState('');
  const [, navigate] = useLocation();

  const fetchData = useCallback(async () => {
    try {
      const [blogsRes, statsRes, kwRes] = await Promise.all([
        fetch(`${API_BASE}/blogs`),
        fetch(`${API_BASE}/blog-stats`),
        fetch(`${API_BASE}/blog-keywords`),
      ]);
      const blogsData = await blogsRes.json() as { success: boolean; blogs: BlogWithSocial[] };
      const statsData = await statsRes.json() as { success: boolean; stats: Stats };
      const kwData = await kwRes.json() as { success: boolean; keywords: string[] };
      if (blogsData.success) setBlogs(blogsData.blogs);
      if (statsData.success) setStats(statsData.stats);
      if (kwData.success) setKeywords(kwData.keywords);
    } catch {
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleGenerate() {
    setGenerating(true);
    setError('');
    setLastGenerated(null);
    try {
      const res = await fetch(`${API_BASE}/blog/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(genKeyword ? { keyword: genKeyword } : {}),
      });
      const data = await res.json() as { success: boolean; blog: { title: string; slug: string }; url: string };
      if (data.success) {
        setLastGenerated({ title: data.blog.title, url: data.url });
        await fetchData();
      } else {
        setError('Generation failed. Try again.');
      }
    } catch {
      setError('Network error during generation.');
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <PageMetadata
        title="SEO Dashboard | PropFirmMarket"
        description="Internal SEO dashboard for reviewing content metadata, page structure and publishing details."
        url="https://propfirmmarket.in/seo-dashboard"
        noIndex
      />
      <EcosystemBar />
      <Navbar onNavTo={() => navigate('/')} onOpenAI={() => {}} onOpenSmartFinder={() => {}} />

      <div className="seo-dashboard">
        <div className="seo-dash-header">
          <div>
            <div className="seo-dash-eyebrow">🤖 Fully Automated · Daily at 06:00 IST</div>
            <h1 className="seo-dash-title">SEO Automation Dashboard</h1>
            <p className="seo-dash-sub">AI-generated blogs with internal links, social content, Reddit & Quora posts — all ready to copy.</p>
          </div>
          <button className="seo-nav-blog" onClick={() => navigate('/blog')}>📋 Public Blog →</button>
        </div>

        {stats && (
          <div className="seo-stats-grid">
            <div className="seo-stat-card">
              <div className="seo-stat-num">{stats.totalPosts}</div>
              <div className="seo-stat-label">Published Articles</div>
            </div>
            <div className="seo-stat-card">
              <div className="seo-stat-num">{stats.totalViews.toLocaleString()}</div>
              <div className="seo-stat-label">Total Views</div>
            </div>
            <div className="seo-stat-card">
              <div className="seo-stat-num">{stats.totalInternalLinks}</div>
              <div className="seo-stat-label">Internal Links Added</div>
            </div>
            <div className="seo-stat-card">
              <div className="seo-stat-num">{stats.avgViewsPerPost}</div>
              <div className="seo-stat-label">Avg Views / Post</div>
            </div>
          </div>
        )}

        <div className="seo-gen-box">
          <div className="seo-gen-title">✨ Generate New SEO Blog Post</div>
          <div className="seo-gen-row">
            <select
              className="seo-kw-select"
              value={genKeyword}
              onChange={e => setGenKeyword(e.target.value)}
            >
              <option value="">🎲 Auto-pick daily keyword</option>
              {keywords.map(kw => (
                <option key={kw} value={kw}>{kw}</option>
              ))}
            </select>
            <button
              className="seo-gen-btn"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? '⏳ Generating (1–2 min)...' : '🚀 Generate & Publish'}
            </button>
          </div>
          <div className="seo-gen-note">
            Automatically: writes 1200+ word article · adds internal links · generates social content for X, Reddit, Quora, LinkedIn, Telegram
          </div>
          {generating && (
            <div className="seo-gen-progress">
              <div className="seo-gen-step active">📝 Writing article...</div>
              <div className="seo-gen-step">🔗 Adding internal links...</div>
              <div className="seo-gen-step">📤 Generating social content...</div>
              <div className="seo-gen-step">💾 Publishing...</div>
            </div>
          )}
          {lastGenerated && (
            <div className="seo-gen-success">
              ✅ Published: <strong>{lastGenerated.title}</strong>
              <button className="seo-view-btn" onClick={() => navigate(lastGenerated.url)}>View →</button>
            </div>
          )}
          {error && <div className="seo-gen-error">⚠️ {error}</div>}
        </div>

        <div className="seo-pipeline-info">
          <div className="seo-pipeline-title">⚙️ Daily Automation Pipeline</div>
          <div className="seo-pipeline-steps">
            {[
              { icon: '🌅', label: '06:00 IST', desc: 'Cron triggers daily' },
              { icon: '🤖', label: 'AI Writes', desc: '1,200+ word SEO article' },
              { icon: '🔗', label: 'Links Added', desc: 'Internal links auto-injected' },
              { icon: '📤', label: 'Social Ready', desc: 'X, Reddit, Quora, LinkedIn, Telegram' },
              { icon: '🚀', label: 'Published', desc: 'Live at /blog/[slug]' },
            ].map((step, i) => (
              <div key={i} className="seo-pipeline-step">
                <div className="seo-pipeline-icon">{step.icon}</div>
                <div className="seo-pipeline-step-label">{step.label}</div>
                <div className="seo-pipeline-step-desc">{step.desc}</div>
                {i < 4 && <div className="seo-pipeline-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="blp-loading"><div className="blp-spinner" /><span>Loading posts...</span></div>
        ) : (
          <div className="seo-posts-section">
            <div className="seo-posts-header">
              <div className="seo-posts-title">📚 All Published Posts ({blogs.length})</div>
              <div className="seo-posts-hint">Click any post to expand social content & copy ready-to-post text</div>
            </div>
            {blogs.length === 0 ? (
              <div className="blp-empty">
                <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No posts yet</div>
                <p style={{ color: 'var(--t2)' }}>Click "Generate & Publish" above to create your first SEO post.</p>
              </div>
            ) : (
              <div className="seo-posts-list">
                {blogs.map(blog => (
                  <BlogDashCard key={blog.id} blog={blog} onNavigate={navigate} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
