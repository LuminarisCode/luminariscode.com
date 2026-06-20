"use client";
import { motion } from "framer-motion";
import { Globe, BarChart3, Smartphone, Zap, Palette, Link } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

const icons = [Globe, BarChart3, Smartphone, Zap, Palette, Link];

export default function ServicesSection() {
  const { lang } = useLanguage();
  const t = translations[lang].services;

  return (
    <section id="services" className="py-28 bg-white">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group relative p-7 rounded-2xl border border-gray-100 bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition-colors">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2.5">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.description}</p>
                <ul className="space-y-1.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
