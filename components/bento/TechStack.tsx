"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

const techStack = [
  { name: "What can I say", category: "Languages" },
  /*{ name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "Node.js", category: "Backend" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "Git", category: "Tools" },*/
];

export function TechStack() {
  const { t } = useLanguage();
  const categories = Array.from(new Set(techStack.map((tech) => tech.category)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{t("techStack.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category}>
                <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
                  {t(`techStack.categories.${category}`)}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techStack
                    .filter((tech) => tech.category === category)
                    .map((tech) => (
                      <Badge key={tech.name} variant="secondary">
                        {tech.name}
                      </Badge>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
