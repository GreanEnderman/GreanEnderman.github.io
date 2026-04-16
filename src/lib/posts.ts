import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/**
 * 获取所有文章（排除草稿）
 */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => {
    return data.draft !== true;
  });

  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * 获取所有文章（包括草稿）
 */
export async function getAllPostsIncludingDrafts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * 按分类获取文章
 */
export async function getPostsByCategory(category: 'tech' | 'essay'): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.category === category);
}

/**
 * 获取精选文章
 */
export async function getFeaturedPosts(limit?: number): Promise<Post[]> {
  const posts = await getAllPosts();
  const featured = posts.filter((post) => post.data.featured === true);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * 获取最近文章
 */
export async function getRecentPosts(limit: number = 10): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

/**
 * 按标签获取文章
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.tags.includes(tag));
}

/**
 * 按系列获取文章
 */
export async function getPostsBySeries(series: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.series === series);
}

/**
 * 获取文章的上一篇和下一篇
 */
export async function getAdjacentPosts(currentSlug: string): Promise<{
  prev: Post | null;
  next: Post | null;
}> {
  const posts = await getAllPosts();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}

/**
 * 获取相关文章（基于标签匹配）
 */
export async function getRelatedPosts(
  currentPost: Post,
  limit: number = 3
): Promise<Post[]> {
  const posts = await getAllPosts();
  const currentTags = currentPost.data.tags;

  // 过滤掉当前文章，计算标签匹配度
  const relatedPosts = posts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const matchingTags = post.data.tags.filter((tag) =>
        currentTags.includes(tag)
      );
      return {
        post,
        score: matchingTags.length,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return relatedPosts;
}

/**
 * 按年份分组文章
 */
export async function getPostsByYear(): Promise<Map<number, Post[]>> {
  const posts = await getAllPosts();
  const postsByYear = new Map<number, Post[]>();

  posts.forEach((post) => {
    const year = post.data.date.getFullYear();
    if (!postsByYear.has(year)) {
      postsByYear.set(year, []);
    }
    postsByYear.get(year)!.push(post);
  });

  // 按年份降序排序
  return new Map([...postsByYear.entries()].sort((a, b) => b[0] - a[0]));
}

/**
 * 计算文章阅读时间（分钟）
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200; // 中文约 200-300 字/分钟
  const wordCount = content.length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

/**
 * 格式化日期
 */
export function formatDate(date: Date, locale: string = 'zh-CN'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
