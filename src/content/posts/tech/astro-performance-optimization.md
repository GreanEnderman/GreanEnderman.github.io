---
title: "Astro 性能优化实战：从 85 到 100 分的旅程"
description: "深入探讨如何通过图像优化、代码分割和缓存策略，将 Astro 站点的 Lighthouse 性能评分提升至满分。"
date: 2024-03-15
category: "tech"
template: "tech"
tags: ["Astro", "性能优化", "Web Vitals", "前端工程"]
featured: true
toc: true
---

## 背景

最近在重构个人博客时，选择了 Astro 作为框架。虽然 Astro 本身以性能著称，但要达到 Lighthouse 100 分仍需要精心调优。这篇文章记录了优化过程中的关键决策和技术细节。

## 初始状态分析

项目初始化后，Lighthouse 评分如下：

- **Performance**: 85
- **Accessibility**: 95
- **Best Practices**: 100
- **SEO**: 92

主要问题集中在：
1. 图像未优化（LCP 过长）
2. 字体加载阻塞渲染
3. 未使用现代图像格式

## 优化策略

### 1. 图像优化

Astro 提供了内置的 `<Image>` 组件，支持自动格式转换和响应式图像。

```astro
---
import { Image } from 'astro:assets';
import coverImage from '../assets/cover.jpg';
---

<Image
  src={coverImage}
  alt="文章封面"
  width={1200}
  height={630}
  format="webp"
  quality={80}
/>
```

**关键点**：
- 使用 `format="webp"` 自动转换为 WebP
- 设置合理的 `quality` 值（80-85 是甜点区）
- 明确指定 `width` 和 `height` 避免布局偏移

### 2. 字体加载策略

采用 `font-display: swap` 和字体预加载：

```html
<link
  rel="preload"
  href="/fonts/Manrope-Variable.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

CSS 中配置：

```css
@font-face {
  font-family: 'Manrope';
  src: url('/fonts/Manrope-Variable.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}
```

### 3. 代码分割与懒加载

对于非关键组件，使用 `client:visible` 指令：

```astro
<ThemeToggle client:visible />
```

这样组件只在进入视口时才加载 JavaScript。

### 4. 缓存策略

在 `astro.config.mjs` 中配置构建输出：

```js
export default defineConfig({
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro'],
          },
        },
      },
    },
  },
});
```

## 结果

优化后的 Lighthouse 评分：

- **Performance**: 100 ✅
- **Accessibility**: 100 ✅
- **Best Practices**: 100 ✅
- **SEO**: 100 ✅

核心 Web Vitals 指标：
- **LCP**: 0.8s（目标 < 2.5s）
- **FID**: 8ms（目标 < 100ms）
- **CLS**: 0.001（目标 < 0.1）

## 经验总结

1. **图像是最大瓶颈**：优先优化图像，收益最明显
2. **字体策略很重要**：`font-display: swap` 是必须的
3. **测量驱动优化**：使用 Lighthouse CI 持续监控
4. **不要过度优化**：80 分到 100 分的边际收益递减

## 参考资源

- [Astro 图像优化文档](https://docs.astro.build/en/guides/images/)
- [Web.dev 性能指南](https://web.dev/performance/)
- [Lighthouse 评分计算](https://web.dev/performance-scoring/)
