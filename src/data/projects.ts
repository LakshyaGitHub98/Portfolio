export interface Project {
  name: string;
  category: string;
  tagline: string;
  stack: string[];
  description: string;
}

export const projects: Project[] = [
  {
    name: "DiaPredict",
    category: "AI / Machine Learning",
    tagline: "AI-based diabetes risk prediction system",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    description:
      "Supervised classification model predicting diabetes risk. Uses an 80/20 train-test split, StandardScaler for feature scaling, and Logistic Regression as the classifier. Evaluated via accuracy, precision, recall, and F1-score (~80% accuracy).",
  },
  {
    name: "NoteVault",
    category: "Full-Stack Platform",
    tagline: "Cloud-synced notes platform",
    stack: ["Flutter", "Node.js", "Express", "MongoDB", "JWT"],
    description:
      "Cross-platform notes app with authentication, cloud synchronization, REST APIs, and a modular Node/Express backend.",
  },
  {
    name: "URL Shortener",
    category: "Backend Service",
    tagline: "URL management & analytics system",
    stack: ["Node.js", "Express", "MongoDB"],
    description:
      "Short-link generation service with REST APIs, persistent storage, redirect handling, and visit-tracking analytics.",
  },
];
