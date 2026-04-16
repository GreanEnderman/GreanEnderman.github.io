import { getAllPosts } from './posts';
import type { Post } from './posts';

export interface TagWithCount {
  tag: string;
  count: number;
}

/**
 * 获取所有标签及其文章数量
 */
export async function getAllTags(): Promise<TagWithCount[]> {
  const posts = await getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  const tags = Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  return tags;
}

/**
 * 获取热门标签（按文章数量排序）
 */
export async function getPopularTags(limit: number = 10): Promise<TagWithCount[]> {
  const tags = await getAllTags();
  return tags.slice(0, limit);
}

/**
 * 获取标签的所有文章
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.tags.includes(tag));
}

/**
 * 获取文章的标签（用于面包屑或标签云）
 */
export function getPostTags(post: Post): string[] {
  return post.data.tags;
}

/**
 * 标签标准化（转小写，去空格）
 */
export function normalizeTag(tag: string): string {
  return tag.toLowerCase().trim();
}

/**
 * 获取相关标签（基于共现关系）
 */
export async function getRelatedTags(
  currentTag: string,
  limit: number = 5
): Promise<string[]> {
  const posts = await getPostsByTag(currentTag);
  const relatedTagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      if (tag !== currentTag) {
        relatedTagMap.set(tag, (relatedTagMap.get(tag) || 0) + 1);
      }
    });
  });

  return Array.from(relatedTagMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}
