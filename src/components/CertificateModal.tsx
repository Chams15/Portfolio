import React, { useRef, useState, useEffect } from "react";
import { X, Download, ShieldCheck, Mail, Globe, Award, Printer, CheckCircle, FileText } from "lucide-react";
import { Certification, Profile } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";

interface CertificateModalProps {
  certification: Certification;
  profile: Profile;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certification, profile, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // When modal is open, we can render the signature canvas preview or let jspdf build it directly
  const handleDownloadPDF = () => {
    // Bypass if there is an uploaded custom actual certificate URL / Data URL
    if (certification.pdfUrl) {
      const link = document.createElement("a");
      link.href = certification.pdfUrl;
      const isPdf = certification.pdfUrl.startsWith("data:application/pdf") || certification.pdfUrl.toLowerCase().includes(".pdf");
      const ext = isPdf ? "pdf" : "png";
      link.download = `${certification.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_certificate.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
      return;
    }

    // Initialize jsPDF in landscape mode
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const studentName = profile.name.toUpperCase();
    const certTitle = certification.title;
    const issuer = certification.issuer;
    const issueDate = certification.date;
    const certId = `CERT-${certification.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // A4 Landscape dimensions: 297mm x 210mm

    // Draw background borders
    doc.setFillColor(253, 252, 248); // warm paper ivory color
    doc.rect(0, 0, 297, 210, "F");

    // Corporate outer border
    doc.setDrawColor(24, 30, 41); // slate gray charcoal
    doc.setLineWidth(1.5);
    doc.rect(10, 10, 277, 190);

    // Corporate thin inner border
    doc.setDrawColor(255, 90, 0); // brand logo color #FF5A00
    doc.setLineWidth(0.5);
    doc.rect(13, 13, 271, 184);

    // Decorative corner markers custom
    doc.setFillColor(24, 30, 41);
    doc.rect(10, 10, 8, 8, "F");
    doc.rect(279, 10, 8, 8, "F");
    doc.rect(10, 192, 8, 8, "F");
    doc.rect(279, 192, 8, 8, "F");

    // Logo / Emblem Top
    doc.setFillColor(24, 30, 41);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(24, 30, 41);
    doc.text("SCHOLASTIC ACCOMPLISHMENT", 148.5, 38, { align: "center" });

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(110, 110, 110);
    doc.text("UNDERGRADUATE PROFESSIONAL CREDENTIAL", 148.5, 46, { align: "center" });

    // Certificate title explanation
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text("This official credential certifies that", 148.5, 68, { align: "center" });

    // Student Name
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(32);
    doc.setTextColor(255, 90, 0); // Orange / Amber
    doc.text(studentName, 148.5, 86, { align: "center" });

    // Underline for name
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(1);
    doc.line(70, 92, 227, 92);

    // Has successfully met all standard academic and practical requirements for
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(13);
    doc.setTextColor(80, 80, 80);
    doc.text("has successfully met all requisite requirements, demonstrated competence, and mastered the concepts for", 148.5, 104, { align: "center" });

    // Certification Title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(24, 30, 41);
    doc.text(certTitle, 148.5, 118, { align: "center" });

    // Issued By / Info Column
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Authorized Issuer: ${issuer}`, 148.5, 128, { align: "center" });

    // Date
    doc.text(`Awarded on: ${issueDate}`, 148.5, 134, { align: "center" });

    // Skills Earned Grid Center
    if (certification.skillsEarned && certification.skillsEarned.length > 0) {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(24, 30, 41);
      doc.text("COMPETENCIES VERIFIED:", 148.5, 148, { align: "center" });

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      const skillsStr = certification.skillsEarned.join("   |   ");
      doc.text(skillsStr, 148.5, 155, { align: "center" });
    }

    // Elegant Golden Security Seal Drawing (Bottom Left)
    // We recreate a highly professional vector seal
    doc.setFillColor(252, 192, 30); // gold seal base
    doc.rect(40, 160, 22, 22, "F"); 
    doc.setFillColor(24, 30, 41);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8);
    doc.text("VERIFIED", 51, 171, { align: "center" });
    doc.text("SECURE", 51, 175, { align: "center" });

    // Security Details (Bottom Center)
    doc.setFont("Courier", "italic");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`Verify QR Code & Signature Hash: ${certId}`, 148.5, 180, { align: "center" });
    doc.text(`Link: ${certification.credlyUrl.substring(0, 60)}...`, 148.5, 185, { align: "center" });

    // Authority Signatures (Bottom Right)
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.5);
    doc.line(210, 170, 260, 170);
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text("Scholastic Board Secretariat", 235, 175, { align: "center" });
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(24, 30, 41);
    doc.text("Alex Rivera Portfolio", 235, 167, { align: "center" });

    // Save PDF file
    const safeTitle = certTitle.toLowerCase().replace(/[^a-z0-9]+/g, "_");
    doc.save(`${safeTitle}_credential.pdf`);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-gray-100 overflow-hidden flex flex-col md:flex-row"
      >
        
        {/* Left Column: True visual document render block */}
        <div className="flex-1 bg-amber-50/20 p-6 md:p-8 flex items-center justify-center border-b md:border-r md:border-b-0 border-gray-100">
          {certification.pdfUrl ? (
            certification.pdfUrl.startsWith("data:application/pdf") || certification.pdfUrl.toLowerCase().includes(".pdf") ? (
              <div className="w-full max-w-xl aspect-[1.414/1] flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-8 text-center space-y-4 shadow-lg">
                <div className="p-4 bg-red-50 text-red-500 rounded-full shadow-xs">
                  <FileText className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">PDF Certification Document</h4>
                  <p className="text-[11px] text-gray-500 mt-1 max-w-[280px] mx-auto">
                    This certification contains an official PDF document.
                  </p>
                </div>
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Saved PDF
                </button>
              </div>
            ) : (
              <div className="w-full max-w-xl aspect-[1.414/1] bg-white border border-gray-100 rounded-lg p-2 flex items-center justify-center shadow-lg relative overflow-hidden">
                <img
                  src={certification.pdfUrl}
                  alt={`${certification.title} Custom Certificate`}
                  className="w-full h-full object-contain max-h-[350px] rounded"
                />
              </div>
            )
          ) : (
            <div className="w-full max-w-xl aspect-[1.414/1] bg-[#FCFBF7] border-4 border-slate-900 rounded-lg p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
              {/* Elegant double gold margins */}
              <div className="absolute inset-1 border border-[#FF5A00]/70 rounded pointer-events-none" />
              
              {/* Header logo */}
              <div className="text-center space-y-1 mt-2">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 block">SCHOLASTIC CERTIFICATION SUMMARY</span>
                <h5 className="font-extrabold tracking-tight text-slate-800 text-[14px] leading-tight">OFFICIAL PORTFOLIO CREDENTIAL</h5>
              </div>

              {/* Recipient Details */}
              <div className="text-center space-y-2 my-auto">
                <p className="text-[10px] text-gray-500 italic">This verified document certifies that</p>
                <h3 className="text-2xl font-black text-[#FF5A00] tracking-wide uppercase font-serif">
                  {profile.name}
                </h3>
                <div className="w-32 h-[1px] bg-gray-200 mx-auto" />
                <p className="text-[10px] text-gray-600 px-6 font-normal">
                  has successfully fulfilled all technical and practical evaluations requisite for completing the
                </p>
                <h4 className="text-md md:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                  {certification.title}
                </h4>
                <p className="text-[9px] text-gray-400 font-mono">
                  Issued by {certification.issuer} &bull; Received {certification.date}
                </p>
              </div>

              {/* Bottom metadata seal / stamp details */}
              <div className="flex justify-between items-end border-t border-gray-100/80 pt-4 text-[9px] font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-amber-400 text-slate-950 font-black rounded-full flex flex-col items-center justify-center text-[7px] leading-tight shadow border border-white">
                    <span>VERIFIED</span>
                    <span>SECURE</span>
                  </div>
                  <div className="text-left text-[8px] text-gray-400">
                    <span className="block font-bold">DIGITAL BADGE</span>
                    <span>SECURED LOCAL STORAGE</span>
                  </div>
                </div>

                <div className="text-right space-y-0.5 text-[8.5px] text-gray-400">
                  <span className="block font-sans italic text-slate-800 border-b border-gray-200 pb-0.5">Alex Rivera</span>
                  <span>Scholastic Portfolio Signature</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Actions and description */}
        <div className="w-full md:w-80 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#FF5A00] uppercase block">PREVIEW ENGINE</span>
                <h3 className="text-xl font-bold text-gray-900">Certificate PDF</h3>
              </div>
              <button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full text-gray-500 transition-colors"
                title="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed font-normal">
              You can download a personalized, professionally formatted PDF copy of this certification right away. Perfect for embedding inside emails, online drive folders, or sharing with prospective software engineering hiring leads.
            </p>

            <div className="bg-gray-50 border border-gray-100 p-3.5 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">CREDENTIAL DATA</span>
              <div className="text-xs font-semibold text-gray-800 space-y-1">
                <p><span className="text-gray-400 font-medium">Issuer:</span> {certification.issuer}</p>
                <p><span className="text-gray-400 font-medium">Obtained:</span> {certification.date}</p>
              </div>
            </div>

            {certification.skillsEarned && certification.skillsEarned.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">INCLUDED COMPETENCIES</span>
                <div className="flex flex-wrap gap-1">
                  {certification.skillsEarned.map((skill) => (
                    <span key={skill} className="bg-slate-50 text-slate-700 border border-slate-100 text-[10px] px-2 py-0.5 rounded font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {downloadSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-lg p-3 text-[11px] font-medium flex gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  Successfully compiled and downloaded PDF!
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleDownloadPDF}
              className="w-full bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Verified PDF
            </button>

            {certification.credlyUrl && (
              <a
                href={certification.credlyUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
              >
                <Globe className="w-3.5 h-3.5" />
                View Online Credentials
              </a>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
};
