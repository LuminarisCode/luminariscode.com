"use client";
import { motion } from "framer-motion";
import { techStack } from "@/lib/data";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

const categoryColors: Record<string, string> = {
  Frontend: "bg-blue-50 text-blue-700 border-blue-100",
  Language: "bg-purple-50 text-purple-700 border-purple-100",
  Styling: "bg-cyan-50 text-cyan-700 border-cyan-100",
  Backend: "bg-orange-50 text-orange-700 border-orange-100",
  Database: "bg-green-50 text-green-700 border-green-100",
  ORM: "bg-teal-50 text-teal-700 border-teal-100",
  DevOps: "bg-indigo-50 text-indigo-700 border-indigo-100",
  Cloud: "bg-amber-50 text-amber-700 border-amber-100",
  Cache: "bg-red-50 text-red-700 border-red-100",
  Realtime: "bg-pink-50 text-pink-700 border-pink-100",
  Automation: "bg-orange-50 text-orange-700 border-orange-100",
  "Auth & SSO": "bg-rose-50 text-rose-700 border-rose-100",
  Design: "bg-violet-50 text-violet-700 border-violet-100",
};

export default function TechStackSection() {
  const { lang } = useLanguage();
  const t = translations[lang].tech;

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-4">
            {t.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">{t.title}</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              className={`px-5 py-2.5 rounded-xl border text-sm font-semibold cursor-default hover:scale-105 transition-transform ${categoryColors[tech.category] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}
            >
              {tech.name}
              <span className="ml-2 text-xs opacity-60 font-normal">{tech.category}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
