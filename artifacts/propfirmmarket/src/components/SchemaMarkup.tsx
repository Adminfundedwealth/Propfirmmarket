import { useEffect } from 'react';

const SITE = 'https://propfirmmarket.in';

function injectSchema(id: string, data: object) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    (el as HTMLScriptElement).type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeSchema(id: string) {
  document.getElementById(id)?.remove();
}

/* ── HOME PAGE SCHEMAS ────────────────────────── */
export function HomeSchema() {
  useEffect(() => {
    injectSchema('schema-organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'PropFirmMarket',
      url: SITE,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/favicon.png`,
      },
      description: 'Directory and educational resource for prop firm listings, challenge rule profiles, and trading guides.',
    });

    injectSchema('schema-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'PropFirmMarket',
      url: SITE,
      description: 'Public directory for prop firm listings, challenge profiles and trading guides.',
      inLanguage: 'en-IN',
    });

    injectSchema('schema-home-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE}/`,
        },
      ],
    });

    return () => {
      removeSchema('schema-organization');
      removeSchema('schema-website');
      removeSchema('schema-home-breadcrumb');
    };
  }, []);

  return null;
}

/* ── BLOG POST SCHEMA ─────────────────────────── */
interface BlogSchemaProps {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string;
}

export function BlogPostSchema({ title, slug, description, publishedAt, readTime, category, tags }: BlogSchemaProps) {
  useEffect(() => {
    const url = `${SITE}/blog/${slug}`;
    const tagArr = tags ? tags.split(',').map(t => t.trim()) : [];

    injectSchema('schema-article', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      url,
      datePublished: publishedAt,
      dateModified: publishedAt,
      author: {
        '@type': 'Organization',
        name: 'PropFirmMarket',
        url: SITE,
      },
      publisher: {
        '@type': 'Organization',
        name: 'PropFirmMarket',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE}/favicon.png`,
        },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      articleSection: category,
      keywords: tagArr.join(', '),
      timeRequired: `PT${readTime}M`,
      inLanguage: 'en-IN',
    });

    injectSchema('schema-breadcrumb-blog', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
        { '@type': 'ListItem', position: 3, name: title, item: url },
      ],
    });

    return () => {
      removeSchema('schema-article');
      removeSchema('schema-breadcrumb-blog');
    };
  }, [slug, title, description, publishedAt, readTime, category, tags]);

  return null;
}

/* ── BLOG LIST PAGE SCHEMA ────────────────────── */
export function BlogListSchema() {
  useEffect(() => {
    injectSchema('schema-breadcrumb-bloglist', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Prop Trading Blog', item: `${SITE}/blog` },
      ],
    });

    injectSchema('schema-blog-collection', {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'PropFirmMarket Blog — Prop Firm Guides and Trading Education',
      description: 'Articles about prop firm models, challenge terms, and trading education for Indian traders.',
      url: `${SITE}/blog`,
      publisher: {
        '@type': 'Organization',
        name: 'PropFirmMarket',
        url: SITE,
      },
      inLanguage: 'en-IN',
    });

    return () => {
      removeSchema('schema-breadcrumb-bloglist');
      removeSchema('schema-blog-collection');
    };
  }, []);

  return null;
}
