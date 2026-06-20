"use client";
import { motion } from "framer-motion";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

const statusStyles = {
  Active: "bg-green-500/10 text-green-400 border border-green-500/20",
  Beta: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  "Coming Soon": "bg-gray-500/10 text-gray-400 border border-gray-500/20",
};

export default function ProductsSection() {
  const { lang } = useLanguage();
  const t = translations[lang].products;

  const getStatusLabel = (status: "Active" | "Beta" | "Coming Soon") => {
    if (status === "Active") return t.statusActive;
    if (status === "Beta") return t.statusBeta;
    return t.statusSoon;
  };

  return (
    <section id="products" className="py-28 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            {t.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">{t.title}</h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, index) => {
            const productT = t.items[index];
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-5">{product.emoji}</div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold text-white">{productT.name}</h3>
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-semibold rounded-full flex-shrink-0",
                      statusStyles[product.status]
                    )}
                  >
                    {getStatusLabel(product.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{productT.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
