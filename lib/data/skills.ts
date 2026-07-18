export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: ["C", "C#", "Java", "Python", "SQL", "JavaScript", "TypeScript", "HTML/CSS"],
  },
  {
    category: "Frameworks",
    items: ["React", "JavaFX", "Next.js", "FastAPI", "YOLO", "PostgreSQL", "MonoGame", "Tkinter", "Pynput"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Vite", "Render", "Linux Server", "Valgrind", "Makefile", "Wireshark", "Figma"],
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
