"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Music } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function NowReading() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{t("nowReading.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{t("nowReading.reading")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("nowReading.bookTitle")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("nowReading.bookAuthor")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <Music className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{t("nowReading.listening")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("nowReading.music")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("nowReading.platform")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
