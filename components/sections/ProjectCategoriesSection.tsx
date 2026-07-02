"use client";
import { motion } from "framer-motion";
import { Zap, Rocket, Factory, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

const icons = [Zap, Rocket, Factory];

export default function ProjectCategoriesSection() {
  const { lang } = useLanguage();
  const t = translations[lang].projectCategories;

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.tiers.map((tier, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col p-7 rounded-2xl border border-gray-100 bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2.5">{tier.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{tier.description}</p>

                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  {tier.suitableLabel}
                </div>
                <ul className="space-y-1.5 mb-5">
                  {tier.suitableFor.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Clock className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                    {tier.timelineLabel}: {tier.timelineValue}
                  </div>
                  {tier.timelineNote && (
                    <p className="text-xs text-gray-400 mt-1 mb-4">{tier.timelineNote}</p>
                  )}
                  <a
                    href="#contact"
                    className={`group w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors ${
                      tier.timelineNote ? "" : "mt-4"
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
