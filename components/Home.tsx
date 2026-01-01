"use client";

import { ProfileCard } from "@/components/bento/ProfileCard";
import { SocialLinks } from "@/components/bento/SocialLinks";
import { PostList, Post } from "@/components/bento/PostList";
import { TechStack } from "@/components/bento/TechStack";
import { NowReading } from "@/components/bento/NowReading";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";

interface HomeProps {
  latestPosts: Post[];
}

export function Home({ latestPosts }: HomeProps) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{t("header.welcome")}</h1>
            <p className="text-muted-foreground mt-2">
              {t("header.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-3 md:grid-rows-3">
          {/* Row 1 */}
          <ProfileCard />
          <SocialLinks />
          <TechStack />

          {/* Row 2 */}
          <PostList posts={latestPosts} />
          <NowReading />
        </div>
      </div>
    </main>
  );
}
