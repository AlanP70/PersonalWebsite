export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: { label: string; href: string };
  featured?: boolean;
  /** Optional thumbnail under /public. Falls back to a generated glyph when unset. */
  image?: string;
  /** Status badges — only where genuinely true (never invented). */
  badges?: string[];
};

export const projects: Project[] = [
  {
    title: "Ad-Spend Invoice Automation",
    description:
      "Python pipeline that pulls Meta Marketing API and TikTok ad-spend data, parses billing PDFs/Excel, and auto-generates monthly invoices — scheduled via Windows Task Scheduler for an accounting client. [add metric — hours saved / month]",
    tags: ["Python", "Meta Marketing API", "TikTok API", "Automation"],
    featured: true,
    badges: ["Client project"],
  },
  {
    title: "Eura",
    description:
      "Contributed to Eura, an AI-powered math-tutoring platform with an interactive whiteboard. Implemented Google OAuth2 (Authorization Code flow with CSRF protection) and a JWT session system with short-lived access and long-lived refresh tokens, plus email/password login with bcrypt hashing.",
    tags: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "OAuth2", "JWT"],
    link: { label: "live site", href: "https://euralearn.com/" },
    featured: true,
    badges: ["Live"],
  },
  {
    title: "Real-Time Data Visualization",
    description:
      "Work at VIBRAINT AI: live, continuously updating graph rendering in JavaFX for high-frequency data in a performance-sensitive desktop UI.",
    tags: ["JavaFX", "Java", "Real-Time Data"],
    badges: ["Internship project"],
  },
  {
    title: "LineChecks — Court Occupancy Detection",
    description:
      "YOLO model (Python) tracking real-time court occupancy at tennis and pickleball courts; built and labeled the image dataset and a pipeline converting live counts into wait-time estimates. [add metric — not on resume]",
    tags: ["YOLO", "Python", "Computer Vision"],
    link: { label: "live site", href: "https://linechecks.com/" },
    badges: ["Internship project"],
  },
  {
    title: "SnipSmart",
    description:
      "A Chrome extension for capturing on-screen text. Uses OCR to detect and select text from screenshots, adds multilingual translation, and makes it easy to copy and manage what it finds.",
    tags: ["JavaScript", "React", "JSON", "Chrome Extension", "OCR", "Translation"],
    link: { label: "view repo", href: "https://github.com/AlanP70/SnipSmart" },
    badges: ["Open source"],
  },
  {
    title: "This Website",
    description:
      "This site — Next.js App Router, Tailwind CSS, and shadcn/ui, with standout visual components sourced from 21st.dev.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    link: { label: "view repo", href: "https://github.com/AlanP70/PersonalWebsite" },
    badges: ["Open source"],
  },
];
