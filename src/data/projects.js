// Helper function to get correct path for public assets
// Public folder files are served from root in both dev and prod
// But with base path, they need to be prefixed with base path
const getPublicPath = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Use BASE_URL which includes the base path
  // BASE_URL is "/portfolio/" in production and development when base is set
  const baseUrl = import.meta.env.BASE_URL || '/';
  // Ensure baseUrl ends with / and path doesn't start with /
  return baseUrl + cleanPath;
};

export const projects = {
  aiMl: [
    {
      id: 1,
      title: "LegalLens AI",
      description: "Intelligent AI-powered web application for analyzing legal documents, generating summaries, and providing smart Q&A with 96% automated citation accuracy",
      tech: ["Python", "FastAPI", "React", "TypeScript", "LangChain", "PyPDF2"],
      image: getPublicPath("Legal_lens_ai.jpg"),
      github: "https://github.com/Blanq-one/Legallens-AI",
      demo: "https://legallens-ai-frontend.onrender.com"
    },
    {
      id: 2,
      title: "JARVIS Personal AI Voice Assistant",
      description: "AI-powered desktop voice assistant with natural language understanding, achieving 98.5% speech recognition accuracy and sub-150ms response time",
      tech: ["Python", "Ollama", "LLM Models", "Voice Synthesis", "Speech Recognition"],
      image: getPublicPath("jarvis-banner.png"),
      github: "https://github.com/Blanq-one/JARVIS--Personal-AI-Voice-Assistant",
      demo: ""
    },
    {
      id: 3,
      title: "Credit Risk Scoring System",
      description: "ML system predicting loan default risk with 91% accuracy and 95% AUC, featuring explainable AI using SHAP values for regulatory compliance",
      tech: ["Python", "XGBoost", "SHAP", "Flask API", "scikit-learn"],
      image: getPublicPath("credit_rish_score_system.png"),
      github: "https://github.com/Blanq-one/Credit-Risk-Scoring-System",
      demo: ""
    },
    {
      id: 4,
      title: "Rags to Riches - Sentence Embedding API",
      description: "Flask-based RESTful API leveraging sentence-transformers for semantic search, clustering, and similarity analysis with high-quality embeddings",
      tech: ["Python", "Flask", "sentence-transformers", "Gunicorn", "RESTful API"],
      image: getPublicPath("rags_to_riches.jpg"),
      github: "https://github.com/Blanq-one/Rags-to-Riches",
      demo: ""
    },
    {
      id: 5,
      title: "Fake Account Detection System",
      description: "ML system using Random Forest and GAN-based augmentation to classify social media accounts as real or fake with enhanced generalization",
      tech: ["Python", "Random Forest", "GANs", "scikit-learn", "Data Augmentation"],
      image: getPublicPath("fake_account_detection.png"),
      github: "https://github.com/Blanq-one/Fake-Account-Detection",
      demo: ""
    }
  ],
  computerVision: [
    {
      id: 6,
      title: "Pneumonia Detection AI",
      description: "Transferable, explainable pneumonia detector for chest X-ray images with 91.5% test accuracy, 98% AUROC, and Grad-CAM explainability",
      tech: ["Python", "PyTorch", "ResNet", "Streamlit", "FastAPI", "Grad-CAM"],
      image: getPublicPath("pneumonia_detection.png"),
      github: "https://github.com/Blanq-one/Pneumonia_Detection_AI",
      demo: ""
    },
    {
      id: 7,
      title: "Blind Vision - AI-Powered Object Detection",
      description: "Vision-assistive tool for visually impaired users with real-time obstacle detection achieving 94% recognition accuracy and 88% navigation success rate",
      tech: ["Python", "OpenCV", "Haarcascade", "Computer Vision", "AR SDK"],
      image: getPublicPath("blind_vision.png"),
      github: "https://github.com/Blanq-one/Blind-Vision-AI-Powered-Object-Face-Detection",
      demo: ""
    },
    {
      id: 8,
      title: "Multimodal Facial Emotion Recognition",
      description: "Emotion recognition system combining facial expressions, speech, and text analysis for higher accuracy than single-mode approaches",
      tech: ["Python", "Deep Learning", "Computer Vision", "Speech Processing", "NLP"],
      image: getPublicPath("face_recognition.jpg"),
      github: "https://github.com/Blanq-one/Facial-emotion-recognition",
      demo: ""
    },
    {
      id: 9,
      title: "Plant Disease Detection",
      description: "CNN and MobileNet-based disease detection system with TensorFlow Lite deployment for lightweight edge inference on Raspberry Pi",
      tech: ["Python", "TensorFlow", "MobileNet", "TFLite", "Raspberry Pi", "CNN"],
      image: getPublicPath("Plant_disease_detection.jpg"),
      github: "https://github.com/Blanq-one/Plant-Disease-Detection",
      demo: ""
    }
  ],
  cloudDevOps: [
    {
      id: 10,
      title: "AI-Powered SaaS Platform",
      description: "Architected multi-tenant solution supporting 1,000+ clients with 99.95% availability, auto-scaling infrastructure handling 500% traffic spikes",
      tech: ["AWS", "Docker", "Kubernetes", "Microservices", "Auto-scaling"],
      image: getPublicPath("ai_powered_saas_platform.jpg"),
      github: "https://github.com/Blanq-one",
      demo: ""
    },
    {
      id: 11,
      title: "AI-Powered Cloud Security",
      description: "Smart Facial Recognition Authentication System - AI-driven biometric authentication platform replacing passwords with seamless facial recognition",
      tech: ["Python", "Flask", "Firebase", "face_recognition", "OpenCV", "dlib"],
      image: getPublicPath("ai_powered_security.png"),
      github: "https://github.com/Blanq-one",
      demo: ""
    },
    {
      id: 12,
      title: "Medical Records with Blockchain & RFID",
      description: "HIPAA-compliant healthcare system with 99.99% data integrity, end-to-end encryption, and secure API gateway with 98% security compliance",
      tech: ["AWS", "Blockchain", "RFID", "Security", "HIPAA"],
      image: getPublicPath("medical_record.jpg"),
      github: "https://github.com/Blanq-one",
      demo: ""
    }
  ],
  research: []
};
