import React from "react";
import { Cpu, ShieldCheck } from "lucide-react";
import { SkillCategory } from "../types";
import { motion } from "motion/react";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  return (
    <section id="skills" className="py-12 md:py-16 border-b border-gray-100 dark:border-slate-900">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#FF5A00]">Competencies</h3>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
              Technical Skillset
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 px-3 py-1.5 rounded-lg font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
            <span>Verified Professional Toolbox</span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              className="bg-white dark:bg-slate-900/40 border border-gray-100 dark:border-slate-900 shadow-sm rounded-xl p-5 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: catIdx * 0.1 }}
            >
              <h4 className="font-semibold text-gray-800 dark:text-slate-200 text-sm tracking-wide uppercase border-b border-gray-100 dark:border-slate-800 pb-2 mb-4 flex items-center justify-between">
                {category.name}
                <span className="text-[10px] bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold px-2 py-0.5 rounded-full">
                  {category.skills.length} Skills
                </span>
              </h4>

              {/* Skills Item List */}
              <div className="flex flex-wrap gap-2 pt-1">
                {category.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-800 rounded-lg transition-colors duration-150 cursor-default select-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
