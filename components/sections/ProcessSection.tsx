"use client";
import { motion } from "framer-motion";
import { MessageSquare, PenLine, Code2, Rocket } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

const icons = [MessageSquare, PenLine, Code2, Rocket];

export default function ProcessSection() {
  const { lang } = useLanguage();
  const t = translations[lang].process;

  return (
    <section id="process" className="py-24 bg-gray-950">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-500/20">
            {t.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-gray-400 max-w-md mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.steps.map((step: { label: string; desc: string }, i: number) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative flex flex-col p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-500/40 transition-colors group"
              >
                {/* Step number */}
                <span className="absolute top-5 right-5 text-xs font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>

                <h3 className="font-bold text-white text-sm mb-1.5">{step.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>

                {/* Connector line (not on last) */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-11 -right-2 w-4 h-px bg-gray-700 z-10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
