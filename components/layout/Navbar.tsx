"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = translations[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: t.services },
    { href: "#portfolio", label: t.portfolio },
    { href: "#products", label: t.products },
    { href: "#contact", label: t.contact },
  ];

  // Pill toggle adapts to dark/light context
  const LangToggle = ({ className, dark }: { className?: string; dark?: boolean }) => (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Globe className={cn("w-3.5 h-3.5 transition-colors", dark ? "text-white/50" : "text-gray-400")} />
      <div
        className={cn(
          "flex items-center gap-0.5 p-1 rounded-lg transition-colors",
          dark ? "bg-white/10 border border-white/10" : "bg-gray-100"
        )}
      >
        <button
          onClick={() => setLang("en")}
          className={cn(
            "px-2.5 py-1 rounded-md text-xs font-semibold transition-all",
            lang === "en"
              ? dark
                ? "bg-white/20 text-white shadow-sm"
                : "bg-white shadow-sm text-gray-900"
              : dark
              ? "text-white/50 hover:text-white/80"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          EN
        </button>
        <button
          onClick={() => setLang("id")}
          className={cn(
            "px-2.5 py-1 rounded-md text-xs font-semibold transition-all",
            lang === "id"
              ? dark
                ? "bg-white/20 text-white shadow-sm"
                : "bg-white shadow-sm text-gray-900"
              : dark
              ? "text-white/50 hover:text-white/80"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          ID
        </button>
      </div>
    </div>
  );

  const isDark = !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500",
              isDark
                ? "bg-gradient-to-br from-indigo-400 to-purple-600 shadow-lg shadow-indigo-500/40 group-hover:shadow-indigo-500/60"
                : "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/25 group-hover:shadow-indigo-500/40"
            )}
          >
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span
            className={cn(
              "font-bold text-lg tracking-tight transition-colors duration-500",
              isDark ? "text-white" : "text-gray-900"
            )}
          >
            Luminaris
            <span
              className={cn(
                "transition-colors duration-500",
                isDark ? "text-indigo-300" : "text-indigo-600"
              )}
            >
              Code
            </span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  isDark
                    ? "text-white/70 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: lang toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LangToggle dark={isDark} />
          <a
            href="#contact"
            className={cn(
              "px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300 shadow-sm",
              isDark
                ? "bg-white text-gray-900 hover:bg-white/90 shadow-white/10"
                : "bg-gray-900 text-white hover:bg-gray-700"
            )}
          >
            {t.cta}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "md:hidden p-2 transition-colors duration-300",
            isDark ? "text-white" : "text-gray-700"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer — always light */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-950/95 backdrop-blur-md border-b border-white/10"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white font-medium py-1 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-white/10 pt-3">
                <LangToggle dark className="py-1" />
              </div>
              <a
                href="#contact"
                className="px-5 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-center transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
