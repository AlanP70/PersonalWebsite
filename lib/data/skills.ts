export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "Java", "TypeScript", "JavaScript"],
  },
  {
    category: "Frameworks",
    items: ["JavaFX", "React", "Next.js", "FastAPI"],
  },
  {
    category: "Tools",
    items: ["Git", "SQLite", "pandas", "YOLO", "REST APIs", "Automation & Scripting"],
  },
  {
    category: "Security",
    items: ["OAuth2", "JWT"],
  },
];

export const certifications = [
  {
    name: "IBM Cybersecurity Fundamentals",
    issuer: "Credly",
  },
];
