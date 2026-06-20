"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

type DBProject = {
  id: string;
  name: string;
  categoryEn: string;
  categoryId: string;
  descriptionEn: string;
  descriptionId: string;
  image: string | null;
  gradient: string;
  technologies: string[];
  status: string;
  demoUrl: string | null;
  order: number;
  published: boolean;
};

const INITIAL_VISIBLE = 6;

export default function PortfolioSection({ projects }: { projects: DBProject[] }) {
  const { lang } = useLanguage();
  const t = translations[lang].portfolio;
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? projects : projects.slice(0, INITIAL_VISIBLE);

  return (
    <section id="portfolio" className="py-28 bg-white">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleItems.map((item, index) => {
            const isFeatured = index === 0;
            const category = lang === "id" ? item.categoryId : item.categoryEn;
            const description = lang === "id" ? item.descriptionId : item.descriptionEn;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (index % 3) * 0.08, duration: 0.5 }}
                className={cn(
                  "group flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden",
                  "hover:border-gray-200 hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300",
                  isFeatured && "lg:col-span-2"
                )}
              >
                {/* Thumbnail */}
                <div
                  className={cn(
                    "relative overflow-hidden flex-shrink-0 bg-gray-100",
                    isFeatured ? "h-64 lg:h-72" : "h-52"
                  )}
                >
                  {item.image ? (
                    <>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes={
                          isFeatured
                            ? "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 66vw"
                            : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        }
                      />
                      {/* Subtle gradient overlay bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                    </>
                  ) : (
                    /* Gradient fallback for projects without screenshot */
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br",
                        item.gradient ?? "from-gray-400 to-gray-600"
                      )}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/15 font-black select-none text-[7rem] leading-none">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                  )}

                  {/* Category badge — top left */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold bg-black/40 backdrop-blur-md text-white rounded-full border border-white/20 shadow-sm">
                      {category}
                    </span>
                  </div>

                  {/* Demo link — top right, shown on hover */}
                  {item.demoUrl && (
                    <a
                      href={item.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold bg-white text-gray-900 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-colors">
                        <ExternalLink className="w-3 h-3" />
                        Live Demo
                      </span>
                    </a>
                  )}

                  {/* Arrow icon — bottom right, on hover */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-gray-900 text-base leading-snug">{item.name}</h3>
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold bg-green-50 text-green-600 rounded-full border border-green-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                      {t.statusActive}
                    </span>
                  </div>

                  <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
                    {description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-medium bg-gray-100 text-gray-500 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Show more / CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          {projects.length > INITIAL_VISIBLE && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 rounded-xl transition-all hover:bg-gray-50"
            >
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  showAll && "rotate-180"
                )}
              />
              {showAll
                ? lang === "id"
                  ? "Tampilkan Lebih Sedikit"
                  : "Show Less"
                : lang === "id"
                ? `Lihat ${projects.length - INITIAL_VISIBLE} Proyek Lainnya`
                : `See ${projects.length - INITIAL_VISIBLE} More Projects`}
            </button>
          )}

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 border border-indigo-200 hover:border-indigo-300 rounded-xl transition-all hover:bg-indigo-50"
          >
            {t.cta}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
