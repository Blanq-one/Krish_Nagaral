import { getPublicPath } from '../utils/publicPath';

export const projects = {
  // Ordered by priority. Prioritized projects first, then remaining
  // (unchanged) projects kept afterwards within each category.
  aiMl: [
    {
      id: 13,
      title: "BoxBox - F1 Pit Stop Strategy Optimizer",
      description: "End-to-end reinforcement learning system that learns optimal F1 pit-stop strategies from 45,623 real telemetry laps across 42 Grand Prix, with a PPO agent gaining 5.7 positions over baseline at 4.67ms p95 inference",
      tech: ["Python", "PPO", "Gymnasium", "gRPC", "Flask-SocketIO", "Prometheus", "Grafana", "Docker"],
      image: getPublicPath("boxbox_f1.png"),
      github: "https://github.com/Blanq-one/BoxBox-F1-pit-stop-strategy-optimizer",
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
      id: 1,
      title: "LegalLens AI",
      description: "Intelligent AI-powered web application for analyzing legal documents, generating summaries, and providing smart Q&A with 96% automated citation accuracy",
      tech: ["Python", "FastAPI", "React", "TypeScript", "LangChain", "PyPDF2"],
      image: getPublicPath("Legal_lens_ai.jpg"),
      github: "https://github.com/Blanq-one/Legallens-AI",
      demo: "https://legallens-ai-frontend.onrender.com"
    },
    {
      id: 15,
      title: "Marketing Campaign Response Prediction",
      description: "Modular ML platform with automated feature engineering, 10-fold cross-validation, and SHAP explainability to predict and optimize marketing campaign outcomes and ROI",
      tech: ["Python", "LightGBM", "SHAP", "Power BI", "Pandas"],
      image: getPublicPath("marketing_analytics.png"),
      github: "https://github.com/Blanq-one/marketing-campaign-analytics",
      demo: ""
    },
    {
      id: 24,
      title: "Offline ChatGPT - Local LLM Chat",
      description: "ChatGPT-style web interface that runs entirely on your machine via Ollama, enabling private, subscription-free chats with models like Gemma and Code Llama, plus dynamic model switching, syntax-highlighted code, and chat export",
      tech: ["JavaScript", "Ollama", "Local LLM", "REST API", "HTML/CSS"],
      image: getPublicPath("offline_gpt.svg"),
      github: "https://github.com/Blanq-one/Offline-Chatgpt-Run-and-chat-with-models-in-style",
      demo: ""
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
      id: 23,
      title: "New Language Tutor AI",
      description: "LLM-powered FastAPI service returning structured grammar feedback, error categorization, and CEFR difficulty ratings across 10+ languages, with caching and retry logic for production resilience",
      tech: ["Python", "FastAPI", "OpenAI", "Pydantic", "Docker"],
      image: getPublicPath("language_tutor.jpg"),
      github: "https://github.com/Blanq-one/New-Language-Tutor-AI",
      demo: ""
    },
    // --- Unchanged projects (kept after the prioritized list) ---
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
      id: 14,
      title: "InsightPDF - RAG Document Intelligence",
      description: "Advanced RAG-based document intelligence platform with hybrid semantic search over PDFs, built with LangChain and OpenAI for accurate, context-aware answers and citations",
      tech: ["Python", "LangChain", "OpenAI", "RAG", "FAISS", "Vector Search"],
      image: getPublicPath("insightpdf.jpg"),
      github: "https://github.com/Blanq-one/InsightPDF",
      demo: ""
    },
    {
      id: 16,
      title: "Diabetes Prediction System",
      description: "End-to-end ML framework using Local Outlier Factor for anomaly detection and an ensemble of LightGBM models tuned with GridSearchCV for accurate diabetes risk prediction",
      tech: ["Python", "LightGBM", "scikit-learn", "GridSearchCV", "LOF"],
      image: getPublicPath("diabetes_prediction.jpg"),
      github: "https://github.com/Blanq-one/Diabetes_Prediction_using_Machine_Learning",
      demo: ""
    },
    {
      id: 5,
      title: "Fake Account Detection System",
      description: "ML system using Random Forest and GAN-based augmentation to classify social media accounts as real or fake with enhanced generalization",
      tech: ["Python", "Random Forest", "GANs", "scikit-learn", "Data Augmentation"],
      image: getPublicPath("fake_account_detection.png"),
      github: "https://github.com/Blanq-one/Fake_account_detection_system",
      demo: ""
    }
  ],
  cloudDevOps: [
    {
      id: 18,
      title: "CodeMentor AI - Multi-Agent Codebase Assistant",
      description: "Agentic code intelligence platform orchestrating 5 LangGraph agents across 11 FastAPI endpoints, pairing FAISS vector search with Tree-sitter AST parsing to answer codebase queries at p95 < 800ms over streaming SSE",
      tech: ["FastAPI", "Next.js", "LangGraph", "RAG", "FAISS", "SSE", "Prometheus", "Docker"],
      image: getPublicPath("codementor_ai.png"),
      github: "https://github.com/Blanq-one/Codementor-Repo_Analyser",
      demo: ""
    },
    {
      id: 17,
      title: "Restaurant Data Management System",
      description: "Professional data pipeline built on SOLID principles, featuring relational DB design and ETL pipelines that transform raw order data into BI-ready dashboards with sales forecasts and cloud deployment",
      tech: ["Python", "SQL", "ETL Pipelines", "Forecasting", "BI Dashboards"],
      image: getPublicPath("restaurant_analytics.png"),
      github: "https://github.com/Blanq-one/Restaurant-analytics-prediction-system",
      demo: ""
    },
    {
      id: 19,
      title: "NexusFlow - AI Assistant for n8n Automation",
      description: "Integration layer bridging AI assistants and the n8n automation platform, letting users build and manage complex workflow automations through natural language",
      tech: ["JavaScript", "n8n", "LLM", "Workflow Automation", "REST APIs"],
      image: getPublicPath("nexusflow.jpg"),
      github: "https://github.com/Blanq-one/NexusFlow-The-AI-Assistant-for-n8n-Workflow-Automation",
      demo: ""
    },
    {
      id: 20,
      title: "FormSage - AI Form Automation",
      description: "Privacy-first Chrome extension that autofills job application forms using DOM analysis and profile matching, with an optional LLM fallback for unmapped fields",
      tech: ["JavaScript", "Chrome Extension", "DOM Analysis", "LLM", "Privacy-first"],
      image: getPublicPath("formsage.png"),
      github: "https://github.com/Blanq-one/Formsage",
      demo: ""
    },
    // --- Unchanged projects (kept after the prioritized list) ---
    {
      id: 12,
      title: "Medical Records with Blockchain & RFID",
      description: "HIPAA-compliant healthcare system with 99.99% data integrity, end-to-end encryption, and secure API gateway with 98% security compliance",
      tech: ["AWS", "Blockchain", "RFID", "Security", "HIPAA"],
      image: getPublicPath("medical_record.jpg"),
      github: "https://github.com/Blanq-one",
      demo: ""
    },
    {
      id: 21,
      title: "AI Assistant Browser Extension",
      description: "High-performance AI assistant browser extension with a FastAPI backend and real-time token streaming via Server-Sent Events for low-latency conversational responses",
      tech: ["JavaScript", "FastAPI", "SSE", "Streaming", "Chrome Extension"],
      image: getPublicPath("ai_assistant_extension.png"),
      github: "https://github.com/Blanq-one/Ai-assistant-Extension",
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
      id: 8,
      title: "Multimodal Facial Emotion Recognition",
      description: "Emotion recognition system combining facial expressions, speech, and text analysis for higher accuracy than single-mode approaches",
      tech: ["Python", "Deep Learning", "Computer Vision", "Speech Processing", "NLP"],
      image: getPublicPath("face_recognition.jpg"),
      github: "https://github.com/Blanq-one/Facial-emotion-recognition",
      demo: ""
    },
    {
      id: 25,
      title: "CaptionCraft AI - Image Caption Generator",
      description: "Deep learning image captioning system pairing a VGG16 CNN encoder with an LSTM decoder, trained on Flickr8k to generate natural-language descriptions of images (BLEU-1 0.544)",
      tech: ["Python", "TensorFlow", "Keras", "VGG16", "LSTM", "NLTK"],
      image: getPublicPath("captioncraft.svg"),
      github: "https://github.com/Blanq-one/CaptionCraft-AI-Image-Caption-Generator",
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
    // --- Unchanged projects (kept after the prioritized list) ---
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
  research: [
    {
      id: 22,
      title: "Future Lens - LLM Hidden State Study [In Progress]",
      description: "Research reproduction investigating whether hidden states inside LLMs encode predictions of future tokens, benchmarked across 6 transformer models. Currently in progress, targeting EMNLP.",
      tech: ["Python", "Transformers", "PyTorch", "Interpretability", "Research"],
      image: getPublicPath("future_lens.png"),
      github: "https://github.com/Blanq-one/Future_lens_Research_Study_on_LLM",
      demo: ""
    }
  ]
};
