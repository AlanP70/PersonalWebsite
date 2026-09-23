export type EducationEntry = {
  school: string;
  credential: string;
  dates: string;
  courses: string[];
  /** Optional school link. When set, the school name becomes a link. */
  href?: string;
  /** Optional logo path under /public. Falls back to an initial monogram. */
  logo?: string;
};

export const education: EducationEntry[] = [
  {
    school: "University of Guelph",
    credential: "Bachelor of Computer Science",
    dates: "Expected April 2030",
    logo: "logos/guelph.png",
    courses: [
      "Programming",
      "Data Structures",
      "OOP",
      "Micro Systems",
      "Linear Algebra",
      "Discrete Mathematics",
    ],
  },
];
