export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl: string;
  image: string;
  featured: boolean;
  category: string;
}

export interface Skill {
  name: string;
  level: string;
  icon: string;
}

export interface SkillsData {
  languages: Skill[];
  backend: Skill[];
  databases: Skill[];
  tools: Skill[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}
