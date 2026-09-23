export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "C", "Java", "C#", "SQL", "JavaScript", "TypeScript", "HTML/CSS"],
  },
  {
    category: "Frameworks/Libraries",
    items: ["React", "Next.js", "FastAPI", "Spring Boot", "JavaFX", "YOLO", "Pandas"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "PostgreSQL", "Redis", "Gradle", "JUnit", "Linux", "Vite", "Valgrind", "Wireshark", "REST APIs"],
  },
  {
    category: "Cloud & DevOps",
    items: ["GitHub Actions", "AWS", "Azure", "Vercel", "Render", "Supabase"],
  },
  {
    category: "Security",
    items: ["OAuth2", "JWT"],
  },
];

export const certifications = [
  {
    name: "IBM Cybersecurity Fundamentals",
    issuer: "IBM SkillsBuild",
  },
];
