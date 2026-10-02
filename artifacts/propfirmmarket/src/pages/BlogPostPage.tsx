import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'wouter';
import DOMPurify from 'dompurify';
import { EcosystemBar } from '../components/EcosystemBar';
import { Navbar } from '../components/Navbar';
import { PageMetadata } from '@/components/PageMetadata';
import { BlogPostSchema } from '../components/SchemaMarkup';
import { analytics } from '@/lib/analytics';

const API_BASE = '/api';

interface Blog {
  id: number;
  title: string;
  slug: string;
  keyword: string;
  metaDescription: string;
  content: string;
  readTime: number;
  category: string;
  tags: string;
  views: number;
  publishedAt: string;
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^\| (.+) \|$/gm, (match) => {
      const cells = match.slice(2, -2).split(' | ');
      const isHeader = cells.some(c => c.includes('---'));
      if (isHeader) return '<tr class="blog-table-sep"></tr>';
      return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
    })
    .replace(/(<tr>[\s\S]*?<\/tr>)/gm, (block) => {
      if (!block.includes('<table>')) return `<table class="blog-table">${block}</table>`;
      return block;
    })
    .replace(/^\* (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>)/g, (block) => `<ul>${block}</ul>`)
    .replace(/^(?!<[h1-6|u|l|t])(.*\S.*)$/gm, '<p>$1</p>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/<\/ul>\s*<ul>/g, '')
    .replace(/<\/table>\s*<table[^>]*>/g, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<tr class="blog-table-sep"><\/tr>/g, '');
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!slug) return;

    fetch(`${API_BASE}/blog/${slug}`)
      .then(r => r.json())
      .then((data: { success: boolean; blog: Blog }) => {
        if (data.success && data.blog) {
          setBlog(data.blog);
          analytics.track('blog_view', {
            blog_slug: data.blog.slug,
            blog_category: data.blog.category,
            source_page: analytics.getPreviousPagePath() || '/',
          });
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const shareUrl = `${window.location.origin}/blog/${slug}`;
  const shareText = blog ? `📝 ${blog.title} | PropFirmMarket\n\n${blog.metaDescription}\n\n🔗 ${shareUrl}` : '';

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <EcosystemBar />
      <div style={{ textAlign: 'center', color: 'var(--t2)' }}>
        <div className="blp-spinner" style={{ margin: '0 auto 16px' }} />
        <div>Loading article...</div>
      </div>
    </div>
  );

  if (notFound) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <EcosystemBar />
      <Navbar onNavTo={() => navigate('/')} onOpenAI={() => {}} onOpenSmartFinder={() => {}} />
      <div style={{ maxWidth: 700, margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Article Not Found</h1>
        <p style={{ color: 'var(--t2)', marginBottom: 24 }}>This blog post doesn't exist or has been removed.</p>
        <button className="btn btn-g" onClick={() => navigate('/blog')}>← Back to Blog</button>
      </div>
    </div>
  );

  if (!blog) return null;

  const tags: string[] = (() => { try { return JSON.parse(blog.tags); } catch { return []; } })();
  const htmlContent = markdownToHtml(blog.content);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <PageMetadata
        title={`${blog.title} | PropFirmMarket`}
        description={blog.metaDescription}
        url={`https://propfirmmarket.in/blog/${blog.slug}`}
      />
      <BlogPostSchema
        title={blog.title}
        slug={blog.slug}
        description={blog.metaDescription}
        publishedAt={blog.publishedAt}
        readTime={blog.readTime}
        category={blog.category}
        tags={blog.tags}
      />
      <EcosystemBar />
      <Navbar onNavTo={() => navigate('/')} onOpenAI={() => {}} onOpenSmartFinder={() => {}} />

      <div className="blog-post-page">
        <div className="bpp-inner">
          <nav className="bpp-breadcrumb">
            <button onClick={() => navigate('/')}>Home</button>
            <span>›</span>
            <button onClick={() => navigate('/blog')}>Blog</button>
            <span>›</span>
            <span>{blog.category}</span>
          </nav>

          <header className="bpp-header">
            <div className="bpp-meta-top">
              <span className="bpp-cat">{blog.category}</span>
              <span className="bpp-dot">·</span>
              <span>{blog.readTime} min read</span>
              <span className="bpp-dot">·</span>
              <span>{formatDate(blog.publishedAt)}</span>
              <span className="bpp-dot">·</span>
              <span>👁 {blog.views.toLocaleString()} views</span>
            </div>
            <h1 className="bpp-title">{blog.title}</h1>
            <p className="bpp-meta-desc">{blog.metaDescription}</p>
            <div className="bpp-tags">
              {tags.map(t => <span key={t} className="blp-tag">{t}</span>)}
            </div>
          </header>

          <div className="bpp-seo-info">
            <span>🔑 Keyword: <strong>{blog.keyword}</strong></span>
            <span className="bpp-dot">·</span>
            <span>🤖 AI-Generated & SEO-Optimized</span>
            <span className="bpp-dot">·</span>
            <span>✅ PropFirmMarket.com</span>
          </div>

          <article
            className="bpp-content"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }}
          />

          <div className="bpp-share">
            <div className="bpp-share-title">📤 Share This Article</div>
            <div className="bpp-share-btns">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                target="_blank" rel="noopener noreferrer"
                className="bpp-share-btn twitter"
              >
                𝕏 Share on X
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`}
                target="_blank" rel="noopener noreferrer"
                className="bpp-share-btn telegram"
              >
                ✈️ Share on Telegram
              </a>
              <button
                className="bpp-share-btn copy"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  const btn = document.querySelector('.bpp-share-btn.copy');
                  if (btn) { btn.textContent = '✅ Copied!'; setTimeout(() => { btn.textContent = '🔗 Copy Link'; }, 2000); }
                }}
              >
                🔗 Copy Link
              </button>
            </div>
            <div className="bpp-share-url">{shareUrl}</div>
          </div>

          <div className="bpp-cta-box">
            <div className="bpp-cta-title">🚀 Ready to Get Funded?</div>
            <div className="bpp-cta-sub">Browse public firm profiles and compare the terms currently listed.</div>
            <button
              className="btn btn-g btn-lg"
              onClick={() => {
                analytics.track('cta_click', {
                  cta_id: 'explore_plans',
                  page: '/blog/' + slug,
                  destination_type: 'homepage_compare',
                });
                navigate('/');
              }}
            >
              Compare Prop Firms Now →
            </button>
          </div>

          <div className="bpp-nav-bottom">
            <button className="btn btn-o" onClick={() => navigate('/blog')}>← All Articles</button>
          </div>
        </div>
      </div>
    </div>
  );
}
