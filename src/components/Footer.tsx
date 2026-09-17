import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, ShieldCheck, Download, Heart } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onOpenExportModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenExportModal }) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-stone-950 border-t border-stone-800/80 pt-16 pb-12 relative text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Brand Info (Col 5) */}
          <div className="lg:col-span-5 space-y-5">
            <Logo size="md" />
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {t.footer.about}
            </p>

            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {currentLang === 'ar'
                  ? 'ضمان جودة رسمي لمدة 5 سنوات على كافة الأعمال'
                  : currentLang === 'tr'
                  ? 'Tüm işlerde 5 yıl resmi kalite garantisi'
                  : 'Official 5-year quality warranty on all work'}
              </span>
            </div>
          </div>

          {/* Quick Links (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-stone-100 uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#home" className="hover:text-amber-400 transition">{t.nav.home}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition">{t.nav.services}</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition">{t.nav.gallery}</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition">{t.nav.calculator}</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition">{t.nav.contact}</a>
              </li>
            </ul>
          </div>

          {/* Direct Contacts & Download standalone files (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-stone-100 uppercase tracking-wider">
              {t.contact.badge}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+905362515878" dir="ltr" className="hover:text-amber-400 transition font-bold">
                  +90 536 251 58 78
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:sai.masx@gmail.com" dir="ltr" className="hover:text-amber-400 transition break-all">
                  sai.masx@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.contact.addressValue}</span>
              </li>
            </ul>

            {/* Code Export Button */}
            <div className="pt-2">
              <button
                onClick={onOpenExportModal}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-400 border border-stone-800 text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.exportModal.downloadZip} (HTML, CSS, JS)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 text-center sm:text-start">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-1">
            <span>Crafted for</span>
            <span className="text-stone-300 font-bold">saif.group</span>
            <span>• Bursa, Turkey</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
