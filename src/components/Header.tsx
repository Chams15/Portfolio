import React, { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { Profile } from "../types";

interface HeaderProps {
  profile: Profile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ profile, darkMode, onToggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header className="sticky top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-900 z-30 select-none transition-colors">
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        {/* Name / Brand initials */}
        <a href="#about" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-800 border border-slate-700 flex items-center justify-center text-white text-xs font-black tracking-widest group-hover:bg-indigo-600 transition-colors duration-300">
            {profile.name.split(" ").map((n) => n[0]).join("")}
          </span>
          <span className="font-bold text-gray-900 dark:text-slate-100 tracking-tight text-sm hidden sm:inline-block">
            {profile.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white uppercase tracking-widest transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social Link Badges & Dark Mode Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3">
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {profile.twitterUrl && (
              <a
                href={profile.twitterUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors"
                title="Send Mail"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="w-[1px] h-4 bg-gray-200 dark:bg-slate-800" />

          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-lg text-gray-550 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme mode"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-500 animate-pulse" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Trigger & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-lg text-gray-550 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme mode"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-900 px-4 py-4 space-y-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white uppercase tracking-widest block transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-slate-900">
            {profile.githubUrl && (
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {profile.twitterUrl && (
              <a href={profile.twitterUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
