import avatarImage from "./332470624_763635841999947_5385855005115743181_n.jpg";
import { PortfolioData } from "./types";

export const initialPortfolioData: PortfolioData = {
  "profile": {
    "name": "Charmelle John Cahucom",
    "title": "Computer Science Undergraduate",
    "subTitle": "B.S. in Computer Science @ University of Mindanao - Matina",
    "bio": "Passionate about building high-performance, accessible, and scalable software. Armed with deep fundamental knowledge in various programming language and computing fundamentals from different aspects of tech: Be it Web Development, Native Software, or Artificial Intelligence.",
    "location": "Davao City, Philippines",
    "avatarUrl": avatarImage,
    "email": "charmellejohn@gmail.com",
    "githubUrl": "https://github.com/Chams15",
    "linkedinUrl": "",
    "twitterUrl": "",
    "status": "Student",
    "education": {
      "institution": "University of Mindanao - Matina",
      "degree": "Bachelor of Science",
      "major": "Computer Science",
      "graduationDate": "May 2027",
      "gpa": "",
      "coursework": [
        "CCE105/L: Data Structures and Algorithms",
        "CS17: Software Engineering 2",
        "CS5: Database Management 2",
        "CCE105/L: Human Computer Interaction",
        "CCE15/L: Programming Languages and Paradigms",
        "CS6/L: Algorithms and Complexity"
      ],
      "awards": []
    }
  },
  "projects": [
    {
      "id": "project-1",
      "title": "Boarding House Management System",
      "description": "A fullstack web application to be used by a boarding house environment. Built for tenant useage and landlord management tools with a robust backend and frontend interaction through InertiaJS.",
      "fullDescription": "The Boarding House Management System is a Laravel-based web application for managing tenant records, room occupancy, lease contracts, billing, payments, maintenance requests, visitor logs, and security incidents in one place. It is designed to replace manual filing, disconnected spreadsheets, and paper-based logs with a centralized system for day-to-day boarding house operations.",
      "tags": [
        "React",
        "Typescript",
        "Laravel",
        "InertiaJS",
        "HTM",
        "Tailwind CSS"
      ],
      "category": "Full-stack",
      "githubUrl": "https://github.com/Chams15/BoardingHouseSystem",
      "liveUrl": "https://pulsate-washout-hatchling.ngrok-free.dev",
      "accentColor": "from-blue-600 to-indigo-600"
    },
    {
      "id": "project-2",
      "title": "RAGHobbit",
      "description": "A local RAG Chatbot package implementation of the classic adventure novel The Hobbit by J.R.R. Tolkier",
      "fullDescription": "A sophisticated command-line RAG (Retrieval-Augmented Generation) chatbot for answering questions about J.R.R. Tolkien's \"The Hobbit\". Powered by Ollama, LangChain, and ChromaDB with advanced features including:\n\n    Hybrid retrieval (BM25 + vector search)\n    Contextual compression with FlashRank reranking\n    Chapter-aware filtering\n    Conversation history tracking\n    Streaming responses",
      "tags": [
        "Artificial Intelligence",
        "Python",
        "Ollama API",
        "PyPI"
      ],
      "category": "AI / Machine Learning",
      "githubUrl": "https://github.com/Chams15/RagAgentHobbit",
      "liveUrl": "https://github.com/Chams15/RagAgentHobbit",
      "accentColor": "from-teal-600 to-emerald-600"
    },
    {
      "id": "project-3",
      "title": "Computer Cafe Simulation",
      "description": "This repository contains a discrete-event simulation model for a computer cafe, developed using the Python-based SimPy framework and integrated with a Streamlit graphical user interface (GUI).",
      "fullDescription": "This repository contains a discrete-event simulation model for a computer cafe, developed using the Python-based SimPy framework and integrated with a Streamlit graphical user interface (GUI). The project simulates the daily operational dynamics of a computer cafe, focusing on customer arrival patterns, workstation allocation, queueing delays, and customer reneging behavior. By utilizing real-world statistical distributions, the simulation aims to accurately reflect the varying traffic phases and service times observed in physical computing facilities.\n\n-Interactive Graphical Interface: A Streamlit-based web dashboard allowing for the dynamic adjustment of simulation parameters prior to execution.\n-Real-time System Monitoring: Continuous tracking of simulation state variables, including elapsed simulation time, workstation occupancy, and current queue length.\n-Dynamic Operational Parameters: Configurable operating hours and duration, with automatic alignment of non-stationary traffic patterns to the corresponding real-world time of day.\n-Data Visualization: Automated generation of Matplotlib plots illustrating workstation utilization over the simulation period, categorized by operational phase.\n-Post-Simulation Analytics: Computation of key performance indicators (KPIs), including total customer arrivals, successfully served customers, renege rates, and average queue waiting times.",
      "tags": [
        "Python",
        "Streamlit",
        "SimPy"
      ],
      "category": "Systems",
      "githubUrl": "https://github.com/Chams15/ComputerCafeSimulation",
      "liveUrl": "https://computercafesimulation-pxutpedj8mahtaboqrrqxq.streamlit.app/",
      "accentColor": "from-purple-600 to-fuchsia-600"
    }
  ],
  "skillCategories": [
    {
      "id": "cat-lang",
      "name": "Programming Languages",
      "skills": [
        "TypeScript",
        "Python",
        "Java",
        "SQL (PostgreSQL / MySQL)",
        "HTML5 & CSS3",
        "Javascript",
        "PHP"
      ]
    },
    {
      "id": "cat-arch",
      "name": "Architecture & Systems",
      "skills": [
        "Docker Containerization",
        "GraphQL API Gateways"
      ]
    },
    {
      "id": "cat-frontend",
      "name": "Frontend & Ecosystem",
      "skills": [
        "React",
        "Tailwind CSS Layouts",
        "Laravel",
        "Figma",
        "SimPy & Streamlit",
        "PyTorch & Ollama Cloud API"
      ]
    },
    {
      "id": "cat-cloud",
      "name": "Cloud & Infrastructure",
      "skills": [
        "Amazon Web Services (AWS)",
        "CI/CD Git Workflows",
        "Linux Shell Diagnostics"
      ]
    }
  ],
  "certifications": [
    {
      "id": "cert-aws",
      "title": "Information Technology Specialist in Java",
      "issuer": "Certiport",
      "date": "3/5/2024",
      "credlyUrl": "https://www.credly.com/org/certiport/badge/it-specialist-java",
      "badgeImageUrl": "https://images.credly.com/size/340x340/images/2210b6fe-0eda-415a-8aba-6c1400566728/ITS-Badges_Java_1200px.png",
      "pdfUrl": "https://drive.google.com/file/d/1i94bPUGF29OdCHWaYlzAZREPzciftWdD/view?usp=sharing",
      "verified": true,
      "skillsEarned": [
        "Java",
        "OOP (Object-Oriented Programming)"
      ]
    }
  ],
  "formsparksFormId": "yDJ6FZ8Ug",
  "darkMode": false
}
 
function createPortfolioVersion(data: PortfolioData) {
  const json = JSON.stringify(data);
  let hash = 5381;

  for (let index = 0; index < json.length; index += 1) {
    hash = ((hash << 5) + hash) ^ json.charCodeAt(index);
  }

  return (hash >>> 0).toString(36);
}

export const portfolioDataVersion = createPortfolioVersion(initialPortfolioData);