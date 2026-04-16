import { getAllPosts } from './posts';
import type { Post } from './posts';

export interface MonthData {
  month: number;
  monthName: string;
  posts: Post[];
}

export interface YearData {
  year: number;
  months: MonthData[];
  totalPosts: number;
}

/**
 * 按年月分组文章
 */
export async function getPostsByYearMonth(): Promise<Map<number, Map<number, Post[]>>> {
  const posts = await getAllPosts();
  const yearMonthMap = new Map<number, Map<number, Post[]>>();

  posts.forEach((post) => {
    const date = post.data.date;
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-11 转为 1-12

    if (!yearMonthMap.has(year)) {
      yearMonthMap.set(year, new Map<number, Post[]>());
    }

    const monthMap = yearMonthMap.get(year)!;
    if (!monthMap.has(month)) {
      monthMap.set(month, []);
    }

    monthMap.get(month)!.push(post);
  });

  // 按年份降序排序
  const sortedYearMap = new Map(
    [...yearMonthMap.entries()].sort((a, b) => b[0] - a[0])
  );

  // 对每年的月份也进行降序排序
  sortedYearMap.forEach((monthMap, year) => {
    const sortedMonthMap = new Map(
      [...monthMap.entries()].sort((a, b) => b[0] - a[0])
    );
    sortedYearMap.set(year, sortedMonthMap);
  });

  return sortedYearMap;
}

/**
 * 生成归档时间线数据（结构化格式，便于渲染）
 */
export async function getArchiveTimeline(): Promise<YearData[]> {
  const yearMonthMap = await getPostsByYearMonth();
  const timeline: YearData[] = [];

  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  yearMonthMap.forEach((monthMap, year) => {
    const months: MonthData[] = [];
    let totalPosts = 0;

    monthMap.forEach((posts, month) => {
      months.push({
        month,
        monthName: monthNames[month - 1],
        posts,
      });
      totalPosts += posts.length;
    });

    timeline.push({
      year,
      months,
      totalPosts,
    });
  });

  return timeline;
}

/**
 * 获取归档统计信息
 */
export async function getArchiveStats(): Promise<{
  totalPosts: number;
  yearCount: number;
  oldestYear: number;
  newestYear: number;
}> {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return {
      totalPosts: 0,
      yearCount: 0,
      oldestYear: new Date().getFullYear(),
      newestYear: new Date().getFullYear(),
    };
  }

  const years = posts.map(post => post.data.date.getFullYear());
  const uniqueYears = [...new Set(years)];

  return {
    totalPosts: posts.length,
    yearCount: uniqueYears.length,
    oldestYear: Math.min(...years),
    newestYear: Math.max(...years),
  };
}
