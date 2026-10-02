import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { EcosystemBar } from '../components/EcosystemBar';
import { Navbar } from '../components/Navbar';
import { PageMetadata } from '@/components/PageMetadata';
import { BlogListSchema } from '../components/SchemaMarkup';
import { analytics } from '@/lib/analytics';

const API_BASE = '/api';

interface BlogSummary {
  id: number;
  title: string;
  slug: string;
  metaDescription: string;
  readTime: number;
  category: string;
  tags: string;
  views: number;
  publishedAt: string;
}

const CAT_COLORS: Record<string, string> = {
  Guide: 'var(--g1)', Comparison: 'var(--purple)', Strategy: 'var(--cyan)',
  Beginner: 'var(--gold)', Budget: 'var(--orange)', Payouts: 'var(--pink)',
};

const CAT_EMOJI: Record<string, string> = {
  Guide: '📚', Comparison: '⚖️', Strategy: '📈', Beginner: '🎓', Budget: '💰', Payouts: '💸',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [, navigate] = useLocation();

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!loading && blogs.length >= 0) {
      analytics.track('blog_view', {
        blog_slug: 'blog_list',
        page: '/blog',
        article_count: blogs.length,
      });
    }
  }, [loading, blogs.length]);

  async function fetchBlogs() {
    try {
      const res = await fetch(`${API_BASE}/blogs`);
      const data = await res.json() as { success: boolean; blogs: BlogSummary[] };
      if (data.success) setBlogs(data.blogs);
    } catch {
      setError('Could not load blogs. API may be starting up.');
    } finally {
      setLoading(false);
    }
  }

  async function generateNew() {
    setGenerating(true);
    try {
      const res = await fetch(`${API_BASE}/blog/generate?random=true`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json() as { success: boolean; blog: BlogSummary };
      if (data.success) {
        setBlogs(prev => [data.blog, ...prev]);
      }
    } catch {
      setError('Failed to generate blog post.');
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <PageMetadata
        title="Prop Trading Guides & News | PropFirmMarket"
        description="Read published prop trading guides, firm comparison notes, and practical funding strategy articles on PropFirmMarket."
        url="https://propfirmmarket.in/blog"
      />
      <BlogListSchema />
      <EcosystemBar />
      <Navbar onNavTo={() => navigate('/')} onOpenAI={() => {}} onOpenSmartFinder={() => {}} />

      <div className="blog-list-page">
        <div className="blp-header">
          <div>
            <div className="blp-eyebrow">📝 SEO Blog — Auto-Generated Daily</div>
            <h1 className="blp-title">PropFirm Market Blog</h1>
            <p className="blp-sub">AI-generated guides, comparisons & strategies for Indian prop traders. Published daily.</p>
          </div>
          <button
            className="blp-gen-btn"
            onClick={generateNew}
            disabled={generating}
          >
            {generating ? '⏳ Generating...' : '✨ Generate New Post'}
          </button>
        </div>

        {error && (
          <div className="blp-error">⚠️ {error}</div>
        )}

        {loading && (
          <div className="blp-loading">
            <div className="blp-spinner" />
            <span>Loading blog posts...</span>
          </div>
        )}

        {!loading && blogs.length === 0 && !error && (
          <div className="blp-empty">
            <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No posts yet</div>
            <div style={{ color: 'var(--t2)', marginBottom: 24 }}>Click "Generate New Post" to publish your first AI blog post.</div>
            <button className="blp-gen-btn" onClick={generateNew} disabled={generating}>
              {generating ? '⏳ Generating...' : '✨ Generate First Post'}
            </button>
          </div>
        )}

        <div className="blp-grid">
          {blogs.map(blog => {
            const tags: string[] = (() => { try { return JSON.parse(blog.tags); } catch { return []; } })();
            return (
              <article
                key={blog.id}
                className="blp-card"
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                <div className="blp-card-top">
                  <span className="blp-cat" style={{ color: CAT_COLORS[blog.category] || 'var(--g1)', background: (CAT_COLORS[blog.category] || 'var(--g1)') + '18' }}>
                    {CAT_EMOJI[blog.category] || '📄'} {blog.category}
                  </span>
                  <span className="blp-date">{formatDate(blog.publishedAt)}</span>
                </div>
                <h2 className="blp-card-title">{blog.title}</h2>
                <p className="blp-card-excerpt">{blog.metaDescription}</p>
                <div className="blp-card-tags">
                  {tags.slice(0, 3).map(t => (
                    <span key={t} className="blp-tag">{t}</span>
                  ))}
                </div>
                <div className="blp-card-meta">
                  <span>⏱ {blog.readTime} min read</span>
                  <span>👁 {blog.views.toLocaleString()} views</span>
                  <span className="blp-read-link">Read article →</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
