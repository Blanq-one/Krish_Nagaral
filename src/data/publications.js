// Helper function to get correct path for public assets
const getPublicPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  return baseUrl + cleanPath;
};

export const publications = [
  {
    id: 1,
    title: "Comparative Analysis of Machine Learning Algorithms for Heart Attack Prediction",
    authors: "Krish Nagaral",
    venue: "IJFMR",
    year: 2024,
    description: "Comparative analysis of various machine learning algorithms for heart attack prediction, evaluating performance metrics and model accuracy.",
    link: "#",
    pdf: getPublicPath("Publications/Heart Attck Prediction using comparative Analysis of Machine Learning Algorithms.pdf")
  },
  {
    id: 2,
    title: "Quantum Cryptography: Quantum Key Distribution Protocols for Secure Communication",
    authors: "Krish Nagaral",
    venue: "IJNRD",
    year: 2024,
    description: "Research paper on quantum cryptography principles, quantum key distribution protocols, and secure communication using quantum mechanics.",
    link: "#",
    pdf: getPublicPath("Publications/Quantum Cryptography.pdf")
  },
  {
    id: 3,
    title: "Green and Speculative Computing: Energy-Efficient Computing Strategies",
    authors: "Krish Nagaral",
    venue: "IJNRD",
    year: 2024,
    description: "Research paper on green and speculative computing methodologies and energy-efficient computational strategies.",
    link: "#",
    pdf: getPublicPath("Publications/Green Parallel Computing.pdf")
  },
  {
    id: 4,
    title: "Future Lens: Do LLM Hidden States Predict Future Tokens? [In Progress]",
    authors: "Krish Nagaral",
    venue: "In Progress",
    year: 2026,
    description: "An ongoing interpretability study reproducing and extending prior work on whether hidden states inside large language models encode predictions of future tokens, benchmarked across 6 transformer models.",
    link: "https://github.com/Blanq-one/Future_lens_Research_Study_on_LLM",
    pdf: ""
  }
];

