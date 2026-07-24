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
    title: "High-Frequency Chart Rendering",
    description:
      "A production JavaFX desktop application experienced UI performance issues under high-frequency updates. I rebuilt the charting path to decouple rendering from the update rate: batching bursts of updates into a steady frame budget and keeping redraw work off the JavaFX Application Thread, so the charts stayed smooth and the interface stayed responsive under load.",
    tags: ["JavaFX", "Java", "Rendering", "Performance"],
    badges: ["Internship project"],
  },
  {
    title: "Ad-Spend Invoice Automation",
    description:
      "Built a Python pipeline that reconciles monthly ad spend across multiple Meta and TikTok accounts, splits it by region, and auto-submits formatted invoices to the client's accounting software (Dext). Worked around gaps in Meta's billing API with a hybrid approach pulling from both the Marketing API and official billing statements. Runs unattended on a cloud schedule via GitHub Actions, syncing source files through Dropbox.",
    tags: ["Python", "Meta Marketing API", "TikTok API", "Dropbox API", "GitHub Actions", "Automation"],
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
      "YOLO model (Python) tracking real-time court occupancy at tennis and pickleball courts; built and labeled the image dataset and a pipeline converting live detection counts into wait-time estimates.",
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
