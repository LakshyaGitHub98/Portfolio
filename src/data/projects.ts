export interface Project {
  name: string;
  category: string;
  tagline: string;
  stack: string[];
  description: string;
  problem: string;
  approach: string;
  result: string;
  pipeline?: { step: string; detail: string }[];
}

export const projects: Project[] = [
  {
    name: "DiaPredict",
    category: "AI / Machine Learning",
    tagline: "AI-based diabetes risk prediction system",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    description:
      "Supervised classification model predicting diabetes risk. Uses an 80/20 train-test split, StandardScaler for feature scaling, and Logistic Regression as the classifier. Evaluated via accuracy, precision, recall, and F1-score (~80% accuracy).",
    problem: "Diabetes risk prediction from tabular health data — a supervised classification task requiring feature scaling and robust evaluation.",
    approach: "80/20 train-test split, StandardScaler for feature normalization, and Logistic Regression as the classifier.",
    result: "~80% accuracy on the held-out test set. Portfolio demonstration project — not a clinical or diagnostic tool.",
    pipeline: [
      { step: "Train / test split", detail: "80 / 20 random split" },
      { step: "StandardScaler", detail: "Feature normalization" },
      { step: "Logistic Regression", detail: "Binary classification model" },
      { step: "Evaluation", detail: "Accuracy, precision, recall, and F1-score" },
    ],
  },
  {
    name: "NoteVault",
    category: "Full-Stack Platform",
    tagline: "Cloud-synced notes platform",
    stack: ["Flutter", "Node.js", "Express", "MongoDB", "JWT"],
    description:
      "Cross-platform notes app with authentication, cloud synchronization, REST APIs, and a modular Node/Express backend.",
    problem: "Cross-platform note-taking with cloud sync, authentication, and a modular backend.",
    approach: "Flutter for the client, Node.js and Express for REST APIs, MongoDB for storage, and JWT for authentication.",
    result: "Notes platform with sign-in, create/edit/delete, and cloud synchronization across devices.",
  },
  {
    name: "URL Shortener",
    category: "Backend Service",
    tagline: "URL management & analytics system",
    stack: ["Node.js", "Express", "MongoDB"],
    description:
      "Short-link generation service with REST APIs, persistent storage, redirect handling, and visit-tracking analytics.",
    problem: "URL shortening with persistent storage, redirect handling, and visit analytics.",
    approach: "Node.js and Express expose short-code generation and redirect endpoints backed by MongoDB.",
    result: "Short-link service with creation, redirect resolution, and per-link visit tracking.",
  },
];
