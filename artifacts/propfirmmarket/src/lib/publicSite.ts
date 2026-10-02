export const PUBLIC_SITE_PATHS = {
  home: '/',
  blog: '/blog',
  blogPost: '/blog/:slug',
  seoDashboard: '/seo-dashboard',
  firms: '/firms',
  firmDetail: '/firm/:slug',
  challenges: '/challenges',
  challengeDetail: '/challenge/:slug',
  compare: '/compare',
  reviews: '/reviews',
  notFound: '*',
} as const;

export const PUBLIC_SITE_ROUTES = [
  { path: PUBLIC_SITE_PATHS.home, label: 'Home', section: 'homepage' },
  { path: PUBLIC_SITE_PATHS.blog, label: 'Blog', section: 'blog' },
  { path: PUBLIC_SITE_PATHS.blogPost, label: 'Blog post', section: 'blog' },
  { path: PUBLIC_SITE_PATHS.seoDashboard, label: 'SEO dashboard', section: 'seo' },
  { path: PUBLIC_SITE_PATHS.firms, label: 'Firm directory', section: 'directory' },
  { path: PUBLIC_SITE_PATHS.firmDetail, label: 'Firm detail', section: 'directory' },
  { path: PUBLIC_SITE_PATHS.challenges, label: 'Challenge directory', section: 'directory' },
  { path: PUBLIC_SITE_PATHS.challengeDetail, label: 'Challenge rules profile', section: 'directory' },
  { path: PUBLIC_SITE_PATHS.compare, label: 'Compare', section: 'compare' },
  { path: PUBLIC_SITE_PATHS.reviews, label: 'Reviews', section: 'reviews' },
] as const;
