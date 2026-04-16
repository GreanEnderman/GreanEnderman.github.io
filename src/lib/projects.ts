import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/**
 * 获取所有项目
 */
export async function getAllProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * 按状态获取项目
 */
export async function getProjectsByStatus(
  status: 'in-progress' | 'completed' | 'archived'
): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.data.status === status);
}

/**
 * 获取精选项目
 */
export async function getFeaturedProjects(limit?: number): Promise<Project[]> {
  const projects = await getAllProjects();
  const featured = projects.filter((project) => project.data.featured === true);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * 获取最近项目
 */
export async function getRecentProjects(limit: number = 10): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.slice(0, limit);
}

/**
 * 获取项目的关联文章
 */
export async function getRelatedPostsForProject(project: Project) {
  const { relatedPosts } = project.data;

  if (!relatedPosts || relatedPosts.length === 0) {
    return [];
  }

  const allPosts = await getCollection('posts', ({ data }) => {
    return data.draft !== true;
  });

  return allPosts
    .filter((post) => relatedPosts.includes(post.slug))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * 获取文章关联的项目
 */
export async function getProjectForPost(projectSlug: string): Promise<Project | null> {
  const projects = await getAllProjects();
  const project = projects.find((p) => p.slug === projectSlug);
  return project || null;
}

/**
 * 按技术栈筛选项目
 */
export async function getProjectsByStack(stackItem: string): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) =>
    project.data.stack.some(
      (item) => item.toLowerCase() === stackItem.toLowerCase()
    )
  );
}

/**
 * 获取所有使用的技术栈（去重）
 */
export async function getAllStacks(): Promise<string[]> {
  const projects = await getAllProjects();
  const stacks = new Set<string>();

  projects.forEach((project) => {
    project.data.stack.forEach((item) => stacks.add(item));
  });

  return Array.from(stacks).sort();
}

/**
 * 获取相关项目（基于技术栈匹配）
 */
export async function getRelatedProjects(
  currentProject: Project,
  limit: number = 3
): Promise<Project[]> {
  const projects = await getAllProjects();
  const currentStack = currentProject.data.stack;

  const relatedProjects = projects
    .filter((project) => project.slug !== currentProject.slug)
    .map((project) => {
      const matchingStack = project.data.stack.filter((item) =>
        currentStack.includes(item)
      );
      return {
        project,
        score: matchingStack.length,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.project);

  return relatedProjects;
}
