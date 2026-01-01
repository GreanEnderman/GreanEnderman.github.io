"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useLanguage } from "@/components/LanguageProvider";
import { MDXRemote } from "next-mdx-remote";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Post } from "@/lib/posts";

interface PostContentProps {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
}

export function PostContent({ post, mdxSource }: PostContentProps) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("posts.backToHome")}
        </Link>

        <article className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date && format(new Date(post.date), "MMMM dd, yyyy")}
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {post.excerpt && (
                  <p className="mt-4 text-lg text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Content */}
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <MDXRemote {...mdxSource} />
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </main>
  );
}
