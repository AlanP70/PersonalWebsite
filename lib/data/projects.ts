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
    title: "High-Frequency Chart Rendering",
    description:
      "VIBRAINT AI's legacy JavaFX charts dropped frames when live streams pushed more updates per second than the UI thread could paint. I rebuilt the charting path to decouple the render loop from the incoming data rate — coalescing bursts of updates into a steady frame budget and keeping the redraw work off the JavaFX Application Thread — so the graphs stay smooth and the interface stays interactive under sustained load.",
    tags: ["JavaFX", "Java", "Rendering", "Performance"],
    badges: ["Internship project"],
  },
  {
    title: "Ad-Spend Invoice Automation",
    description:
      "Replaced a recurring manual billing task for an accounting client: a Python pipeline pulls ad-spend from the Meta Marketing and TikTok APIs, parses the billing PDFs/Excel exports, and auto-generates the monthly invoices, scheduled unattended via Windows Task Scheduler.",
    tags: ["Python", "Meta Marketing API", "TikTok API", "Automation"],
    badges: ["Client project"],
  },
  {
    title: "This Website",
    description:
      "A game-style operator HUD design system: chamfered panels, targeting-rail tabs, and catalog readouts are built from one shared set of primitives, so every section — projects, experience, photography — reads as a record in the same interface. Sections are tabs that cross-fade through the View Transitions API, covers render as no-JS server components, and all motion is gated on reduced-motion. Built on the Next.js App Router.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    link: { label: "view repo", href: "https://github.com/AlanP70/PersonalWebsite" },
    badges: ["Open source"],
    image: "projects/personal-website.png",
  },
];
