"use client";

import { Home, FolderGit2 } from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { links, navLinks } from "@/lib/data/links";

const icons = [Home, FolderGit2];

export function Nav() {
  const navItems = navLinks.map((item, i) => {
    const Icon = icons[i];
    return { name: item.label, link: item.href, icon: <Icon className="size-4" /> };
  });

  return (
    <FloatingNav
      navItems={navItems}
      cta={{ label: "Resume", href: links.resume, download: true }}
    />
  );
}
