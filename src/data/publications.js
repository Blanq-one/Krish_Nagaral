// Helper function to get correct path for public assets
const getPublicPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  return baseUrl + cleanPath;
};

export const publications = [
  {
    id: 1,
    title: "Heart Attack Prediction using Comparative Analysis of Machine Learning Algorithms",
    authors: "Krish Nagaral",
    venue: "To be updated",
    year: 2024,
    description: "Comparative analysis of various machine learning algorithms for heart attack prediction, evaluating performance metrics and model accuracy.",
    link: "#",
    pdf: getPublicPath("Publications/Heart Attck Prediction using comparative Analysis of Machine Learning Algorithms.pdf")
  },
  {
    id: 2,
    title: "Quantum Cryptography",
    authors: "Krish Nagaral",
    venue: "To be updated",
    year: 2024,
    description: "Research paper on quantum cryptography principles, quantum key distribution protocols, and secure communication using quantum mechanics.",
    link: "#",
    pdf: getPublicPath("Publications/Quantum Cryptography.pdf")
  },
  {
    id: 3,
    title: "Green Parallel Computing",
    authors: "Krish Nagaral",
    venue: "To be updated",
    year: 2024,
    description: "Research paper on green parallel computing methodologies and energy-efficient computational approaches.",
    link: "#",
    pdf: getPublicPath("Publications/Green Parallel Computing.pdf")
  }
];

