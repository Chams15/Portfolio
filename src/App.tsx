import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ProfileSection } from "./components/ProfileSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { CertificationsSection } from "./components/CertificationsSection";
import { ContactForm } from "./components/ContactForm";
import { Customizer } from "./components/Customizer";
import { PortfolioData } from "./types";
import { initialPortfolioData, portfolioDataVersion } from "./data";
import { GraduationCap, ArrowUp, Briefcase } from "lucide-react";

const createStorageKey = (version: string) => `undergrad_portfolio_state_v1_${version}`;

const loadPortfolioData = (storageKey: string) => {
  if (typeof window === "undefined") {
    return initialPortfolioData;
  }

  const cached = localStorage.getItem(storageKey);

  if (!cached) {
    return initialPortfolioData;
  }

  try {
    const parsed = JSON.parse(cached);
    if (parsed && parsed.profile && parsed.projects && parsed.skillCategories && parsed.certifications) {
      return parsed;
    }
  } catch (err) {
    console.warn("Could not load customized portfolio from local storage, fallback to default.", err);
  }

  return initialPortfolioData;
};

export default function App() {
  const LOCAL_STORAGE_KEY = createStorageKey(portfolioDataVersion);

  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => loadPortfolioData(LOCAL_STORAGE_KEY));
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setPortfolioData(loadPortfolioData(LOCAL_STORAGE_KEY));
  }, [LOCAL_STORAGE_KEY]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDataChange = (newData: PortfolioData) => {
    setPortfolioData(newData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
  };

  const handleResetData = () => {
    setPortfolioData(initialPortfolioData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen ${portfolioData.darkMode ? "dark bg-slate-950 text-slate-100" : "bg-white text-gray-900"} font-sans selection:bg-indigo-500 selection:text-white antialiased transition-colors duration-300`}>
      <Header 
        profile={portfolioData.profile} 
        darkMode={portfolioData.darkMode}
        onToggleDarkMode={() => handleDataChange({ ...portfolioData, darkMode: !portfolioData.darkMode })}
      />

      <main className="max-w-5xl mx-auto px-4 md:px-6 relative pb-28">
        <div className="absolute top-0 right-0 py-8 text-[11px] font-mono text-gray-350 dark:text-gray-600 pointer-events-none select-none hidden lg:block">
          BUILD // PORTFOLIO_V1.3
        </div>

        <ProfileSection profile={portfolioData.profile} />
        <SkillsSection categories={portfolioData.skillCategories} />
        <ProjectsSection projects={portfolioData.projects} />
        <CertificationsSection certifications={portfolioData.certifications} profile={portfolioData.profile} />
        <ContactForm formsparksFormId={portfolioData.formsparksFormId} />
      </main>

      <footer className="w-full bg-gray-50 dark:bg-slate-900/40 border-t border-gray-100 dark:border-slate-900 py-8 text-center text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <GraduationCap className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span className="font-semibold">{portfolioData.profile.name}</span>
          </div>
          <div className="flex gap-4 items-center text-[11px]">
            <span>Powered by React, Tailwind CSS 4 &amp; Formsparks</span>
          </div>
        </div>
      </footer>

      

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-45 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2.5 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-sm bg-white/90 dark:bg-slate-900/90"
          title="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
