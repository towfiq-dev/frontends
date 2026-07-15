

import {
  FULL_STACK_DOWNLOAD_CV_URL,
  MERN_STACK_DOWNLOAD_CV_URL,
  FRONTEND_DOWNLOAD_CV_URL,
  BACKEND_DOWNLOAD_CV_URL,
  REACT_DOWNLOAD_CV_URL,
} from "@/components/lib/constants";

export const DOWNLOAD_CV_POSITIONS = [
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    description: "End-to-end web apps — frontend, backend & database",
    icon: "fullStack",
    resumeUrl: FULL_STACK_DOWNLOAD_CV_URL,
  },
  {
    id: "mern-stack-developer",
    title: "MERN Stack Developer",
    description: "MongoDB, Express, React & Node.js focused experience",
    icon: "mern",
    resumeUrl: MERN_STACK_DOWNLOAD_CV_URL,
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    description: "Modern, accessible & performant user interfaces",
    icon: "frontend",
    resumeUrl: FRONTEND_DOWNLOAD_CV_URL,
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    description: "APIs, databases, authentication & server architecture",
    icon: "backend",
    resumeUrl: BACKEND_DOWNLOAD_CV_URL,
  },
  {
    id: "react-developer",
    title: "React Developer",
    description: "Component-driven UIs with React & its ecosystem",
    icon: "react",
    resumeUrl: REACT_DOWNLOAD_CV_URL,
  },
];