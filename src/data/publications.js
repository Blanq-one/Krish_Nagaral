import { getPublicPath } from '../utils/publicPath';

export const publications = [
  {
    id: 1,
    status: 'published',
    title: "Comparative Analysis of Machine Learning Algorithms for Heart Attack Prediction",
    authors: "Krish Nagaral",
    venue: "IJFMR",
    year: 2024,
    description: "Comparative analysis of various machine learning algorithms for heart attack prediction, evaluating performance metrics and model accuracy.",
    pdf: getPublicPath("Publications/Heart Attck Prediction using comparative Analysis of Machine Learning Algorithms.pdf")
  },
  {
    id: 2,
    status: 'published',
    title: "Quantum Cryptography: Quantum Key Distribution Protocols for Secure Communication",
    authors: "Krish Nagaral",
    venue: "IJNRD",
    year: 2024,
    description: "Research paper on quantum cryptography principles, quantum key distribution protocols, and secure communication using quantum mechanics.",
    pdf: getPublicPath("Publications/Quantum Cryptography.pdf")
  },
  {
    id: 3,
    status: 'published',
    title: "Green and Speculative Computing: Energy-Efficient Computing Strategies",
    authors: "Krish Nagaral",
    venue: "IJNRD",
    year: 2024,
    description: "Research paper on green and speculative computing methodologies and energy-efficient computational strategies.",
    pdf: getPublicPath("Publications/Green Parallel Computing.pdf")
  },
  {
    id: 4,
    status: 'in-progress',
    title: "Future Lens: Do LLM Hidden States Predict Future Tokens?",
    year: 2026,
    description: "An ongoing interpretability study reproducing and extending prior work on whether hidden states inside large language models encode predictions of future tokens, benchmarked across 6 transformer models."
  },
  {
    id: 5,
    status: 'in-progress',
    title: "Mechanistic Interpretability of Code Correctness in LLMs via Sparse Autoencoders: A Single-Layer Reproduction and Cross-Benchmark Extension",
    year: 2026,
    description: "Reproduces a single-layer sparse autoencoder analysis of how LLMs internally represent code correctness, then extends it across additional code benchmarks."
  }
];

