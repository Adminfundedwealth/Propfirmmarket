import { useEffect } from 'react';

interface PageMetadataProps {
  title: string;
  description: string;
  url: string;
  noIndex?: boolean;
  image?: string;
}

const DEFAULT_IMAGE = 'https://propfirmmarket.in/opengraph.jpg';

function ensureMetaTag(attributeKey: 'name' | 'property', attributeValue: string, content: string) {
  const selector = `meta[${attributeKey}="${attributeValue}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) {
    existing.content = content;
    return existing;
  }

  const created = document.createElement('meta');
  created.setAttribute(attributeKey, attributeValue);
  created.content = content;
  document.head.appendChild(created);
  return created;
}

export function PageMetadata({ title, description, url, noIndex = false, image = DEFAULT_IMAGE }: PageMetadataProps) {
  useEffect(() => {
    const originalTitle = document.title;
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const ogTitleTag = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescriptionTag = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const ogUrlTag = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    const ogImageTag = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    const twitterTitleTag = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    const twitterDescriptionTag = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    const twitterImageTag = document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]');
    let robotsTag = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const createdRobotsTag = noIndex && !robotsTag;
    if (createdRobotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.name = 'robots';
      document.head.appendChild(robotsTag);
    }
    const original = {
      description: descriptionTag?.content,
      canonical: canonicalTag?.href,
      ogTitle: ogTitleTag?.content,
      ogDescription: ogDescriptionTag?.content,
      ogUrl: ogUrlTag?.content,
      ogImage: ogImageTag?.content,
      twitterTitle: twitterTitleTag?.content,
      twitterDescription: twitterDescriptionTag?.content,
      twitterImage: twitterImageTag?.content,
      robots: robotsTag?.content,
    };

    document.title = title;
    if (descriptionTag) descriptionTag.content = description;
    if (canonicalTag) canonicalTag.href = url;
    else {
      const tag = document.createElement('link');
      tag.rel = 'canonical';
      tag.href = url;
      document.head.appendChild(tag);
    }

    ensureMetaTag('property', 'og:title', title);
    ensureMetaTag('property', 'og:description', description);
    ensureMetaTag('property', 'og:url', url);
    ensureMetaTag('property', 'og:type', 'website');
    ensureMetaTag('property', 'og:image', image);
    ensureMetaTag('name', 'twitter:card', 'summary_large_image');
    ensureMetaTag('name', 'twitter:title', title);
    ensureMetaTag('name', 'twitter:description', description);
    ensureMetaTag('name', 'twitter:image', image);

    if (noIndex && robotsTag) robotsTag.content = 'noindex,follow';

    return () => {
      document.title = originalTitle;
      if (descriptionTag && original.description !== undefined) descriptionTag.content = original.description;
      if (canonicalTag && original.canonical !== undefined) canonicalTag.href = original.canonical;
      if (ogTitleTag && original.ogTitle !== undefined) ogTitleTag.content = original.ogTitle;
      if (ogDescriptionTag && original.ogDescription !== undefined) ogDescriptionTag.content = original.ogDescription;
      if (ogUrlTag && original.ogUrl !== undefined) ogUrlTag.content = original.ogUrl;
      if (ogImageTag && original.ogImage !== undefined) ogImageTag.content = original.ogImage;
      if (twitterTitleTag && original.twitterTitle !== undefined) twitterTitleTag.content = original.twitterTitle;
      if (twitterDescriptionTag && original.twitterDescription !== undefined) twitterDescriptionTag.content = original.twitterDescription;
      if (twitterImageTag && original.twitterImage !== undefined) twitterImageTag.content = original.twitterImage;
      if (createdRobotsTag) robotsTag?.remove();
      else if (robotsTag && original.robots !== undefined) robotsTag.content = original.robots;
    };
  }, [title, description, url, noIndex, image]);

  return null;
}