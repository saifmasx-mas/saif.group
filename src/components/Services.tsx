import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Paintbrush, Layers, Home, Lightbulb, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

interface ServicesProps {
  currentLang: Language;
}

export const Services: React.FC<ServicesProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const serviceIcons: Record<string, React.ReactNode> = {
    painting: <Paintbrush className="w-6 h-6 text-amber-400" />,
    ceilings: <Layers className="w-6 h-6 text-amber-400" />,
    decor: <Home className="w-6 h-6 text-amber-400" />,
    lighting: <Lightbulb className="w-6 h-6 text-amber-400" />,
  };

  const serviceImages: Record<string, string> = {
    painting: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    ceilings: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    decor: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    lighting: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  };

  return (
    <section id="services" className="py-24 bg-stone-900/50 border-t border-b border-stone-800/80 relative">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
            {t.services.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-stone-400 text-base leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.services.items.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 p-6 sm:p-8 transition duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col justify-between"
            >
              <div className="space-y-6">
                
                {/* Card Top: Icon & Price Tag */}
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 group-hover:scale-110 transition duration-300">
                    {serviceIcons[item.id]}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-stone-800 text-amber-400 border border-stone-700 text-xs font-bold">
                    {item.priceStarting}
                  </span>
                </div>

                {/* Card Image Preview */}
                <div className="relative aspect-[16/8] rounded-xl overflow-hidden border border-stone-800 shadow-inner group-hover:border-stone-700 transition">
                  <img
                    src={serviceImages[item.id]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                </div>

                {/* Title & Description */}
                <div className="space-y-2.5">
                  <h3 className="text-xl font-bold text-stone-100 group-hover:text-amber-400 transition">
                    {item.title}
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Key Features List */}
                <ul className="space-y-2 pt-2 border-t border-stone-800/80">
                  {item.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-stone-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Bottom CTA to WhatsApp / Contact */}
              <div className="pt-6 mt-6 border-t border-stone-800/60 flex items-center justify-between">
                <a
                  href={`https://wa.me/905362515878?text=${encodeURIComponent(
                    `Hello saif.group, I would like to inquire about: ${item.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition"
                >
                  <span>
                    {currentLang === 'ar'
                      ? 'استفسر عن هذه الخدمة عبر واتساب'
                      : currentLang === 'tr'
                      ? 'WhatsApp tan Bilgi Al'
                      : 'Inquire via WhatsApp'}
                  </span>
                  {currentLang === 'ar' ? (
                    <ArrowLeft className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                </a>

                <a
                  href="#contact"
                  className="text-xs text-stone-400 hover:text-stone-200 underline"
                >
                  {currentLang === 'ar' ? 'طلب معاينة' : currentLang === 'tr' ? 'Keşif İste' : 'Book Visit'}
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
