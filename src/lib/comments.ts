export const GISCUS_CONFIG = {
  repo: 'GreanEnderman/GreanEnderman.github.io',
  repoId: 'R_kgDOSEGMaA',
  category: 'Announcements',
  categoryId: 'DIC_kwDOSEGMaM4DD7nf',
} as const;

export const isGiscusConfigured = Boolean(
  GISCUS_CONFIG.repoId && GISCUS_CONFIG.categoryId
);
