# Modern Bento Grid Blog

A beautiful, modern personal blog built with Next.js 14, TypeScript, Tailwind CSS, and featuring a Bento Grid layout design. Optimized for GitHub Pages static hosting.

## ✨ Features

- **Bento Grid Layout**: Modern, responsive grid-based design inspired by Apple's Bento boxes
- **Dark/Light Mode**: Full theme support with system preference detection
- **MDX Support**: Write posts in MDX format with frontmatter
- **Static Export**: Optimized for GitHub Pages with `output: 'export'`
- **TypeScript**: Full type safety across the codebase
- **Responsive Design**: Mobile-first approach that works on all devices
- **Animations**: Smooth micro-interactions with Framer Motion
- **Modern UI**: Clean, minimalist design with rounded corners and subtle borders

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Tailwind Typography
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Content**: MDX (next-mdx-remote)
- **Theme**: next-themes
- **Deployment**: GitHub Pages (Static Export)

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Creating Blog Posts

Create new posts in the `content/posts/` directory with the `.mdx` extension:

```mdx
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description of the post"
tags: ["tag1", "tag2"]
---

# Your Content

Write your post content here using Markdown!
```

## 🏗️ Project Structure

```
blog/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with ThemeProvider
│   ├── page.tsx             # Homepage with Bento Grid
│   ├── globals.css          # Global styles
│   └── posts/               # Blog post routes
│       └── [slug]/          # Dynamic post pages
│           └── page.tsx     # Post detail page
├── components/              # React components
│   ├── bento/              # Bento Grid modules
│   ├── ui/                 # Base UI components
│   ├── ThemeProvider.tsx   # Theme configuration
│   └── ThemeToggle.tsx     # Theme switcher
├── content/
│   └── posts/              # MDX blog posts
├── lib/                    # Utility functions
│   ├── utils.ts           # Helper functions
│   └── posts.ts           # Post utilities
├── public/                 # Static assets
└── package.json           # Dependencies
```

## 🎨 Customization

### Personalize Profile

Edit `components/bento/ProfileCard.tsx` to update your profile information.

### Update Social Links

Modify the `socialLinks` array in `components/bento/SocialLinks.tsx` with your actual social media links.

### Change Tech Stack

Update the `techStack` array in `components/bento/TechStack.tsx` to showcase your skills.

### Customize Theme

Modify the color variables in `app/globals.css` to match your brand colors.

## 🚢 Deploying to GitHub Pages

1. Build the project:
```bash
npm run build
```

2. The static files will be generated in the `out/` directory

3. Push to your GitHub repository

4. Configure GitHub Pages in your repository settings:
   - Source: Deploy from a branch
   - Branch: gh-pages (or main)
   - Directory: / (root) or /out

5. Or use a GitHub Actions workflow for automatic deployment

## 📱 Bento Grid Modules

The homepage includes the following modules:

- **ProfileCard**: Your avatar, name, title, and bio
- **SocialLinks**: Links to your social media profiles
- **PostList**: Latest 3 blog posts
- **TechStack**: Your technical skills organized by category
- **NowReading**: Current book and music (static)
- **ThemeToggle**: Dark/light mode switcher

## 🔧 Configuration

### Static Export

The project is configured for static export in `next.config.mjs`:

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

### Images

Since this is a static export, images are unoptimized. For production, consider using a CDN or optimizing images beforehand.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Feel free to reach out if you have any questions or feedback.
