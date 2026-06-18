import React, { useState } from "react";
import { ShieldCheck, ExternalLink, Award, Sparkles, FileText, Download } from "lucide-react";
import { Certification, Profile } from "../types";
import { CredlyBadge } from "./CredlyBadge";
import { CertificateModal } from "./CertificateModal";
import { motion, AnimatePresence } from "motion/react";

interface CertificationsSectionProps {
  certifications: Certification[];
  profile: Profile;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications, profile }) => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-12 md:py-16 border-b border-gray-100 dark:border-slate-900">
      <div className="space-y-6">
        
        {/* Header Block */}
        <div className="space-y-1">
          <h3 className="text-xs uppercase font-bold tracking-widest text-[#FF5A00]">Credentials</h3>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
            Professional Certifications
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl font-normal leading-relaxed">
            Verified technical badges of competency. You can view, verify online, or dynamically generate and download a custom verified PDF copy of each certificate.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certifications.map((certification, idx) => (
            <motion.div
              key={certification.id}
              className="bg-white dark:bg-slate-900/40 border border-gray-100 dark:border-slate-900 rounded-xl p-5 hover:border-gray-200 dark:hover:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-all relative overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              {/* Left Column: Visual Vector Badge */}
              <div className="flex-shrink-0 self-center">
                <CredlyBadge
                  issuer={certification.issuer}
                  badgeType={certification.badgeImageUrl}
                  title={certification.title}
                />
              </div>

              {/* Right Column: Title + Metadata Info */}
              <div className="flex-grow space-y-3 w-full text-center sm:text-left">
                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-1.5">
                    <h4 className="font-bold text-gray-900 dark:text-slate-100 text-[15px] hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" onClick={() => setSelectedCert(certification)}>
                      {certification.title}
                    </h4>
                    {certification.verified && (
                      <span className="self-center flex items-center gap-1 bg-teal-100/10 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-500/30 shrink-0">
                        <ShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 font-sans uppercase tracking-wider">
                    Issued by {certification.issuer} — Obtained {certification.date}
                  </p>
                </div>

                {/* Skills Earned tags on Credly */}
                {certification.skillsEarned.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Skills Earned
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                      {certification.skillsEarned.map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-705 text-gray-600 dark:text-slate-300 border border-gray-200/50 dark:border-slate-800/60 text-[11px] px-2.5 py-0.5 rounded font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons: Verification & PDF Downloads */}
                <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <button
                    onClick={() => setSelectedCert(certification)}
                    className="inline-flex items-center gap-1.5 text-xs text-white bg-slate-900 dark:bg-indigo-600 border border-slate-950 dark:border-indigo-600 font-bold hover:bg-slate-800 dark:hover:bg-indigo-500 px-3 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    Download PDF Certificate
                  </button>

                  <a
                    href={certification.credlyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-slate-300 font-semibold hover:underline bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 transition-colors"
                  >
                    Verify on Credly
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Dialog */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal
            certification={selectedCert}
            profile={profile}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
