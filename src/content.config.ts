import { defineCollection, z } from 'astro:content';

// Posts 集合 Schema
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // 基础信息
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updated: z.date().optional(),

    // 分类和模板
    category: z.enum(['tech', 'essay']),
    template: z.enum(['tech', 'essay']),

    // 标签和系列
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),

    // 状态标记
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),

    // 显示选项
    toc: z.boolean().default(true),
    cover: z.string().optional(),

    // 语言和关联
    lang: z.string().default('zh'),
    project: z.string().optional(), // 关联项目 slug
  }),
});

// Projects 集合 Schema
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // 基础信息
    title: z.string(),
    description: z.string(),
    date: z.date(),

    // 项目状态
    status: z.enum(['in-progress', 'completed', 'archived']),

    // 技术栈
    stack: z.array(z.string()).default([]),

    // 展示选项
    featured: z.boolean().default(false),
    cover: z.string().optional(),

    // 外部链接
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),

    // 关联内容
    relatedPosts: z.array(z.string()).default([]), // 关联文章 slug 数组

    // 可选扩展字段
    role: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    anonymousLabel: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
};
