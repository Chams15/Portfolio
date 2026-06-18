import React, { useState } from "react";
import { 
  Settings, X, Plus, Trash2, CheckCircle, 
  Copy, RefreshCw, User, BookOpen, Code, Award, FormInput,
  Upload, Image, FileText
} from "lucide-react";
import { PortfolioData, Project, SkillCategory, Certification } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface CustomizerProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
  onReset: () => void;
}

export const Customizer: React.FC<CustomizerProps> = ({ data, onChange, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "education" | "projects" | "skills" | "certifications" | "settings">("profile");
  const [copySuccess, setCopySuccess] = useState(false);

  // Helper file reader for image/pdf/svg upload
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (base64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        onComplete(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Helper change handlers
  const updateProfile = (field: string, value: any) => {
    const updated = {
      ...data,
      profile: {
        ...data.profile,
        [field]: value
      }
    };
    onChange(updated);
  };

  const updateEducation = (field: string, value: any) => {
    const updated = {
      ...data,
      profile: {
        ...data.profile,
        education: {
          ...data.profile.education,
          [field]: value
        }
      }
    };
    onChange(updated);
  };

  // Projects list controls
  const handleProjectChange = (idx: number, field: keyof Project, value: any) => {
    const updatedProjects = [...data.projects];
    updatedProjects[idx] = { ...updatedProjects[idx], [field]: value };
    onChange({ ...data, projects: updatedProjects });
  };

  const addProject = () => {
    const newProj: Project = {
      id: `project-${Date.now()}`,
      title: "New Interactive Project",
      description: "Brief summary of what this software achieves.",
      fullDescription: "A deeper overview covering components, consensus mechanics, microservice design, or performance latency gains.",
      tags: ["React", "Node.js", "TypeScript"],
      category: "Full-stack",
      githubUrl: "https://github.com",
      liveUrl: ""
    };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const deleteProject = (idx: number) => {
    const updatedProjects = data.projects.filter((_, i) => i !== idx);
    onChange({ ...data, projects: updatedProjects });
  };

  // Skills handlers
  const updateSkill = (catIdx: number, skillIdx: number, value: string) => {
    const updatedCats = JSON.parse(JSON.stringify(data.skillCategories)) as SkillCategory[];
    updatedCats[catIdx].skills[skillIdx] = value;
    onChange({ ...data, skillCategories: updatedCats });
  };

  const addSkillToCategory = (catIdx: number) => {
    const updatedCats = JSON.parse(JSON.stringify(data.skillCategories)) as SkillCategory[];
    updatedCats[catIdx].skills.push("New Skill Node");
    onChange({ ...data, skillCategories: updatedCats });
  };

  const deleteSkillFromCategory = (catIdx: number, skillIdx: number) => {
    const updatedCats = JSON.parse(JSON.stringify(data.skillCategories)) as SkillCategory[];
    updatedCats[catIdx].skills = updatedCats[catIdx].skills.filter((_, i) => i !== skillIdx);
    onChange({ ...data, skillCategories: updatedCats });
  };

  // Certifications handlers
  const handleCertChange = (idx: number, field: keyof Certification, value: any) => {
    const updatedCerts = [...data.certifications];
    updatedCerts[idx] = { ...updatedCerts[idx], [field]: value };
    onChange({ ...data, certifications: updatedCerts });
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      title: "New Cert Title",
      issuer: "Issuer Organization",
      date: "Month Year",
      credlyUrl: "https://www.credly.com",
      badgeImageUrl: "default",
      verified: true,
      skillsEarned: ["Skill Node A", "Skill Node B"]
    };
    onChange({ ...data, certifications: [...data.certifications, newCert] });
  };

  const deleteCertification = (idx: number) => {
    const updatedCerts = data.certifications.filter((_, i) => i !== idx);
    onChange({ ...data, certifications: updatedCerts });
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const triggerReset = () => {
    if (confirm("Are you sure you want to reset your customized changes and restore the default Berkely Alex Rivera student profile template?")) {
      onReset();
    }
  };

  return (
    <>
      {/* Floating Control Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-tr from-slate-800 to-slate-950 text-white px-5 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl font-medium text-sm group"
        >
          <Settings className="w-4 h-4 animate-spin-slow group-hover:rotate-45 transition-transform" />
          Customize Portfolio
        </button>
      </div>

      {/* Side Customizer Sheet Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs">
            {/* Backdrop click closer */}
            <div className="flex-grow" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-xl bg-white border-l border-gray-100 shadow-2xl h-screen flex flex-col z-10"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-slate-900 text-white rounded-lg">
                    <Settings className="w-5 h-5 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[15px]">Personal Brand Editor</h3>
                    <p className="text-xs text-gray-500 font-medium">Real-time local sandbox modification</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-gray-100 text-[11.5px] uppercase font-bold tracking-wider overflow-x-auto bg-gray-50/50 px-2 select-none shrink-0 sticky top-0">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`px-3.5 py-3 border-b-2 flex items-center gap-1.5 ${
                    activeTab === "profile" ? "border-slate-900 text-slate-900" : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <User className="w-3.5 h-3.5" /> Bio
                </button>
                <button
                  onClick={() => setActiveTab("education")}
                  className={`px-3.5 py-3 border-b-2 flex items-center gap-1.5 ${
                    activeTab === "education" ? "border-slate-900 text-slate-900" : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" /> Academics
                </button>
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`px-3.5 py-3 border-b-2 flex items-center gap-1.5 ${
                    activeTab === "projects" ? "border-slate-900 text-slate-900" : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Code className="w-3.5 h-3.5" /> Projects
                </button>
                <button
                  onClick={() => setActiveTab("skills")}
                  className={`px-3.5 py-3 border-b-2 flex items-center gap-1.5 ${
                    activeTab === "skills" ? "border-slate-900 text-slate-900" : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Award className="w-3.5 h-3.5" /> Skills
                </button>
                <button
                  onClick={() => setActiveTab("certifications")}
                  className={`px-3.5 py-3 border-b-2 flex items-center gap-1.5 ${
                    activeTab === "certifications" ? "border-slate-900 text-slate-900" : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-500" /> Credly
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`px-3.5 py-3 border-b-2 flex items-center gap-1.5 ${
                    activeTab === "settings" ? "border-slate-900 text-slate-900" : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" /> Settings
                </button>
              </div>

              {/* Form Scroll Area */}
              <div className="flex-grow p-6 overflow-y-auto space-y-6">
                
                {/* PROFILE TAB */}
                {activeTab === "profile" && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5A00] border-b border-gray-100 pb-1.5">Profile Info</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                        <input
                          type="text"
                          value={data.profile.name}
                          onChange={(e) => updateProfile("name", e.target.value)}
                          className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Title / Tagline</label>
                        <input
                          type="text"
                          value={data.profile.title}
                          onChange={(e) => updateProfile("title", e.target.value)}
                          className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subtle Headline</label>
                      <input
                        type="text"
                        value={data.profile.subTitle}
                        onChange={(e) => updateProfile("subTitle", e.target.value)}
                        className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Bio Paragraph</label>
                      <textarea
                        value={data.profile.bio}
                        onChange={(e) => updateProfile("bio", e.target.value)}
                        rows={4}
                        className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg"
                      />
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                      <span className="text-xs font-bold uppercase text-slate-700 block">Profile Picture (Avatar)</span>
                      <div className="flex items-center gap-4">
                        {/* Current avatar preview */}
                        <div className="w-16 h-16 rounded-xl border border-gray-200 bg-white overflow-hidden flex-shrink-0 flex items-center justify-center shadow-xs">
                          {data.profile.avatarUrl ? (
                            <img
                              src={data.profile.avatarUrl}
                              alt="Avatar Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-xs font-bold text-gray-300">Initials</div>
                          )}
                        </div>
                        
                        {/* File selector or URL */}
                        <div className="flex-grow space-y-2">
                          <div className="flex items-center gap-2">
                            <label className="bg-white hover:bg-gray-105 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer inline-flex items-center gap-1.5 transition-all shadow-sm">
                              <Upload className="w-3.5 h-3.5 text-gray-500" />
                              <span>Upload Image/SVG</span>
                              <input
                                type="file"
                                accept="image/*,.svg"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, (base64) => updateProfile("avatarUrl", base64))}
                              />
                            </label>
                            {data.profile.avatarUrl && (
                              <button
                                type="button"
                                onClick={() => updateProfile("avatarUrl", "")}
                                className="text-rose-600 hover:text-rose-800 text-xs font-semibold px-2 py-1.5 rounded-lg border border-transparent bg-transparent cursor-pointer"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-400">Supports JPG, PNG, WebP or SVG vectors.</p>
                        </div>
                      </div>

                      {/* URL backup input */}
                      <div className="space-y-1 pt-1 bg-white p-2.5 rounded-lg border border-gray-200/60">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Or Paste Profile Photo URL</label>
                        <input
                          type="text"
                          placeholder="https://example.com/avatar.png"
                          value={data.profile.avatarUrl}
                          onChange={(e) => updateProfile("avatarUrl", e.target.value)}
                          className="w-full text-xs px-2.5 py-1 bg-slate-50 border border-gray-200 rounded-md text-gray-700 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Hiring Tag</label>
                      <select
                        value={data.profile.status}
                        onChange={(e) => updateProfile("status", e.target.value)}
                        className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg bg-white"
                      >
                          <option value="Looking for full-time">Looking for full-time</option>
                          <option value="Internal Search">Internal Search</option>
                          <option value="Open to opportunities">Open to opportunities</option>
                          <option value="Student">Student</option>
                        </select>
                    </div>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5A00] border-b border-gray-100 pb-1.5 pt-4">Social Accounts</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                        <input
                          type="text"
                          value={data.profile.email}
                          onChange={(e) => updateProfile("email", e.target.value)}
                          className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Github Link</label>
                        <input
                          type="text"
                          value={data.profile.githubUrl}
                          onChange={(e) => updateProfile("githubUrl", e.target.value)}
                          className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Linkedin Link</label>
                        <input
                          type="text"
                          value={data.profile.linkedinUrl}
                          onChange={(e) => updateProfile("linkedinUrl", e.target.value)}
                          className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Twitter Link</label>
                        <input
                          type="text"
                          value={data.profile.twitterUrl}
                          onChange={(e) => updateProfile("twitterUrl", e.target.value)}
                          className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* EDUCATION TAB */}
                {activeTab === "education" && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5A00] border-b border-gray-100 pb-1.5">Education Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Institution / School</label>
                        <input
                          type="text"
                          value={data.profile.education.institution}
                          onChange={(e) => updateEducation("institution", e.target.value)}
                          className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Degree Degree</label>
                        <input
                          type="text"
                          value={data.profile.education.degree}
                          onChange={(e) => updateEducation("degree", e.target.value)}
                          className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Major Subject</label>
                        <input
                          type="text"
                          value={data.profile.education.major}
                          onChange={(e) => updateEducation("major", e.target.value)}
                          className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">GPA Metric</label>
                        <input
                          type="text"
                          value={data.profile.education.gpa}
                          onChange={(e) => updateEducation("gpa", e.target.value)}
                          className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Graduation Target Date</label>
                      <input
                        type="text"
                        value={data.profile.education.graduationDate}
                        onChange={(e) => updateEducation("graduationDate", e.target.value)}
                        className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Key Courseworks (Comma Separated)</label>
                      <textarea
                        value={data.profile.education.coursework.join(", ")}
                        onChange={(e) => updateEducation("coursework", e.target.value.split(",").map((s) => s.trim()))}
                        rows={3}
                        className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg font-mono text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Awards & Scholarships (One Per Line)</label>
                      <textarea
                        value={data.profile.education.awards.join("\n")}
                        onChange={(e) => updateEducation("awards", e.target.value.split("\n").filter((s) => s.trim()))}
                        rows={3}
                        className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* PROJECTS TAB */}
                {activeTab === "projects" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5A00]">Manage Portfolio Projects</h4>
                      <button
                        onClick={addProject}
                        className="flex items-center gap-1 bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded hover:bg-slate-800 transition"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Project
                      </button>
                    </div>

                    <div className="space-y-6">
                      {data.projects.map((project, idx) => (
                        <div key={project.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative space-y-3">
                          <button
                            onClick={() => deleteProject(idx)}
                            className="absolute top-4 right-4 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-800 p-1 rounded-md border border-gray-200/60 shadow-sm"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="text-[10px] font-bold text-gray-400 uppercase">PROJECT #{idx + 1}</div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Title</label>
                              <input
                                type="text"
                                value={project.title}
                                onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                                className="w-full text-sm bg-white px-3 py-1.5 border border-gray-200 rounded-lg"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
                              <select
                                value={project.category}
                                onChange={(e) => handleProjectChange(idx, "category", e.target.value)}
                                className="w-full text-sm bg-white px-3 py-1.5 border border-gray-200 rounded-lg"
                              >
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Full-stack">Full-stack</option>
                                <option value="Systems">Systems</option>
                                <option value="AI / Machine Learning">AI / Machine Learning</option>
                                <option value="Mobile">Mobile</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Simple Description</label>
                            <input
                              type="text"
                              value={project.description}
                              onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                              className="w-full text-sm bg-white px-3 py-1.5 border border-gray-200 rounded-lg"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Detailed Description Breakdown</label>
                            <textarea
                              value={project.fullDescription}
                              onChange={(e) => handleProjectChange(idx, "fullDescription", e.target.value)}
                              rows={3}
                              className="w-full text-sm bg-white px-3 py-1.5 border border-gray-200 rounded-lg"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Technologies Tags (Comma Separated)</label>
                            <input
                              type="text"
                              value={project.tags.join(", ")}
                              onChange={(e) => handleProjectChange(idx, "tags", e.target.value.split(",").map((t) => t.trim()))}
                              className="w-full text-sm bg-white px-3 py-1.5 border border-gray-200 rounded-lg font-mono text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">GitHub Link</label>
                              <input
                                type="text"
                                value={project.githubUrl || ""}
                                onChange={(e) => handleProjectChange(idx, "githubUrl", e.target.value)}
                                className="w-full text-sm bg-white px-3 py-1.5 border border-gray-200 rounded-lg"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Demo Site Link</label>
                              <input
                                type="text"
                                value={project.liveUrl || ""}
                                onChange={(e) => handleProjectChange(idx, "liveUrl", e.target.value)}
                                className="w-full text-sm bg-white px-3 py-1.5 border border-gray-200 rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SKILLS TAB */}
                {activeTab === "skills" && (
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5A00] border-b border-gray-100 pb-1.5">Configure Skills</h4>
                    
                    {data.skillCategories.map((category, catIdx) => (
                      <div key={category.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold uppercase text-slate-800 tracking-wider">
                            {category.name}
                          </span>
                          <button
                            onClick={() => addSkillToCategory(catIdx)}
                            className="bg-white hover:bg-slate-100 border border-gray-200 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded"
                          >
                            + Add Skill Node
                          </button>
                        </div>

                        <div className="space-y-2">
                          {category.skills.map((skill, skillIdx) => (
                            <div key={skillIdx} className="flex items-center gap-3 bg-white p-2 text-sm border border-gray-200/50 rounded-lg">
                              <input
                                type="text"
                                value={skill}
                                onChange={(e) => updateSkill(catIdx, skillIdx, e.target.value)}
                                className="flex-grow px-2 py-1 text-xs border border-gray-200 rounded font-medium text-gray-800"
                              />
                              <button
                                onClick={() => deleteSkillFromCategory(catIdx, skillIdx)}
                                className="text-rose-500 hover:text-rose-700 p-1 shrink-0"
                                title="Delete skill node"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CERTIFICATIONS TAB */}
                {activeTab === "certifications" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5A00]">Credly Credentials</h4>
                      <button
                        onClick={addCertification}
                        className="flex items-center gap-1 bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded hover:bg-slate-800 transition"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Certification
                      </button>
                    </div>

                    <div className="space-y-6">
                      {data.certifications.map((cert, idx) => (
                        <div key={cert.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative space-y-3">
                          <button
                            onClick={() => deleteCertification(idx)}
                            className="absolute top-4 right-4 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-800 p-1 rounded-md border border-gray-200/60 shadow-sm"
                            title="Delete certification"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="text-[10px] font-bold text-gray-400 uppercase">CREDENTIAL #{idx + 1}</div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Certificate Title</label>
                            <input
                              type="text"
                              value={cert.title}
                              onChange={(e) => handleCertChange(idx, "title", e.target.value)}
                              className="w-full text-sm bg-white px-3 py-1.5 border border-gray-200 rounded-lg"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Issuer Organization</label>
                              <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => handleCertChange(idx, "issuer", e.target.value)}
                                className="w-full text-sm bg-white px-3 py-1.5 border border-gray-200 rounded-lg"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Obtain Date</label>
                              <input
                                type="text"
                                value={cert.date}
                                onChange={(e) => handleCertChange(idx, "date", e.target.value)}
                                className="w-full text-sm bg-white px-3 py-1.5 border border-gray-200 rounded-lg"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Credly URL Verification</label>
                              <input
                                type="text"
                                value={cert.credlyUrl}
                                onChange={(e) => handleCertChange(idx, "credlyUrl", e.target.value)}
                                className="w-full text-sm bg-white px-3 py-1.5 border border-gray-200 rounded-lg"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Vector Badge Type</label>
                              <select
                                value={cert.badgeImageUrl}
                                onChange={(e) => handleCertChange(idx, "badgeImageUrl", e.target.value)}
                                className="w-full text-sm bg-white px-3 py-1.5 border border-gray-200 rounded-lg"
                              >
                                <option value="aws-dev">AWS Certified Developer</option>
                                <option value="gcp-cloud">GCP Associate Cloud Engineer</option>
                                <option value="hashi-tf">HashiCorp Terraform Associate</option>
                                <option value="generic">Standard / Custom Badge</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Skills Earned (Comma Separated)</label>
                            <input
                              type="text"
                              value={cert.skillsEarned.join(", ")}
                              onChange={(e) => handleCertChange(idx, "skillsEarned", e.target.value.split(",").map((s) => s.trim()))}
                              className="w-full text-sm bg-white px-3 py-1.5 border border-gray-200 rounded-lg font-mono text-xs"
                            />
                          </div>

                          {/* Badge & Actual Certificate Upload and URL block */}
                          <div className="pt-3 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {/* Certificate Badge Block */}
                            <div className="space-y-2 bg-white/70 p-3 rounded-lg border border-gray-200 shadow-3xs">
                              <div className="flex items-center justify-between font-sans">
                                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Credential Badge Icon</span>
                                <span className="text-[9px] text-gray-400">Displays on grid</span>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                {/* Badge preview or general indicator */}
                                <div className="w-10 h-10 bg-slate-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                  {cert.badgeImageUrl && !["aws-dev", "gcp-cloud", "hashi-tf", "generic", "default"].includes(cert.badgeImageUrl) ? (
                                    <img src={cert.badgeImageUrl} alt="Badge Preview" className="w-full h-full object-contain" />
                                  ) : (
                                    <Award className="w-5 h-5 text-indigo-500" />
                                  )}
                                </div>

                                <div className="flex-grow space-y-1">
                                  <label className="bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded cursor-pointer inline-flex items-center gap-1 transition shadow-xs">
                                    <Upload className="w-3 h-3 text-gray-500" />
                                    <span>Upload Badge Image/SVG</span>
                                    <input
                                      type="file"
                                      accept="image/*,.svg"
                                      className="hidden"
                                      onChange={(e) => handleFileChange(e, (base64) => handleCertChange(idx, "badgeImageUrl", base64))}
                                    />
                                  </label>
                                  {cert.badgeImageUrl && !["aws-dev", "gcp-cloud", "hashi-tf", "generic", "default"].includes(cert.badgeImageUrl) && (
                                    <button
                                      type="button"
                                      onClick={() => handleCertChange(idx, "badgeImageUrl", "generic")}
                                      className="text-rose-600 hover:text-rose-800 text-[10px] font-bold ml-2 underline cursor-pointer"
                                    >
                                      Reset
                                    </button>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block">Or Badge Image/SVG URL</label>
                                <input
                                  type="text"
                                  placeholder="https://example.com/badge.svg"
                                  value={cert.badgeImageUrl && !["aws-dev", "gcp-cloud", "hashi-tf", "generic", "default"].includes(cert.badgeImageUrl) ? cert.badgeImageUrl : ""}
                                  onChange={(e) => handleCertChange(idx, "badgeImageUrl", e.target.value || "generic")}
                                  className="w-full text-xs px-2 py-1 bg-white border border-gray-200 rounded-md font-mono"
                                />
                              </div>
                            </div>

                            {/* Actual Certificate Document Block */}
                            <div className="space-y-2 bg-white/70 p-3 rounded-lg border border-gray-200 shadow-3xs">
                              <div className="flex items-center justify-between font-sans">
                                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Actual Certificate Doc</span>
                                <span className="text-[9px] text-gray-400">PDF / Image / SVG</span>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                  {cert.pdfUrl ? (
                                    cert.pdfUrl.startsWith("data:application/pdf") || cert.pdfUrl.toLowerCase().includes(".pdf") ? (
                                      <FileText className="w-5 h-5 text-red-500" />
                                    ) : (
                                      <img src={cert.pdfUrl} alt="Cert Preview" className="w-full h-full object-contain" />
                                    )
                                  ) : (
                                    <span className="text-[9px] text-gray-400 font-bold">Dynamic</span>
                                  )}
                                </div>

                                <div className="flex-grow space-y-1">
                                  <label className="bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded cursor-pointer inline-flex items-center gap-1 transition shadow-xs">
                                    <Upload className="w-3 h-3 text-gray-500" />
                                    <span>Upload Doc/PDF/SVG</span>
                                    <input
                                      type="file"
                                      accept="image/*,.pdf,.svg"
                                      className="hidden"
                                      onChange={(e) => handleFileChange(e, (base64) => handleCertChange(idx, "pdfUrl", base64))}
                                    />
                                  </label>
                                  {cert.pdfUrl && (
                                    <button
                                      type="button"
                                      onClick={() => handleCertChange(idx, "pdfUrl", undefined)}
                                      className="text-rose-600 hover:text-rose-800 text-[10px] font-bold ml-2 underline cursor-pointer"
                                    >
                                      Clear
                                    </button>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block">Or Certificate PDF/Image URL</label>
                                <input
                                  type="text"
                                  placeholder="https://example.com/certificate.pdf"
                                  value={cert.pdfUrl || ""}
                                  onChange={(e) => handleCertChange(idx, "pdfUrl", e.target.value || undefined)}
                                  className="w-full text-xs px-2 py-1 bg-white border border-gray-200 rounded-md font-mono"
                                />
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SETTINGS / EXPORT TAB */}
                {activeTab === "settings" && (
                  <div className="space-y-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5A00] border-b border-gray-100 pb-1.5">Settings & Configuration</h4>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Formsparks Active Form ID</label>
                      <input
                        type="text"
                        value={data.formsparksFormId}
                        onChange={(e) => onChange({ ...data, formsparksFormId: e.target.value })}
                        className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg font-mono text-xs"
                      />
                      <p className="text-[11px] text-gray-400">
                        Replace this value with your specific Formsparks ID (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">MyAb12Cd</code>) to direct contact submissions directly to your real developer mailbox.
                      </p>
                    </div>

                    <div className="border border-indigo-100 bg-indigo-50/40 p-4 rounded-xl space-y-3.5">
                      <span className="text-xs font-bold uppercase text-indigo-700 block">Export Configuration</span>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        You can copy the entire compiled JSON state representing your custom portfolio, saving it or pasting it inside code templates.
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={handleCopyJSON}
                          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
                        >
                          {copySuccess ? (
                            <>
                              <CheckCircle className="w-4 h-4" /> Copied Code!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" /> Copy Portfolio JSON
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-gray-100 bg-slate-50 flex items-center justify-between sticky bottom-0 z-10 shrink-0">
                <button
                  onClick={triggerReset}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-semibold hover:underline"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Revert to Default
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm"
                >
                  Save / Close Panel
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
