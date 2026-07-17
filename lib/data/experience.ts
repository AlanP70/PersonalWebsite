export type ExperienceEntry = {
  role: string;
  org: string;
  type: string;
  dates: string;
  description: string;
  tags: string[];
  /** Optional company link. When set, the org name becomes a link. */
  href?: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Software Developer",
    org: "VIBRAINT AI",
    type: "Internship",
    dates: "July 2026 – Present",
    description:
      "Building real-time data-visualization desktop tooling in JavaFX for a biomedical platform.",
    tags: ["JavaFX", "Java", "Real-Time Data", "Desktop"],
  },
  {
    role: "Automation & Integration Developer",
    org: "Allenby Accounting",
    type: "Contract",
    dates: "May 2026 - August 2026",
    description:
      "Build automated business and data pipelines for clients — see the Ad-Spend Invoice Automation project below.",
    tags: ["Python", "Automation", "Integrations"],
  },
  {
    role: "Machine Learning Intern",
    org: "LineChecks - Desjardins Portfolio Company",
    type: "Internship",
    dates: "March 2026 - April 2026",
    description:
      "Built a YOLO-based computer-vision model to detect real-time court occupancy at tennis and pickleball facilities. [add metric — accuracy / dataset size]",
    tags: ["Computer Vision", "Python", "YOLO"],
  }
];
