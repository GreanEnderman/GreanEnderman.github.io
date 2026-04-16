import type { Post } from './posts';
import type { Project } from './projects';

export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  ogImageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

/**
 * 站点基础配置
 */
export const SITE_CONFIG = {
  title: '数字馆长',
  description: '代码与匠心的交汇处，技术思考与文学感悟的策展',
  author: '数字馆长',
  siteUrl: 'https://yourusername.github.io', // 需要替换为实际域名
  defaultOgImage: '/images/og-default.jpg',
  locale: 'zh-CN',
  twitter: '@yourhandle', // 可选
};

/**
 * 生成页面标题
 */
export function generateTitle(pageTitle?: string): string {
  if (!pageTitle) {
    return SITE_CONFIG.title;
  }
  return `${pageTitle} | ${SITE_CONFIG.title}`;
}

/**
 * 生成文章 SEO 元数据
 */
export function generatePostSEO(post: Post, siteUrl: string = SITE_CONFIG.siteUrl): SEOMetadata {
  const url = `${siteUrl}/posts/${post.slug}`;
  const ogImage = post.data.cover
    ? `${siteUrl}${post.data.cover}`
    : `${siteUrl}${SITE_CONFIG.defaultOgImage}`;

  return {
    title: generateTitle(post.data.title),
    description: post.data.description,
    canonical: url,
    ogType: 'article',
    ogImage,
    ogImageAlt: post.data.title,
    publishedTime: post.data.date.toISOString(),
    modifiedTime: post.data.updated?.toISOString(),
    author: SITE_CONFIG.author,
    tags: post.data.tags,
  };
}

/**
 * 生成项目 SEO 元数据
 */
export function generateProjectSEO(
  project: Project,
  siteUrl: string = SITE_CONFIG.siteUrl
): SEOMetadata {
  const url = `${siteUrl}/projects/${project.slug}`;
  const ogImage = project.data.cover
    ? `${siteUrl}${project.data.cover}`
    : `${siteUrl}${SITE_CONFIG.defaultOgImage}`;

  return {
    title: generateTitle(project.data.title),
    description: project.data.description,
    canonical: url,
    ogType: 'article',
    ogImage,
    ogImageAlt: project.data.title,
    publishedTime: project.data.date.toISOString(),
    author: SITE_CONFIG.author,
    tags: project.data.stack,
  };
}

/**
 * 生成页面 SEO 元数据
 */
export function generatePageSEO(
  title: string,
  description: string,
  path: string = '',
  siteUrl: string = SITE_CONFIG.siteUrl
): SEOMetadata {
  const url = path ? `${siteUrl}${path}` : siteUrl;

  return {
    title: generateTitle(title),
    description,
    canonical: url,
    ogType: 'website',
    ogImage: `${siteUrl}${SITE_CONFIG.defaultOgImage}`,
    ogImageAlt: SITE_CONFIG.title,
  };
}

/**
 * 生成首页 SEO 元数据
 */
export function generateHomeSEO(siteUrl: string = SITE_CONFIG.siteUrl): SEOMetadata {
  return {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    canonical: siteUrl,
    ogType: 'website',
    ogImage: `${siteUrl}${SITE_CONFIG.defaultOgImage}`,
    ogImageAlt: SITE_CONFIG.title,
  };
}

/**
 * 生成标签页 SEO 元数据
 */
export function generateTagSEO(
  tag: string,
  count: number,
  siteUrl: string = SITE_CONFIG.siteUrl
): SEOMetadata {
  return {
    title: generateTitle(`标签：${tag}`),
    description: `浏览所有标记为"${tag}"的文章，共 ${count} 篇。`,
    canonical: `${siteUrl}/tags/${tag}`,
    ogType: 'website',
    ogImage: `${siteUrl}${SITE_CONFIG.defaultOgImage}`,
    ogImageAlt: `标签：${tag}`,
  };
}

/**
 * 生成归档页 SEO 元数据
 */
export function generateArchiveSEO(siteUrl: string = SITE_CONFIG.siteUrl): SEOMetadata {
  return generatePageSEO(
    '文章归档',
    '按时间顺序浏览所有文章',
    '/archive',
    siteUrl
  );
}

/**
 * 生成 JSON-LD 结构化数据（文章）
 */
export function generateArticleJsonLd(post: Post, siteUrl: string = SITE_CONFIG.siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.data.title,
    description: post.data.description,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
    },
    datePublished: post.data.date.toISOString(),
    dateModified: post.data.updated?.toISOString() || post.data.date.toISOString(),
    image: post.data.cover ? `${siteUrl}${post.data.cover}` : undefined,
    url: `${siteUrl}/posts/${post.slug}`,
    keywords: post.data.tags.join(', '),
  };
}

/**
 * 生成 JSON-LD 结构化数据（网站）
 */
export function generateWebsiteJsonLd(siteUrl: string = SITE_CONFIG.siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
    },
    inLanguage: SITE_CONFIG.locale,
  };
}
