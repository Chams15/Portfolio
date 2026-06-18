import React from "react";
import { School, Award, MapPin, Calendar, HelpCircle, Code, GraduationCap } from "lucide-react";
import { Profile } from "../types";
import { motion } from "motion/react";

interface ProfileSectionProps {
  profile: Profile;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  // Extract initials for beautiful default avatar if URL is not provided
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <section id="about" className="py-12 md:py-16 border-b border-gray-100 dark:border-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Avatar & Basic Stats */}
        <motion.div 
          className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Avatar Area */}
          <div className="relative group">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border border-gray-200 dark:border-slate-800 shadow-sm"
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-white text-4xl font-extrabold tracking-wider shadow-inner">
                {getInitials(profile.name)}
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-full border-2 border-white dark:border-slate-950 shadow-sm flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {profile.status}
            </div>
          </div>

          <div className="space-y-3 w-full">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
              {profile.name}
            </h1>
            <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
              {profile.title}
            </p>
            <div className="flex flex-wrap gap-y-2 gap-x-4 justify-center lg:justify-start text-sm text-gray-500 dark:text-gray-400 font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gray-400" />
                {profile.location}
              </div>
              
            </div>
          </div>
        </motion.div>

        {/* Right Column: Narrative Info + Education Details */}
        <motion.div 
          className="lg:col-span-8 space-y-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Bio */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#FF5A00]">Biography</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] md:text-base">
              {profile.bio}
            </p>
          </div>

          {/* Education Block */}
          <div className="bg-gray-50 dark:bg-slate-900/40 rounded-xl p-6 border border-gray-100 dark:border-slate-900 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <School className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-slate-100 text-[15px]">
                    {profile.education.institution}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {profile.education.degree} in {profile.education.major}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium sm:self-start bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md border border-gray-200 dark:border-slate-700">
                <Calendar className="w-3.5 h-3.5" />
                Graduating {profile.education.graduationDate}
              </div>
            </div>

            {/* Structured Courseworks */}
            {profile.education.coursework.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <Code className="w-3.5 h-3.5 text-gray-400" />
                  Key Coursework
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {profile.education.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="bg-white dark:bg-slate-800 hover:bg-indigo-50/50 dark:hover:bg-slate-800/80 text-[13px] border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 px-3 py-1 rounded-md transition-colors font-mono"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Awards & Scholarships */}
            {profile.education.awards.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-[#FF5A00]" />
                  Awards & Honors
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[13px] list-none pl-0">
                  {profile.education.awards.map((award, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-slate-800/60 p-2 border border-gray-200/50 dark:border-slate-800/60 rounded-lg">
                      <span className="text-[#FF5A00] font-bold">★</span>
                      <span className="leading-tight">{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
