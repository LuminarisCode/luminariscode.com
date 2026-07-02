"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

// Deeper case-study breakdown for the two flagship projects backed by a
// verified client quote elsewhere on the site (see Testimonials) — not
// added for other projects since there's no verified impact to cite.
const caseStudies: Record<string, { en: { challenge: string; solution: string; impact: string }; id: { challenge: string; solution: string; impact: string } }> = {
  Edupiere: {
    en: {
      challenge:
        "Before Edupiere, the school's admissions, academics, and exam records were split across spreadsheets and paper forms — data was hard to trust and staff spent more time reconciling records than supporting students.",
      solution:
        "We built a centralized, multi-tenant School ERP covering PPDB admissions, academics, and CBT examinations — giving every role, from admin to teacher, one system instead of many.",
      impact:
        "As the school's principal, Ahmad Faruq, put it: \"Edupiere completely transformed how we manage our school. The system is intuitive and the team was incredibly responsive.\"",
    },
    id: {
      challenge:
        "Sebelum Edupiere, data PPDB, akademik, dan ujian sekolah tersebar di spreadsheet dan formulir kertas — data sulit dipercaya dan staf lebih banyak menghabiskan waktu merekonsiliasi data daripada mendampingi siswa.",
      solution:
        "Kami membangun ERP Sekolah multi-tenant yang terpusat mencakup PPDB, akademik, dan ujian CBT — memberi setiap peran, dari admin hingga guru, satu sistem yang sama.",
      impact:
        "Menurut kepala sekolah, Ahmad Faruq: \"Edupiere benar-benar mengubah cara kami mengelola sekolah. Sistemnya intuitif dan timnya sangat responsif.\"",
    },
  },
  "Clinic Queue System": {
    en: {
      challenge:
        "Long, unpredictable waiting times and manual registration were straining front-desk staff and frustrating patients at the clinic.",
      solution:
        "We built a real-time queue management system with role-based queues for doctors and midwives, plus automated daily queue generation.",
      impact:
        "As the clinic's Operations Manager, Sari Dewi, put it: \"The clinic queue system reduced our patient wait time by 60%. The real-time tracking feature is a game changer.\"",
    },
    id: {
      challenge:
        "Waktu tunggu yang panjang dan tidak menentu serta registrasi manual membebani staf front-desk dan membuat pasien frustrasi di klinik.",
      solution:
        "Kami membangun sistem manajemen antrian real-time dengan antrian berbasis peran untuk dokter dan bidan, serta pembuatan antrian harian otomatis.",
      impact:
        "Menurut Operations Manager klinik, Sari Dewi: \"Sistem antrian klinik ini mengurangi waktu tunggu pasien kami hingga 60%. Fitur pelacakan real-time-nya benar-benar mengubah permainan.\"",
    },
  },
};

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

function toggleLabel(isExpanded: boolean, lang: "en" | "id") {
  if (isExpanded) return lang === "id" ? "Sembunyikan studi kasus" : "Hide case study";
  return lang === "id" ? "Baca studi kasus lengkap" : "Read full case study";
}

export default function PortfolioSection({ projects }: { projects: DBProject[] }) {
  const { lang } = useLanguage();
  const t = translations[lang].portfolio;
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
            const caseStudy = caseStudies[item.name]?.[lang];
            const isExpanded = expandedId === item.id;

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

                  <p
                    className={cn(
                      "text-[13px] text-gray-500 leading-relaxed mb-2 flex-1",
                      !isExpanded && "line-clamp-2"
                    )}
                  >
                    {description}
                  </p>

                  {caseStudy && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(isExpanded ? null : item.id);
                        }}
                        className="self-start text-[12px] font-semibold text-indigo-600 hover:text-indigo-700 mb-3 transition-colors"
                      >
                        {toggleLabel(isExpanded, lang)}
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-3 mb-4 pt-1">
                              {[
                                { label: lang === "id" ? "Tantangan" : "Challenge", text: caseStudy.challenge },
                                { label: lang === "id" ? "Solusi" : "Solution", text: caseStudy.solution },
                                { label: lang === "id" ? "Dampak" : "Impact", text: caseStudy.impact },
                              ].map(({ label, text }) => (
                                <div key={label}>
                                  <div className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider mb-1">
                                    {label}
                                  </div>
                                  <p className="text-[13px] text-gray-500 leading-relaxed">{text}</p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}

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
