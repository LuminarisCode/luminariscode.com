"use client";
import { motion } from "framer-motion";
import { Cpu, Layers, Sparkles, Rocket } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

const icons = [Cpu, Layers, Sparkles, Rocket];

export default function WhyChooseSection() {
  const { lang } = useLanguage();
  const t = translations[lang].why;

  return (
    <section id="why" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-4">
            {t.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">{t.title}</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.items.map((reason, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={reason.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative p-8 rounded-2xl bg-white border border-gray-100 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-indigo-400 mb-1">{reason.number}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{reason.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
