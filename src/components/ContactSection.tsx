import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: t.contact.serviceOptions[0],
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: t.contact.serviceOptions[0],
        message: '',
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
            {t.contact.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100">
            {t.contact.title}
          </h2>
          <p className="text-stone-400 text-base leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details Card (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-stone-900/90 border border-stone-800 p-8 space-y-6 shadow-xl">
              
              <h3 className="text-xl font-bold text-stone-100 border-b border-stone-800 pb-4">
                {currentLang === 'ar' ? 'معلومات الاتصال المباشرة' : currentLang === 'tr' ? 'Doğrudan İletişim Bilgileri' : 'Direct Contact Information'}
              </h3>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 font-medium">{t.contact.phone}</span>
                  <a
                    href="tel:+905362515878"
                    dir="ltr"
                    className="block text-base font-bold text-stone-100 hover:text-amber-400 transition"
                  >
                    +90 536 251 58 78
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 font-medium">WhatsApp</span>
                  <a
                    href="https://wa.me/905362515878"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="block text-base font-bold text-emerald-400 hover:text-emerald-300 transition"
                  >
                    +90 536 251 58 78
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 font-medium">{t.contact.email}</span>
                  <a
                    href="mailto:sai.masx@gmail.com"
                    dir="ltr"
                    className="block text-base font-bold text-stone-100 hover:text-amber-400 transition break-all"
                  >
                    sai.masx@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 font-medium">{t.contact.address}</span>
                  <p className="text-base font-bold text-stone-100">
                    {t.contact.addressValue}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4 border-t border-stone-800 pt-4">
                <div className="p-3 rounded-xl bg-stone-800 text-stone-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 font-medium">{t.contact.hours}</span>
                  <p className="text-sm font-semibold text-stone-300">
                    {t.contact.hoursValue}
                  </p>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-3">
                <a
                  href="tel:+905362515878"
                  className="py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-bold text-center border border-stone-700 flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.contact.callNow}</span>
                </a>
                <a
                  href="https://wa.me/905362515878"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-600/20"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.contact.chatWhatsApp}</span>
                </a>
              </div>

            </div>
          </div>

          {/* Form Card (Col 7) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-stone-900/90 border border-stone-800 p-8 shadow-xl">
              <h3 className="text-xl font-bold text-stone-100 mb-6">
                {t.contact.formTitle}
              </h3>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-in fade-in zoom-in duration-300">
                  <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-100">
                    {currentLang === 'ar' ? 'شكراً لتواصلك معنا' : currentLang === 'tr' ? 'Teşekkürler' : 'Thank you'}
                  </h4>
                  <p className="text-sm text-stone-300">
                    {t.contact.successMsg}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1.5">
                        {t.contact.namePlaceholder} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contact.namePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-amber-500 transition"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1.5">
                        {t.contact.phonePlaceholder} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+90 536 ..."
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-amber-500 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1.5">
                        {t.contact.emailPlaceholder}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@mail.com"
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-amber-500 transition"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1.5">
                        {t.contact.servicePlaceholder}
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-amber-500 transition"
                      >
                        {t.contact.serviceOptions.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-400 mb-1.5">
                      {t.contact.messagePlaceholder}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-amber-500 transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="contact-form-submit-btn"
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-sm shadow-xl shadow-amber-600/20 hover:shadow-amber-500/30 transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 rtl:rotate-180" />
                    <span>{t.contact.submitBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
