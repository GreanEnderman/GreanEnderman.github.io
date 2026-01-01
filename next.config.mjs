/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages 需要配置 basePath（如果仓库名不是 username.github.io）
  basePath: process.env.NODE_ENV === 'production' ? '/blog' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/blog' : '',
}

export default nextConfig
