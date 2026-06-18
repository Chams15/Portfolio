import React, { useState, useMemo } from "react";
import { Search, ExternalLink, Github, Sparkles, Filter, X } from "lucide-react";
import { Project } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Compute all available categories dynamically
  const categories = useMemo(() => {
    const list = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(list)];
  }, [projects]);

  // Filter projects based on selection and query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-12 md:py-16 border-b border-gray-100 dark:border-slate-900">
      <div className="space-y-8">
        
        {/* Section Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#FF5A00]">Works</h3>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
              Interactive Projects
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by tech, title, description..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Categories Pills */}
        <div className="flex flex-wrap gap-2 border-b border-gray-100 dark:border-slate-900 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 dark:bg-indigo-600 border-slate-900 dark:border-indigo-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative bg-white dark:bg-slate-900/40 border border-gray-100 dark:border-slate-900 rounded-xl p-5 hover:border-gray-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="space-y-4">
                  {/* Category Card Tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 px-2.5 py-1 rounded">
                      {project.category}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-amber-500 transition-colors" />
                  </div>

                  {/* Project Title */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 dark:text-slate-100 text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tags & Action Row */}
                <div className="space-y-4 pt-4 mt-4 border-t border-gray-100/65 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200/50 dark:border-slate-700 text-[11px] px-2 py-0.5 rounded font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-gray-400 text-[10px] font-bold self-center">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-[#FF5A00] uppercase tracking-wide group-hover:underline">
                    <span>View breakdown</span>
                    <div className="flex items-center gap-2">
                      {project.githubUrl && <Github className="w-4 h-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" />}
                      {project.liveUrl && <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="col-span-full border border-dashed border-gray-200 dark:border-slate-800 rounded-xl p-12 text-center text-gray-500 dark:text-gray-400 text-sm">
              No projects found matching the keywords.
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Dialog Overlay (Modal Drawer) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-gray-100 dark:border-slate-800 flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-gray-100 dark:border-slate-800 flex items-start justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedProject.title}</h3>
                </div>
                <button
                  className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Core Body */}
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500">Technical Overview</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line font-normal">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500">Technology Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs px-3 py-1 rounded font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="p-5 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center gap-3 justify-end rounded-b-xl">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 text-sm font-semibold transition-all shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                    Github Repository
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-500 text-sm font-semibold transition-all shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Launch Live Site
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
