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
    title: "Rewind",
    description:
      "A learning archive where students upload their course material and ask questions like \"where did I first learn recursion?\" to get a timeline of every place a concept appeared. It uses PDF ingestion with page-level citations, a background job queue, and semantic search with pgvector. It correctly dated 58 of 70 real course files from filenames alone. An evaluation showed vector search gave no measurable gain over a plain keyword baseline, so the UI says \"earliest match\" instead of claiming \"first occurrence.\"",
    tags: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "pgvector", "Redis"],
    link: { label: "view repo", href: "https://github.com/AlanP70/Rewind" },
    badges: ["In progress"],
    image: "projects/rewind.png",
  },
  {
    title: "Real-Time EEG Chart Rendering",
    description:
      "Sole developer on the real-time charts in a Java desktop application for EEG-based stroke rehab. Compared 3 smoothing methods across 25k classifier samples to guide the team's filter choice, then wrote a Savitzky-Golay filter with even-window support and checked it against known values. Swapped a hardcoded moving average for a Spring interface that reads the smoothing method from a config file. Fixed crashes and misaligned plots caused by timer, bounds, race and phase-shift bugs, and wrote 305 regression tests for the chart bounds logic, each proven to fail when the bug it guards against returns.",
    tags: ["Java", "JavaFX", "Spring", "Testing"],
    badges: ["Internship project"],
  },
  {
    title: "Ad-Spend Invoice Automation",
    description:
      "A Python pipeline that pulls monthly Meta and TikTok ad-spend reports from Dropbox, generates branded client invoices, and sends them to the firm's bookkeeping system. It runs on a schedule through GitHub Actions, with Dropbox auth moved to refresh tokens so runs don't fail silently when a token expires.",
    tags: ["Python", "GitHub Actions", "Dropbox API", "Meta Marketing API", "TikTok"],
    badges: ["Client project"],
  },
  {
    title: "Eura",
    description:
      "A full-stack math education app built with FastAPI, React, and TypeScript. Implemented the complete authentication system, including Google OAuth2, email/password login, JWT session handling, and per-user data isolation.",
    tags: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "OAuth2", "JWT"],
    link: { label: "live site", href: "https://euralearn.com/" },
    badges: ["Live"],
    image: "projects/eura.png",
  },
  {
    title: "LineChecks — Court Occupancy Detection",
    description:
      "YOLO model (Python) tracking real-time court occupancy at tennis and pickleball courts; built and labeled a 1,000+ image dataset and a pipeline converting live detection counts into wait-time estimates.",
    tags: ["YOLO", "Python", "Computer Vision"],
    link: { label: "live site", href: "https://linechecks.com/" },
    badges: ["Internship project"],
    image: "projects/linechecks.png",
  },
  {
    title: "SnipSmart",
    description:
      "A Chrome extension that captures any region of the screen, runs OCR to extract the text, and translates it inline. Built with Tesseract.js for text recognition and a translation API, with an in-context popup showing the original and translated text side by side.",
    tags: ["JavaScript", "React", "JSON", "Chrome Extension", "OCR", "Translation"],
    link: { label: "view repo", href: "https://github.com/AlanP70/SnipSmart" },
    badges: ["Open source"],
    image: "projects/snipsmart.png",
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
