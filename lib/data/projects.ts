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
      "Replaced a recurring manual billing task for an accounting client: a Python pipeline pulls ad-spend from the Meta Marketing and TikTok APIs, parses the billing PDFs/Excel exports, and auto-generates the monthly invoices, scheduled unattended via Windows Task Scheduler.",
    tags: ["Python", "Meta Marketing API", "TikTok API", "Automation"],
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
    image: "projects/eura.png",
  },
  {
    title: "Real-Time Data Visualization",
    description:
      "High-frequency data streams were overwhelming VIBRAINT AI's legacy JavaFX charts, stuttering the desktop UI under load. I rebuilt the live charting path so continuously updating graphs render smoothly while the interface stays responsive at high update rates.",
    tags: ["JavaFX", "Java", "Real-Time Data", "Performance"],
    badges: ["Internship project"],
  },
  {
    title: "LineChecks — Court Occupancy Detection",
    description:
      "YOLO model (Python) tracking real-time court occupancy at tennis and pickleball courts; built and labeled the image dataset and a pipeline converting live detection counts into wait-time estimates.",
    tags: ["YOLO", "Python", "Computer Vision"],
    link: { label: "live site", href: "https://linechecks.com/" },
    featured: true,
    badges: ["Internship project"],
    image: "projects/linechecks.png",
  },
  {
    title: "SnipSmart",
    description:
      "A Chrome extension for capturing on-screen text. Uses OCR to detect and select text from screenshots, adds multilingual translation, and makes it easy to copy and manage what it finds.",
    tags: ["JavaScript", "React", "JSON", "Chrome Extension", "OCR", "Translation"],
    link: { label: "view repo", href: "https://github.com/AlanP70/SnipSmart" },
    badges: ["Open source"],
    image: "projects/snipsmart.png",
  },
  {
    title: "This Website",
    description:
      "This site, built as a game-style operator HUD: a Next.js App Router app where sections are tabs that swap via the View Transitions API, over a shared HUD component system (chamfered panels, targeting-rail tabs, catalog readouts). Covers render as no-JS server components, and every animation is gated on reduced-motion.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    link: { label: "view repo", href: "https://github.com/AlanP70/PersonalWebsite" },
    badges: ["Open source"],
    image: "projects/personal-website.png",
  },
];
