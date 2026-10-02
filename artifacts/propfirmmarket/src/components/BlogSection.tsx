import { useState } from 'react';
import { Link } from 'wouter';

const posts = [
  {
    id: 1, cat: 'Guide', catColor: 'var(--g1)',
    emoji: '🇮🇳',
    title: 'Comparing Prop Firm Profiles for Indian Traders',
    excerpt: 'Compare the payment methods, currencies, and challenge details listed in public firm profiles. Confirm current terms with each firm.',
    readTime: '7 min read', date: 'Apr 8, 2026',
    tags: ['India', 'Forex', 'Beginners'],
  },
  {
    id: 2, cat: 'Strategy', catColor: 'var(--cyan)',
    emoji: '📈',
    title: 'Challenge Rules and Risk Planning',
    excerpt: 'An overview of position sizing, risk limits, and the importance of reading a challenge provider’s current rules before participating.',
    readTime: '12 min read', date: 'Apr 5, 2026',
    tags: ['FTMO', 'Strategy', 'Challenge'],
  },
  {
    id: 3, cat: 'Comparison', catColor: 'var(--purple)',
    emoji: '⚖️',
    title: 'FTMO and Funded Next: Compare Profile Terms',
    excerpt: 'Review the prices, payment methods, challenge structures, and payout intervals listed for these firms. Details may change; confirm them directly.',
    readTime: '9 min read', date: 'Apr 2, 2026',
    tags: ['FTMO', 'Funded Next', 'Comparison'],
  },
  {
    id: 4, cat: 'Beginner', catColor: 'var(--gold)',
    emoji: '🎓',
    title: 'What is a Prop Firm? Complete Guide for Indian Traders',
    excerpt: 'An introduction to prop firm models, challenge formats, and the types of information to review before choosing a program.',
    readTime: '10 min read', date: 'Mar 28, 2026',
    tags: ['Beginners', 'India', 'Education'],
  },
  {
    id: 5, cat: 'Budget', catColor: 'var(--orange)',
    emoji: '💰',
    title: 'Comparing Listings Under ₹5,000',
    excerpt: 'Learn how to use the directory’s INR price filter to compare profiles. Listed prices are subject to change and should be checked with the firm.',
    readTime: '6 min read', date: 'Mar 25, 2026',
    tags: ['Budget', 'India', 'Cheap'],
  },
  {
    id: 6, cat: 'Payouts', catColor: 'var(--pink)',
    emoji: '💸',
    title: 'Understanding Payout Terms and Withdrawal Methods',
    excerpt: 'A guide to comparing payout methods and intervals listed by firms. This site does not independently verify payout outcomes.',
    readTime: '8 min read', date: 'Mar 20, 2026',
    tags: ['Payouts', 'India', 'Banking'],
  },
];

const cats = ['All', 'Guide', 'Strategy', 'Comparison', 'Beginner', 'Budget', 'Payouts'];

export function BlogSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const visiblePosts = activeCategory === 'All' ? posts : posts.filter((post) => post.cat === activeCategory);

  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">📚 Guides & Resources</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="blog-sec" id="blogSec">
        <div className="blog-hdr">
          <div>
            <h2 className="sec-title">📚 Free Guides & Resources</h2>
            <p className="sec-sub">Public explainers and comparison topics. Check current firm terms directly before making decisions.</p>
          </div>
          <div className="blog-cats">
            {cats.map(c => (
              <button key={c} className={`blog-cat-btn${activeCategory === c ? ' active' : ''}`} onClick={() => setActiveCategory(c)}>{c}</button>
            ))}
          </div>
        </div>

        <div className="blog-grid">
          {visiblePosts.map(p => (
            <article key={p.id} className="blog-card">
              <div className="blog-emoji">{p.emoji}</div>
              <div className="blog-meta-top">
                <span className="blog-cat" style={{ color: p.catColor, borderColor: p.catColor + '44', background: p.catColor + '15' }}>{p.cat}</span>
                <span className="blog-date">{p.date}</span>
              </div>
              <h3 className="blog-title">{p.title}</h3>
              <p className="blog-excerpt">{p.excerpt}</p>
              <div className="blog-tags">
                {p.tags.map(t => <span key={t} className="blog-tag">#{t}</span>)}
              </div>
              <div className="blog-footer">
                <span className="blog-read">{p.readTime}</span>
                <Link className="blog-read-btn" href="/blog">Browse guides →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
