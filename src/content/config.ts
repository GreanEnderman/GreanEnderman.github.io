import { defineCollection, z } from 'astro:content';

// 文章集合
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum(['tech', 'essay']),
    template: z.enum(['tech', 'essay']),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    toc: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

// 项目集合
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    status: z.enum(['in-progress', 'completed', 'archived']),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
    repo: z.string().optional(),
    demo: z.string().optional(),
    relatedPosts: z.array(z.string()).default([]),
  }),
});

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
};
