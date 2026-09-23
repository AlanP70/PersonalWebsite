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
    role: "Software Developer Intern",
    org: "Vibraint | Neurotech Startup",
    type: "Internship",
    dates: "July 2026 – September 2026",
    description:
      "Sole developer on the real-time charts in a Java desktop app for EEG-based stroke rehab. Compared 3 smoothing methods across 25k classifier samples to guide the team's filter choice, wrote a Savitzky-Golay filter with even-window support, and replaced a hardcoded moving average with a Spring interface that reads the method from a config file. Fixed the timer, bounds, race and phase-shift bugs behind crashes and misaligned plots, and wrote 305 regression tests for the chart bounds logic.",
    tags: ["Java", "JavaFX", "Spring", "Testing"],
    logo: "logos/vibraint.svg",
  },
  {
    role: "Automation Engineer",
    org: "Allenby Accounting",
    type: "Contract",
    dates: "June 2026 – September 2026",
    description:
      "Build and maintain automated billing pipelines for an accounting firm's clients. Monthly Meta and TikTok ad-spend reports are turned into branded invoices on a schedule and delivered automatically.",
    tags: ["Python", "Automation", "Integrations"],
    logo: "logos/allenby.svg",
  },
  {
    role: "Machine Learning Intern",
    org: "LineChecks - Desjardins Portfolio Company",
    type: "Internship",
    dates: "March 2026 – April 2026",
    description:
      "Trained a YOLO computer-vision model in Python on 1,000+ images I labeled to detect court occupancy at tennis and pickleball courts, then built a pipeline that converts real-time detection counts into wait-time estimates.",
    tags: ["Computer Vision", "Python", "YOLO"],
    logo: "logos/linechecks.svg",
  }
];
