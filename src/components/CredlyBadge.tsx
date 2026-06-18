import React from "react";
import { Award, ShieldCheck } from "lucide-react";

interface CredlyBadgeProps {
  issuer: string;
  badgeType: string;
  title: string;
}

export const CredlyBadge: React.FC<CredlyBadgeProps> = ({ issuer, badgeType, title }) => {
  // Return sleek, vector-based interactive badges suited for a minimalist developer portfolio.
  // This simulates the official badge icons cleanly without needing external images which could break.
  if (badgeType === "aws-dev") {
    return (
      <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-orange-400 via-amber-500 to-yellow-600 p-[3px] shadow-sm hover:scale-105 transition-transform duration-300">
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-900 rounded-full text-center p-2 text-white overflow-hidden">
          <span className="text-[9px] font-bold tracking-widest text-[#FF9900]">AWS</span>
          <span className="text-[7px] leading-tight font-semibold text-slate-300">CERTIFIED</span>
          <span className="text-[8px] leading-tight font-extrabold text-white mt-0.5 line-clamp-2">DEVELOPER</span>
          <span className="text-[6px] tracking-wider text-amber-500 font-bold mt-1">ASSOCIATE</span>
        </div>
        <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1 border border-slate-900 shadow">
          <ShieldCheck className="w-3   h-3 text-white" />
        </div>
      </div>
    );
  }

  if (badgeType === "gcp-cloud") {
    return (
      <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 via-cyan-500 to-indigo-600 p-[3px] shadow-sm hover:scale-105 transition-transform duration-300">
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-900 rounded-full text-center p-2 text-white overflow-hidden">
          <span className="text-[8px] font-extrabold tracking-wider text-blue-400">Google Cloud</span>
          <span className="text-[7px] leading-tight font-semibold text-slate-300 mt-0.5">CERTIFIED</span>
          <span className="text-[9px] leading-none font-bold text-white mt-1 line-clamp-2">ASSOCIATE</span>
          <span className="text-[6px] text-cyan-400 font-semibold mt-1">ENGINEER</span>
        </div>
        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border border-slate-900 shadow">
          <ShieldCheck className="w-3 h-3 text-white" />
        </div>
      </div>
    );
  }

  if (badgeType === "hashi-tf") {
    return (
      <div className="relative flex items-center justify-center w-24 h-24 rounded-lg bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-600 p-[3px] shadow-sm hover:scale-105 transition-transform duration-300 transform rotate-45">
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-900 rounded-md text-center p-2 text-white overflow-hidden -rotate-45">
          <span className="text-[8px] font-extrabold tracking-wider text-purple-400">HashiCorp</span>
          <span className="text-[7px] leading-tight font-semibold text-slate-300">CERTIFIED</span>
          <span className="text-[9px] leading-none font-black text-white mt-0.5">TERRAFORM</span>
          <span className="text-[6px] text-pink-400 font-bold mt-1">ASSOCIATE</span>
        </div>
        <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-1 border border-slate-900 shadow -rotate-45">
          <ShieldCheck className="w-3 h-3 text-white" />
        </div>
      </div>
    );
  }

  // Check if badgeType is a robust custom image (has http/https or is a base64 encoded png/jpg/svg)
  if (badgeType && (badgeType.startsWith("http") || badgeType.startsWith("data:"))) {
    return (
      <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-1.5 shadow-sm hover:scale-105 transition-transform duration-300">
        <img
          src={badgeType}
          alt={title}
          referrerPolicy="no-referrer"
          className="max-w-full max-h-full object-contain rounded-xl"
        />
        <div className="absolute -bottom-1.5 -right-1.5 bg-teal-500 rounded-full p-1 border border-white dark:border-slate-900 shadow">
          <ShieldCheck className="w-3 h-3 text-white" />
        </div>
      </div>
    );
  }

  // Fallback beautiful custom certificate badge
  return (
    <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-slate-200 via-slate-400 to-slate-500 p-[3px] shadow-sm hover:scale-105 transition-transform duration-300">
      <div className="flex flex-col items-center justify-center w-full h-full bg-white dark:bg-slate-900 rounded-full text-center p-2 text-slate-800 dark:text-white overflow-hidden">
        <Award className="w-4 h-4 text-indigo-500 mb-0.5" />
        <span className="text-[7px] leading-tight font-extrabold text-slate-400 uppercase tracking-widest">{issuer.substring(0, 15)}</span>
        <span className="text-[8px] leading-none font-bold text-slate-900 dark:text-gray-100 mt-1 line-clamp-2 max-w-[70px]">{title}</span>
      </div>
      <div className="absolute -bottom-1 -right-1 bg-[#FF5A00] rounded-full p-1 border border-white dark:border-slate-900 shadow">
        <ShieldCheck className="w-3 h-3 text-white" />
      </div>
    </div>
  );
};
