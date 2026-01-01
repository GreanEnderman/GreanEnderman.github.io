"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function ProfileCard() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle>Grean</CardTitle>
              <p className="text-sm text-muted-foreground">啥几把也不会</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            我操我不到啊我几把啥也不会啊
          </p>
          <Badge variant="secondary">未知</Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
}
