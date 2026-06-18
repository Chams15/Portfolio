export interface Education {
  institution: string;
  degree: string;
  major: string;
  graduationDate: string;
  gpa: string;
  coursework: string[];
  awards: string[];
}

export interface Profile {
  name: string;
  title: string;
  subTitle: string;
  bio: string;
  location: string;
  avatarUrl: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  status: "Looking for full-time" | "Internal Search" | "Open to opportunities" | "Student";
  education: Education;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  category: "Frontend" | "Backend" | "Full-stack" | "AI / Machine Learning" | "Mobile" | "Systems";
  githubUrl?: string;
  liveUrl?: string;
  accentColor?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credlyUrl: string;
  badgeImageUrl: string;
  verified: boolean;
  skillsEarned: string[];
  pdfUrl?: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skillCategories: SkillCategory[];
  certifications: Certification[];
  formsparksFormId: string;
  darkMode?: boolean;
}
