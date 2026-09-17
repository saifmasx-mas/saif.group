import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Phone, MessageSquare, Globe, Menu, X, Code2, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenExportModal: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenExportModal,
  onOpenChat,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ar', label: 'العربية (RTL)', flag: '🇸🇦' },
    { code: 'en', label: 'English (LTR)', flag: '🇬🇧' },
    { code: 'tr', label: 'Türkçe (LTR)', flag: '🇹🇷' },
  ];

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#calculator', label: t.nav.calculator },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-950/90 backdrop-blur-md border-b border-stone-800 shadow-2xl py-3'
          : 'bg-gradient-to-b from-stone-950/90 via-stone-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="group">
            <Logo size="md" />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-stone-300 hover:text-amber-400 font-medium text-sm transition duration-200 hover:translate-y-[-1px]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions & Utilities */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                id="lang-switch-btn"
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 text-stone-200 text-xs font-medium border border-stone-700/60 transition"
                title="Change Language / تغيير اللغة / Dil Seçimi"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {languages.find((l) => l.code === currentLang)?.flag}{' '}
                  {languages.find((l) => l.code === currentLang)?.code.toUpperCase()}
                </span>
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute top-full mt-2 rtl:left-0 ltr:right-0 w-44 rounded-xl bg-stone-900 border border-stone-800 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                        currentLang === lang.code
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'text-stone-300 hover:bg-stone-800 hover:text-stone-100'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Standalone Code Download Button */}
            <button
              id="export-code-btn"
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-stone-100 text-xs font-medium border border-stone-700/60 transition"
              title="Download standalone HTML/CSS/JS files"
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>HTML / CSS / JS</span>
            </button>

            {/* WhatsApp Quick Link */}
            <a
              href="https://wa.me/905362515878?text=Hello%20saif.group%2C%20I%20am%20interested%20in%20your%20interior%20decor%20and%20finishing%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition"
              title="WhatsApp: +905362515878"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Call Direct */}
            <a
              href="tel:+905362515878"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold border border-stone-700/60 transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span dir="ltr">+90 536 251 58 78</span>
            </a>

            {/* Free Quote CTA */}
            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold shadow-lg shadow-amber-600/20 hover:shadow-amber-500/30 transition duration-200"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.nav.requestQuote}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Lang Switch */}
            <button
              onClick={() => {
                const nextLang = currentLang === 'ar' ? 'en' : currentLang === 'en' ? 'tr' : 'ar';
                onLanguageChange(nextLang);
              }}
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-xs font-bold text-amber-400"
            >
              {currentLang.toUpperCase()}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950/98 border-b border-stone-800 px-4 pt-4 pb-6 mt-2 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-300 hover:text-amber-400 font-medium text-base py-1.5 border-b border-stone-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Languages */}
          <div className="pt-2">
            <span className="text-xs text-stone-400 font-semibold mb-2 block">
              اللغة / Language / Dil:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-bold text-center border transition ${
                    currentLang === lang.code
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-stone-900 text-stone-300 border-stone-800'
                  }`}
                >
                  {lang.flag} {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenExportModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-xs font-semibold"
            >
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>{t.nav.exportCode}</span>
            </button>

            <a
              href="tel:+905362515878"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-xs font-semibold"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span dir="ltr">+90 536 251 58 78</span>
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-sm shadow-lg shadow-amber-600/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.nav.requestQuote}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
