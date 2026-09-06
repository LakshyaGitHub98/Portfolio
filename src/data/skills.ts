export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "AI & Automation",
    skills: [
      "LLMs",
      "AI Agents",
      "RAG",
      "Tool Calling",
      "Function Calling",
      "Prompt Engineering",
      "Workflow Automation",
      "AI-integrated Platforms",
    ],
  },
  {
    name: "Backend",
    skills: [
      "Python",
      "FastAPI",
      "Node.js",
      "Express",
      "REST APIs",
      "Authentication",
      "JWT",
    ],
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind"],
  },
  {
    name: "Data",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Vector Databases"],
  },
  {
    name: "DevOps",
    skills: ["Docker", "Git", "GitHub", "CI/CD", "Postman"],
  },
  {
    name: "ML",
    skills: [
      "Python",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "Model Evaluation",
      "Data Preprocessing",
    ],
  },
  {
    name: "Core CS",
    skills: [
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "DSA",
      "Software Architecture",
    ],
  },
];
