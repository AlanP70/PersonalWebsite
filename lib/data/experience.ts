export type ExperienceEntry = {
  role: string;
  org: string;
  type: string;
  dates: string;
  description: string;
  tags: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Software Developer Intern",
    org: "VIBRAINT AI",
    type: "Internship",
    dates: "2026 – Present",
    description:
      "Building real-time data-visualization desktop tooling in JavaFX for a biomedical platform.",
    tags: ["JavaFX", "Java", "Real-Time Data", "Desktop"],
  },
  {
    role: "Machine Learning Intern",
    org: "LineChecks",
    type: "Desjardins portfolio company",
    dates: "[add dates]",
    description:
      "Built a YOLO-based computer-vision model to detect real-time court occupancy at tennis and pickleball facilities. [add metric — accuracy / dataset size]",
    tags: ["Computer Vision", "Python", "YOLO"],
  },
  {
    role: "Automation & Integration Consultant",
    org: "Freelance",
    type: "Self-employed",
    dates: "[add dates]",
    description:
      "Build automated business and data pipelines for clients — see the Ad-Spend Invoice Automation project below.",
    tags: ["Python", "Automation", "Integrations"],
  },
];
