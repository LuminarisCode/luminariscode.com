"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle, Mail, ArrowRight, CheckCircle, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  const contactInfo = [
    {
      icon: MessageCircle,
      labelKey: "whatsapp" as const,
      value: "+62 821-2962-9737",
      href: "https://wa.me/6282129629737",
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      icon: Mail,
      labelKey: "email" as const,
      value: "luminariscode@gmail.com",
      href: "mailto:luminariscode@gmail.com",
      color: "text-indigo-500",
      bg: "bg-indigo-50",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setFormState("success");
      setForm({ name: "", email: "", company: "", service: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="py-28 bg-gray-50">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.getInTouch}</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">{t.description}</p>

            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, labelKey, value, href, color, bg }) => (
                <a
                  key={labelKey}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all duration-200 group"
                >
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", bg)}>
                    <Icon className={cn("w-5 h-5", color)} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">{t[labelKey]}</div>
                    <div className="font-semibold text-gray-800 text-sm group-hover:text-indigo-600 transition-colors">
                      {value}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 ml-auto group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {formState === "success" ? (
              <div className="h-full flex flex-col items-center justify-center p-12 rounded-2xl bg-white border border-gray-100 text-center min-h-[420px]">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.success.title}</h3>
                <p className="text-gray-500 max-w-xs leading-relaxed">{t.success.message}</p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-8 px-5 py-2.5 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  {lang === "id" ? "Kirim Pesan Lain" : "Send Another Message"}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.form.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.form.namePlaceholder}
                      disabled={formState === "loading"}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all placeholder:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.form.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={t.form.emailPlaceholder}
                      disabled={formState === "loading"}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all placeholder:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.companyLabel}
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder={t.form.companyPlaceholder}
                    disabled={formState === "loading"}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all placeholder:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.serviceLabel}
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    disabled={formState === "loading"}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all text-gray-700 bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="">{t.form.serviceDefault}</option>
                    {t.form.services.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.messageLabel} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t.form.messagePlaceholder}
                    disabled={formState === "loading"}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all placeholder:text-gray-400 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Error state */}
                {formState === "error" && (
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {lang === "id"
                      ? "Gagal mengirim pesan. Silakan coba lagi atau hubungi via WhatsApp."
                      : "Failed to send message. Please try again or reach us via WhatsApp."}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className={cn(
                    "w-full py-3.5 font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2",
                    formState === "loading"
                      ? "bg-indigo-400 cursor-not-allowed text-white shadow-indigo-500/10"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                  )}
                >
                  {formState === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {lang === "id" ? "Mengirim..." : "Sending..."}
                    </>
                  ) : (
                    t.form.submit
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  {t.trustNote}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
