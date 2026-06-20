"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function TestimonialsSection() {
  const { lang } = useLanguage();
  const t = translations[lang].testimonials;

  return (
    <section className="py-28 bg-white">
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
          {t.items.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 rounded-2xl border border-gray-100 bg-white hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
            >
              <div className="text-4xl text-indigo-200 font-serif leading-none mb-4">&quot;</div>
              <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">
                    {testimonial.position} · {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
