"use client";
import { Zap, MessageCircle, Mail, ExternalLink, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

const socialLinks = [
  { icon: MessageCircle, href: "https://wa.me/6282129629737", label: "WhatsApp", color: "hover:text-green-500" },
  { icon: Mail, href: "mailto:luminariscode@gmail.com", label: "Email", color: "hover:text-indigo-500" },
  { icon: ExternalLink, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-500" },
  { icon: Camera, href: "https://instagram.com", label: "Instagram", color: "hover:text-pink-500" },
];

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  const footerLinks = {
    [t.groups.services]: t.links.services,
    [t.groups.products]: t.links.products,
    [t.groups.company]: t.links.company,
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
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-sm mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">{t.copyright}</p>
          <p className="text-sm text-gray-600">{t.built}</p>
        </div>
      </div>
    </footer>
  );
}
