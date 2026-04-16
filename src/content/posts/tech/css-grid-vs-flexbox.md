---
title: "现代 CSS 布局：Grid vs Flexbox 的选择"
description: "通过实际案例对比 CSS Grid 和 Flexbox 的使用场景，帮助你在项目中做出正确的布局选择。"
date: 2024-01-10
category: "tech"
template: "tech"
tags: ["CSS", "布局", "前端开发", "Grid", "Flexbox"]
featured: false
toc: true
---

## 核心区别

- **Flexbox**：一维布局（行或列）
- **Grid**：二维布局（行和列）

这是最本质的区别，也是选择的依据。

## 使用场景对比

### 场景 1：导航栏

**推荐：Flexbox**

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

原因：导航栏是典型的一维布局，元素沿主轴排列。

### 场景 2：卡片网格

**推荐：Grid**

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

原因：需要控制行和列的对齐，Grid 的 `auto-fit` 提供了响应式能力。

### 场景 3：表单布局

**推荐：Grid**

```css
.form {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  align-items: center;
}
```

原因：标签和输入框需要在两个维度上对齐。

### 场景 4：居中元素

**两者都可以**

```css
/* Flexbox */
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Grid */
.center-grid {
  display: grid;
  place-items: center;
}
```

Grid 的 `place-items` 更简洁，但 Flexbox 兼容性更好。

## 组合使用

实际项目中，Grid 和 Flexbox 经常组合使用：

```css
/* 外层用 Grid 定义整体布局 */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}

/* 内层用 Flexbox 排列元素 */
.header {
  display: flex;
  justify-content: space-between;
}
```

## 性能考虑

两者性能差异微乎其微，不应该成为选择依据。选择的关键是：

1. **语义清晰**：代码意图明确
2. **维护性好**：容易理解和修改
3. **浏览器支持**：考虑目标用户

## 决策树

```
需要二维布局？
├─ 是 → 使用 Grid
└─ 否 → 需要内容自适应大小？
    ├─ 是 → 使用 Flexbox
    └─ 否 → 两者都可以，选更简洁的
```

## 总结

- **Grid**：页面级布局、卡片网格、复杂表单
- **Flexbox**：组件级布局、导航栏、工具栏
- **组合使用**：外层 Grid 定义结构，内层 Flexbox 排列内容

记住：没有绝对的对错，只有更适合的选择。
