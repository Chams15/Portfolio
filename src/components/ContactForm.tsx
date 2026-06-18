import React, { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, Sparkles, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactFormProps {
  formsparksFormId: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ formsparksFormId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (Name, Email, Message).");
      return;
    }

    setStatus("loading");
    try {
      // Build Formsparks endpoint URL (handle both full URL and ID formats)
      const endpoint = formsparksFormId.startsWith("http")
        ? formsparksFormId
        : `https://submit-form.com/${formsparksFormId}`;
      
      console.log("Submitting to endpoint:", endpoint);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "No Subject provided",
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const contentType = response.headers.get("content-type") || "";
        let details = "";
        try {
          if (contentType.includes("application/json")) {
            const data = await response.json();
            details = data?.message ? `: ${data.message}` : `: ${JSON.stringify(data)}`;
          } else {
            const text = await response.text();
            details = `: ${text}`;
          }
        } catch (parseErr) {
          details = "";
        }
        console.error("Formsparks submission failed", response.status, details);
        throw new Error(`Unable to transmit message (status ${response.status})${details}. Please confirm Formsparks submission permissions.`);
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected network error has occurred. Please verify your settings.");
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-1">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#FF5A00]">Connect</h3>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
              Get In Touch
            </h2>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-[14px] leading-relaxed font-normal">
            Have an open software initiative, internship inquiry, research workspace request, or just want to discuss distributed databases over coffee? Fill out the contact route.
          </p>

        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <form onSubmit={handleFormSubmit} className="bg-white dark:bg-slate-900/40 border border-gray-200/80 dark:border-slate-900 shadow-sm rounded-xl p-6 space-y-4">
            
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-250 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-lg p-4 text-sm flex gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block">Message Sent Successfully!</strong>
                    Thank you. Your message has been routed to Formsparks endpoint and we will get back to you shortly.
                  </div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-50 dark:bg-rose-950/35 border border-rose-250 dark:border-rose-800 text-rose-800 dark:text-rose-300 rounded-lg p-4 text-sm flex gap-2"
                >
                  <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block">Submission Issue</strong>
                    {errorMessage}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block" htmlFor="name">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="e.g. Robin Peterson"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full text-sm px-3.5 py-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block" htmlFor="email">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="e.g. robin@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-sm px-3.5 py-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="e.g. Internship Inquiry / Software Collaboration"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full text-sm px-3.5 py-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block" htmlFor="message">
                Message Body <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                placeholder="Write your brief message text here..."
                value={formData.message}
                onChange={handleInputChange}
                className="w-full text-sm px-3.5 py-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans align-top"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                status === "loading"
                  ? "bg-slate-400 dark:bg-slate-800 text-white cursor-not-allowed"
                  : "bg-slate-900 dark:bg-indigo-600 border-slate-900 dark:border-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white"
              }`}
            >
              {status === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};
