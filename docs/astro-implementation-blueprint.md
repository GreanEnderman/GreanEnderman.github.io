# Astro 博客实施蓝图

## 1. 文档目标

这份文档用于把已经确定的博客产品方案，进一步拆成可执行的 Astro 实施方案。
重点不是讨论风格方向，而是回答下面几个问题：

- 项目目录应该怎么组织
- 页面应该有哪些，分别负责什么
- 内容模型应该如何设计
- 组件和布局如何拆分
- 搜索、评论、统计等功能如何接入
- 开发顺序如何安排

这份蓝图的目标，是让博客从“想法清晰”进入“可以开始搭建”。

## 2. 技术基线

推荐基线如下：

- 框架：Astro
- 渲染方式：优先静态生成
- 内容管理：Astro Content Collections
- 内容格式：Markdown + MDX
- 样式方案：原生 CSS 或 SCSS，自建设计系统
- 搜索：Pagefind
- 评论：giscus 或后续替换为 Waline
- 统计：Umami 或 GoatCounter
- 部署：GitHub Pages

原则：

- 优先静态化，减少运行时负担
- 优先内容驱动，避免过早引入复杂后端
- 优先可维护性，不为短期功能破坏结构清晰度

## 3. 推荐项目结构

建议从下面这套结构开始：

```text
my-blog/
  public/
    images/
    icons/
    fonts/
    pagefind/
  src/
    components/
      common/
      site/
      post/
      project/
      search/
    content/
      posts/
        tech/
        essays/
      projects/
    layouts/
      BaseLayout.astro
      PostLayoutTech.astro
      PostLayoutEssay.astro
      ProjectLayout.astro
      PageLayout.astro
    lib/
      content.ts
      posts.ts
      projects.ts
      archive.ts
      tags.ts
      seo.ts
    pages/
      index.astro
      about.astro
      archive.astro
      search.astro
      links.astro
      guestbook.astro
      posts/
        index.astro
        [slug].astro
      tags/
        [tag].astro
      projects/
        index.astro
        [slug].astro
    styles/
      tokens.css
      global.css
      prose.css
      article-tech.css
      article-essay.css
    content.config.ts
  docs/
```

说明：

- `public/` 放不参与构建的静态资源
- `src/content/` 放文章和项目源文件
- `src/layouts/` 放页面骨架和模板
- `src/components/` 放可复用组件
- `src/lib/` 放内容聚合、归档、标签、SEO 等工具函数
- `src/pages/` 放路由页面
- `src/styles/` 放设计令牌与排版样式

## 4. 内容目录规划

### 4.1 文章目录

文章建议按内容类型拆目录：

```text
src/content/posts/
  tech/
    react-performance.md
    node-stream-notes.mdx
  essays/
    reading-in-spring.md
    on-slow-projects.md
```

这样做有几个好处：

- 内容边界清晰
- 便于后期为不同类型文章设置默认模板
- 未来增加英文内容时也容易扩展

### 4.2 项目目录

项目建议独立存放：

```text
src/content/projects/
  blog-system.md
  portfolio-redesign.md
```

项目不是普通文章的子集，而是一种专门的内容类型，因此保持独立更稳妥。

## 5. 内容模型设计

建议使用 Astro Content Collections 管理两类内容：

- `posts`
- `projects`

### 5.1 posts 集合字段

推荐字段：

- `title`：文章标题
- `description`：摘要
- `date`：发布时间
- `updated`：更新时间
- `category`：`tech` 或 `essay`
- `tags`：标签数组
- `draft`：是否草稿
- `featured`：是否首页精选
- `series`：所属系列，可选
- `cover`：封面图，可选
- `toc`：是否显示目录
- `lang`：语言，默认 `zh`
- `project`：关联项目 slug，可选
- `template`：`tech` 或 `essay`

建议：

- `category` 用于内容归类
- `template` 用于页面渲染样式
- `project` 用于文章和项目建立关系

这样结构更灵活，不会把展示逻辑和内容分类完全绑死。

### 5.2 projects 集合字段

推荐字段：

- `title`：项目名
- `description`：项目摘要
- `date`：项目发布时间或阶段时间
- `status`：进行中、已完成、归档
- `stack`：技术栈数组
- `featured`：是否首页精选
- `repo`：仓库地址
- `demo`：演示地址
- `cover`：封面图
- `relatedPosts`：关联文章 slug 数组

可扩展字段：

- `role`：你在项目中的角色
- `highlights`：项目亮点数组
- `anonymousLabel`：匿名展示名称

## 6. content.config.ts 设计建议

建议在 `src/content.config.ts` 中定义集合校验规则，确保内容结构稳定。

核心目标：

- 严格校验字段类型
- 给常用字段设置默认值
- 约束 `category` 和 `template` 的枚举值

建议规则：

- `category` 仅允许 `tech`、`essay`
- `template` 仅允许 `tech`、`essay`
- `lang` 默认 `zh`
- `tags` 默认为空数组
- `draft` 默认为 `false`

这样可以显著降低后期内容增长后的维护成本。

## 7. 页面与路由规划

### 7.1 首页 `/`

职责：

- 展示站点宣言
- 展示精选文章和精选项目
- 分栏目展示最近技术文与随笔
- 展示最近更新时间流
- 提供归档、友链、留言入口

数据来源：

- `featured` 文章
- `featured` 项目
- 按日期排序的最近文章

### 7.2 文章列表页 `/posts`

职责：

- 统一展示文章列表
- 提供分类入口
- 展示标题、摘要、标签、日期

建议：

- 默认展示全部文章
- 页面顶部提供技术 / 随笔切换

### 7.3 文章详情页 `/posts/[slug]`

职责：

- 根据 `template` 渲染对应模板
- 展示正文、目录、元信息、上一篇下一篇
- 展示关联项目或相关文章

建议：

- 技术文模板强调目录和代码块体验
- 随笔模板强调版心和留白节奏

### 7.4 标签页 `/tags/[tag]`

职责：

- 展示同一标签下的所有文章
- 辅助长尾内容的聚合浏览

### 7.5 项目列表页 `/projects`

职责：

- 展示所有项目
- 强调项目摘要、技术栈、状态

建议：

- 不做过重卡片
- 使用更接近档案列表的呈现方式

### 7.6 项目详情页 `/projects/[slug]`

职责：

- 展示项目完整信息
- 展示项目亮点和外部链接
- 自动列出关联复盘文章

### 7.7 关于页 `/about`

职责：

- 承担职业展示与作者补充说明
- 展示经历、技术栈、兴趣、合作方式、联系方式

### 7.8 归档页 `/archive`

职责：

- 按年份和月份聚合文章
- 作为长期内容浏览入口

### 7.9 搜索页 `/search`

职责：

- 提供全文搜索
- 支持文章内容检索
- 可扩展分类、标签、年份筛选

### 7.10 友链页 `/links`

职责：

- 展示友链
- 体现个人网络关系

当前优先级较低，但路由可提前预留。

### 7.11 留言页 `/guestbook`

职责：

- 承担轻量互动功能
- 营造朋友交流感，而不是社区讨论感

## 8. 布局层设计

建议至少拆成 5 层布局：

- `BaseLayout.astro`
- `PageLayout.astro`
- `PostLayoutTech.astro`
- `PostLayoutEssay.astro`
- `ProjectLayout.astro`

### 8.1 BaseLayout

职责：

- 页面基础 HTML 结构
- 全局 SEO
- 全局 Header / Footer
- 全局主题变量挂载

### 8.2 PageLayout

职责：

- 承接普通页面版心
- 提供统一页面标题区

适合：

- 关于页
- 友链页
- 归档页
- 搜索页

### 8.3 PostLayoutTech

职责：

- 技术文章排版
- 目录、阅读进度、代码块增强
- 元信息展示

### 8.4 PostLayoutEssay

职责：

- 随笔排版
- 更宽松留白
- 更柔和的导语与引用样式

### 8.5 ProjectLayout

职责：

- 项目元信息布局
- 项目亮点和截图展示
- 相关文章挂载

## 9. 组件拆分建议

### 9.1 site 级组件

建议包含：

- `SiteHeader`
- `SiteFooter`
- `ThemeToggle`
- `PrimaryNav`
- `SectionHeading`
- `EditorialIntro`

### 9.2 post 级组件

建议包含：

- `PostCard`
- `PostMeta`
- `PostTOC`
- `ReadingProgress`
- `RelatedPosts`
- `SeriesNav`
- `TagList`

### 9.3 project 级组件

建议包含：

- `ProjectCard`
- `ProjectMeta`
- `ProjectLinks`
- `RelatedProjectPosts`

### 9.4 common 级组件

建议包含：

- `Container`
- `Divider`
- `Badge`
- `EmptyState`
- `Prose`

### 9.5 search 级组件

建议包含：

- `SearchBox`
- `SearchResultList`
- `SearchFilters`

## 10. 数据工具层设计

建议在 `src/lib/` 中封装内容聚合逻辑，避免把数据处理写散在页面里。

推荐文件：

- `posts.ts`
- `projects.ts`
- `archive.ts`
- `tags.ts`
- `seo.ts`

每个文件的职责建议：

- `posts.ts`：获取文章、排序、筛草稿、按分类筛选
- `projects.ts`：获取项目、排序、关联文章
- `archive.ts`：按年份月份聚合文章
- `tags.ts`：提取标签和标签对应文章
- `seo.ts`：生成标题、描述、Open Graph 信息

这样能让页面层更干净，也更利于后续扩展。

## 11. 首页实现建议

首页建议拆成以下区块：

1. 站点宣言
2. 精选内容
3. 技术栏目
4. 随笔栏目
5. 最新更新流
6. 页脚入口

数据逻辑建议：

- 精选文章：从 `featured=true` 的文章中取 1 到 2 篇
- 精选项目：从 `featured=true` 的项目中取 1 个
- 技术栏目：取最近技术文 4 到 6 篇
- 随笔栏目：取最近随笔 4 到 6 篇
- 更新流：按时间倒序取全站最近内容

如果想增强“刊物感”，可以让精选区和普通列表在版式上明显不同。

## 12. 文章页实现建议

### 12.1 技术文章模板

建议具备：

- 左侧或右侧目录
- 顶部元信息区
- 代码块增强样式
- 段落宽度适中
- 阅读进度条
- 相关文章推荐

适合强调结构、层级和知识传达效率。

### 12.2 随笔模板

建议具备：

- 更宽松的版心节奏
- 更明显的导语样式
- 引文、分隔、配图更有呼吸感
- 较弱的辅助工具感

适合强调气氛和阅读沉浸感。

## 13. 样式系统建议

建议先搭一层基础设计令牌。

### 13.1 tokens.css

建议定义：

- 颜色变量
- 字号层级
- 行高
- 间距尺度
- 圆角
- 边框颜色
- 阴影级别
- 内容宽度

### 13.2 global.css

负责：

- 全局 reset
- body 基础样式
- 链接、图片、列表、表格等基础规则

### 13.3 prose.css

负责：

- Markdown 正文排版
- 标题、段落、列表、blockquote、code、pre 等样式

### 13.4 article-tech.css / article-essay.css

负责：

- 技术文和随笔各自的模板差异

建议：

- 不要一开始把所有样式都堆进一个文件
- 先把“全局规则”和“文章规则”拆开

## 14. 深色模式建议

深色模式建议通过 CSS 变量切换，而不是为每个组件写两套样式。

推荐方式：

- 默认定义亮色变量
- 在 `[data-theme="dark"]` 下覆盖变量
- 用一个 `ThemeToggle` 负责切换
- 使用本地存储记住用户选择

原则：

- 深色模式不要反差过猛
- 保持低饱和和阅读舒适度
- 代码块颜色与正文背景要分层清楚

## 15. 搜索接入建议

推荐使用 `Pagefind`。

原因：

- 很适合静态站
- 支持全文搜索
- 无需自建服务端
- 与 Astro 结合成本低

接入策略：

1. 先完成内容和路由结构
2. 构建后生成 Pagefind 索引
3. 在 `/search` 页面挂载搜索 UI

建议首版支持：

- 全文搜索
- 标题匹配
- 标签辅助筛选

后续可扩展：

- 分类过滤
- 年份过滤

## 16. 评论与留言接入建议

你当前更适合“轻互动”而不是“强讨论”。

推荐路线：

- 第一阶段不上评论，先把内容体系和视觉完成
- 第二阶段再补 `guestbook` 或评论系统

如果优先考虑技术圈熟人：

- 用 `giscus`

如果后续更想做普通留言：

- 可再换为 `Waline`

建议：

- 评论模块放在文章底部，不做过度强调
- 留言页可以单独存在，和文章评论解耦

## 17. 统计接入建议

推荐方案：

- `Umami`
- `GoatCounter`

优先考虑：

- 轻量
- 隐私友好
- 不影响页面性能

建议统计的核心指标：

- 页面访问量
- 热门文章
- 来源渠道
- 设备分布

博客初期不需要复杂埋点。

## 18. SEO 与元信息建议

虽然站点主要自用，但仍建议把 SEO 基础打好。

建议支持：

- 每页独立 title 和 description
- Open Graph 图片
- canonical
- sitemap
- RSS

建议在 `src/lib/seo.ts` 中统一封装基础逻辑，避免每个页面重复拼接。

## 19. GitHub Pages 部署建议

因为你计划挂载在 GitHub Pages 上，所以建议一开始就按静态站思路设计。

部署建议：

- 保持纯静态输出
- 明确站点 `base` 配置
- 图片和静态资源路径统一
- 通过 GitHub Actions 自动构建和部署

建议注意：

- 如果仓库不是用户主页仓库，需要处理好子路径
- 搜索索引和静态资源路径要一并验证

## 20. 开发阶段拆分

建议把开发拆成 5 个阶段：

### 阶段一：内容基础层

- 初始化 Astro 项目
- 建立 `content.config.ts`
- 建立 `posts` 与 `projects` 集合
- 完成基础目录结构

### 阶段二：页面骨架层

- 完成 `BaseLayout`
- 完成首页
- 完成文章列表和详情路由
- 完成项目列表和详情路由

### 阶段三：阅读体验层

- 完成技术文模板
- 完成随笔模板
- 加入目录、代码高亮、阅读进度
- 打磨正文排版

### 阶段四：组织与检索层

- 完成标签页
- 完成归档页
- 接入搜索
- 补充 RSS、sitemap、SEO

### 阶段五：增强功能层

- 接入深色模式
- 接入统计
- 增加留言或评论
- 打磨动画和视觉细节

## 21. MVP 最小可用版本

如果希望尽快上线，最小可用版本建议只包含：

- 首页
- 文章列表页
- 文章详情页
- 项目页
- 关于页
- 标签
- 归档
- 深色模式
- 搜索

第一版可以先不上：

- 留言
- 友链
- 英文版
- 知识库

这样可以尽快把博客跑起来，再逐步增强。

## 22. 第一批建议创建的文件

如果进入开发阶段，建议优先创建这些文件：

```text
src/content.config.ts
src/layouts/BaseLayout.astro
src/layouts/PostLayoutTech.astro
src/layouts/PostLayoutEssay.astro
src/layouts/ProjectLayout.astro
src/pages/index.astro
src/pages/posts/index.astro
src/pages/posts/[slug].astro
src/pages/projects/index.astro
src/pages/projects/[slug].astro
src/pages/about.astro
src/pages/archive.astro
src/pages/search.astro
src/styles/tokens.css
src/styles/global.css
src/styles/prose.css
src/lib/posts.ts
src/lib/projects.ts
```

这些文件足以搭出博客主骨架。

## 23. 后续扩展方向

后续你想扩展时，建议优先按下面顺序来：

1. 简历页
2. 留言页
3. 系列文章导航
4. 知识库入口
5. 英文版

原因是这些扩展都和你已有定位相容，不会破坏当前“个人数字刊物”的核心方向。

## 24. 实施结论

这套 Astro 实施方案的核心思想是：

- 用尽量简单稳定的结构支撑长期写作
- 用双文章模板满足技术文和随笔的阅读差异
- 用项目模块承接作品展示需求
- 用搜索、归档、标签承担长期内容组织
- 用静态部署和轻量增强功能降低维护成本

如果产品方案回答的是“这个博客应该成为什么样子”，
那么这份蓝图回答的就是“它应该先怎么搭起来”。
