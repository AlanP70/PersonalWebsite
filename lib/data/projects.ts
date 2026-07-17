export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: { label: string; href: string };
  featured?: boolean;
  /** Optional thumbnail under /public. Falls back to a placeholder gradient when unset. */
  image?: string;
};

export const projects: Project[] = [
  {
    title: "Ad-Spend Invoice Automation",
    description:
      "Python pipeline that pulls Meta Marketing API and TikTok ad-spend data, parses billing PDFs/Excel, and auto-generates monthly invoices — scheduled via Windows Task Scheduler for an accounting client. [add metric — hours saved / month]",
    tags: ["Python", "Meta Marketing API", "TikTok API", "Automation"],
    featured: true,
  },
  {
    title: "EuraAI",
    description:
      "Math-education web app with an interactive whiteboard. Built a full auth system — Google OAuth2, email/password login, and JWT sessions.",
    tags: ["FastAPI", "React", "TypeScript", "SQLite", "OpenAI", "OAuth2", "JWT"],
    link: { label: "View website", href: "https://euralearn.com/" },
    featured: true,
  },
  {
    title: "Real-Time Signal Visualization",
    description:
      "Desktop app built at VIBRAINT AI rendering live, continuously updating data graphs in JavaFX for high-frequency signals.",
    tags: ["JavaFX", "Java", "Real-Time Data"],
  },
  {
    title: "LineChecks — Court Occupancy Detection",
    description:
      "YOLO computer-vision model detecting real-time court occupancy at tennis and pickleball facilities. [add metric]",
    tags: ["YOLO", "Python", "Computer Vision"],
  },
  {
    title: "SnipSmart",
    description:
      "A Chrome extension for capturing on-screen text. Uses OCR to detect and select text from screenshots, translates it, and makes it easy to copy and manage what it finds.",
    tags: ["JavaScript", "React", "Chrome Extension", "OCR"],
    link: { label: "View repo", href: "https://github.com/AlanP70/SnipSmart" },
  },
  {
    title: "This Website",
    description:
      "This site — Next.js App Router, Tailwind CSS, and shadcn/ui, with standout visual components sourced from 21st.dev.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    link: { label: "View repo", href: "https://github.com/AlanP70/PersonalWebsite" },
  },
];
