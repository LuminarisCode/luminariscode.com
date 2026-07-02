"use client";
import { Zap, MessageCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

const socialLinks = [
  { icon: MessageCircle, href: "https://wa.me/6282129629737", label: "WhatsApp", color: "hover:text-green-500" },
  { icon: Mail, href: "mailto:luminariscode@gmail.com", label: "Email", color: "hover:text-indigo-500" },
];

const groupKeys = ["services", "products", "company"] as const;

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  const footerHrefs: Record<(typeof groupKeys)[number], string[]> = {
    services: t.links.services.map(() => "#services"),
    products: t.links.products.map(() => "#products"),
    company: ["#why", "#portfolio", "#contact"],
  };

  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-bold text-white text-lg">
                Luminaris<span className="text-indigo-400">Code</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">{t.tagline}</p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={cn("text-gray-500 transition-colors", color)}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {groupKeys.map((key) => (
            <div key={key}>
              <h4 className="text-white font-semibold text-sm mb-4">{t.groups[key]}</h4>
              <ul className="space-y-2.5">
                {t.links[key].map((link, i) => (
                  <li key={link}>
                    <a
                      href={footerHrefs[key][i]}
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} {t.copyright}
          </p>
          <p className="text-sm text-gray-600">{t.built}</p>
        </div>
      </div>
    </footer>
  );
}
