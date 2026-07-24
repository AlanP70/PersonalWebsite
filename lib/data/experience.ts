export type ExperienceEntry = {
  role: string;
  org: string;
  type: string;
  dates: string;
  description: string;
  tags: string[];
  /** Optional company link. When set, the org name becomes a link. */
  href?: string;
  /** Optional logo path under /public. Falls back to an initial monogram. */
  logo?: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Software Developer",
    org: "Vibraint AI",
    type: "Internship",
    dates: "July 2026 – Present",
    description:
      "Building real-time data-visualization features in JavaFX for a production desktop application, modernizing legacy charting components to handle high-frequency data updates smoothly.",
    tags: ["JavaFX", "Java", "Real-Time Data", "Desktop"],
    logo: "logos/vibraint.svg",
  },
  {
    role: "Automation Engineer",
    org: "Allenby Accounting",
    type: "Contract",
    dates: "June 2026 - July 2026",
    description:
      "Build automated business and data pipelines for clients — pulling ad-spend data from the Meta Marketing API and TikTok exports and generating branded invoices automatically, replacing a manual process across multiple clients. See the Ad-Spend Invoice Automation project below.",
    tags: ["Python", "Automation", "Integrations"],
    logo: "logos/allenby.svg",
  },
  {
    role: "Machine Learning Intern",
    org: "LineChecks - Desjardins Portfolio Company",
    type: "Internship",
    dates: "March 2026 - April 2026",
    description:
      "Trained a YOLO computer-vision model in Python to detect court occupancy at tennis and pickleball courts from live camera footage, then built a pipeline converting real-time detection counts into wait-time estimates for the app.",
    tags: ["Computer Vision", "Python", "YOLO"],
    logo: "logos/linechecks.svg",
  }
];
