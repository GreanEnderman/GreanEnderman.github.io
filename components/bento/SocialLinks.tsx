"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com", color: "hover:bg-black/5 dark:hover:bg-white/5" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "hover:bg-sky-500/10" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "hover:bg-blue-500/10" },
  { name: "Email", icon: Mail, href: "mailto:hello@example.com", color: "hover:bg-green-500/10" },
];

export function SocialLinks() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{t("social.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-colors ${link.color}`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{link.name}</span>
                </a>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
