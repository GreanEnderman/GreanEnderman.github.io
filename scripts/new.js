import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录（ES 模块中需要手动获取 __dirname）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取命令行参数
const type = process.argv[2]; // tech, essay, project
const filename = process.argv[3] || 'new-article';

// 定义模板和目标路径
const templates = {
  tech: {
    template: 'templates/tech-template.md',
    target: `src/content/posts/tech/${filename}.md`
  },
  essay: {
    template: 'templates/essay-template.md',
    target: `src/content/posts/essays/${filename}.md`
  },
  project: {
    template: 'templates/project-template.md',
    target: `src/content/projects/${filename}.md`
  }
};

if (!type || !templates[type]) {
  console.error('❌ 错误：请指定类型 (tech, essay, project)');
  console.log('用法: node scripts/new.js <type> [filename]');
  console.log('示例: node scripts/new.js essay my-new-post');
  process.exit(1);
}

const { template, target } = templates[type];

// 检查模板文件是否存在
if (!fs.existsSync(template)) {
  console.error(`❌ 错误：模板文件不存在 ${template}`);
  process.exit(1);
}

// 检查目标文件是否已存在
if (fs.existsSync(target)) {
  console.error(`❌ 错误：文件已存在 ${target}`);
  console.log('💡 提示：请使用不同的文件名或删除现有文件');
  process.exit(1);
}

// 确保目标目录存在
const targetDir = path.dirname(target);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 复制文件
try {
  fs.copyFileSync(template, target);

  // 更新文件中的日期为今天
  let content = fs.readFileSync(target, 'utf8');
  const today = new Date().toISOString().split('T')[0];
  content = content.replace(/date: \d{4}-\d{2}-\d{2}/, `date: ${today}`);
  fs.writeFileSync(target, content, 'utf8');

  console.log('✅ 创建成功！');
  console.log(`📝 文件位置: ${target}`);
  console.log(`📅 日期已设置为: ${today}`);
  console.log('');
  console.log('💡 下一步：');
  console.log(`   1. 编辑文件: ${target}`);
  console.log('   2. 本地预览: npm run dev');
  console.log('   3. 部署发布: npm run deploy');
} catch (error) {
  console.error('❌ 创建失败:', error.message);
  process.exit(1);
}
