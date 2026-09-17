import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sparkles, ChevronLeft, ChevronRight, Phone, MessageSquare, Play, Pause, Award, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenChat }) => {
  const t = translations[currentLang];

  const heroSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
      badgeAr: 'الأسقف المستعارة والمشدودة',
      badgeEn: 'False & Stretch Ceilings',
      badgeTr: 'Asma ve Gergi Tavan',
      headlineAr: 'إضاءة معمارية وأسقف مستعارة استثنائية',
      headlineEn: 'Architectural Lighting & Luxury Ceilings',
      headlineTr: 'Mimari Aydınlatma ve Lüks Asma Tavan',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=85',
      badgeAr: 'طلاء الجدران والستوكو الإيطالي',
      badgeEn: 'Wall Painting & Italian Stucco',
      badgeTr: 'Duvar Boyası ve İtalyan Stucco',
      headlineAr: 'أرقى الدهانات الإيطالية واللمسات الرخامية',
      headlineEn: 'Master Italian Paints & Marble Textures',
      headlineTr: 'En Seçkin İtalyan Boya ve Mermer Dokuları',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85',
      badgeAr: 'ديكور منزلي ومكتبي متكامل',
      badgeEn: 'Turnkey Home & Office Decor',
      badgeTr: 'Anahtar Teslim Ev ve Ofis Dekorasyonu',
      headlineAr: 'تصميم وتنفيذ متكامل تسليم مفتاح في بورصا',
      headlineEn: 'Comprehensive Turnkey Design in Bursa',
      headlineTr: 'Bursa da Anahtar Teslim İç Mimari Uygulama',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto advance slide
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, heroSlides.length]);

  const activeSlide = heroSlides[currentSlide];

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Image Carousel with Smooth Fade */}
      <div className="absolute inset-0 -z-10 bg-stone-950">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{ transitionProperty: 'opacity, transform' }}
          >
            <img
              src={slide.image}
              alt={slide.headlineEn}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/80" />
          </div>
        ))}
      </div>

      {/* Decorative Golden Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left / Main Text Column */}
          <div className="lg:col-span-8 space-y-6 text-right rtl:text-right ltr:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              <span>
                {currentLang === 'ar'
                  ? activeSlide.badgeAr
                  : currentLang === 'tr'
                  ? activeSlide.badgeTr
                  : activeSlide.badgeEn}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-100 leading-tight">
              <span className="gold-gleam-text block sm:inline">saif.group</span>{' '}
              <span className="text-stone-200">
                {t.hero.titleRest}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-xl shadow-amber-600/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition duration-200 flex items-center gap-2.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.hero.ctaPrimary}</span>
              </a>

              <a
                href="#gallery"
                className="px-6 py-3.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white font-semibold text-sm border border-stone-700/80 hover:border-amber-500/40 transition duration-200 flex items-center gap-2"
              >
                <span>{t.hero.ctaSecondary}</span>
              </a>

              {/* Chatbot Trigger */}
              <button
                id="hero-chat-trigger"
                onClick={onOpenChat}
                className="px-5 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-400 border border-emerald-600/40 font-semibold text-sm transition flex items-center gap-2 hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 animate-pulse" />
                <span>{t.hero.quickContact}</span>
              </button>
            </div>

            {/* Quick Contact Line */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-400">
              <a
                href="tel:+905362515878"
                className="flex items-center gap-2 hover:text-amber-400 transition"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span dir="ltr" className="font-semibold text-stone-300">+90 536 251 58 78</span>
              </a>
              <span className="hidden sm:inline text-stone-600">•</span>
              <span className="text-stone-300">
                {currentLang === 'ar' ? '📍 بورصا، تركيا - معاينة مجانية' : currentLang === 'tr' ? '📍 Bursa, Türkiye - Ücretsiz Keşif' : '📍 Bursa, Turkey - Free Site Inspection'}
              </span>
            </div>
          </div>

          {/* Right Column: Slide Controls & Highlight Card */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <div className="w-full max-w-sm rounded-2xl bg-stone-900/70 border border-stone-800/90 backdrop-blur-md p-5 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-xs font-semibold text-stone-400 tracking-wider uppercase">
                  {currentLang === 'ar' ? 'المشروع المعروض' : currentLang === 'tr' ? 'Öne Çıkan Proje' : 'Featured Project'}
                </span>
                
                {/* Carousel Navigation Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
                    aria-label="Previous Slide"
                  >
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
                    aria-label="Next Slide"
                  >
                    <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </div>

              {/* Card Mini Image with Active Indicator */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-stone-700/60 shadow-inner">
                <img
                  src={activeSlide.image}
                  alt="Slide preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                <div className="absolute bottom-2 inset-x-2 text-xs font-bold text-amber-300">
                  {currentLang === 'ar'
                    ? activeSlide.headlineAr
                    : currentLang === 'tr'
                    ? activeSlide.headlineTr
                    : activeSlide.headlineEn}
                </div>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentSlide ? 'w-8 bg-amber-500' : 'w-2 bg-stone-700 hover:bg-stone-600'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Grid */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/60 backdrop-blur-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-stone-100">450+</div>
              <div className="text-xs text-stone-400 font-medium">{t.hero.stats.projects}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/60 backdrop-blur-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-stone-100">12+</div>
              <div className="text-xs text-stone-400 font-medium">{t.hero.stats.experience}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/60 backdrop-blur-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-stone-100">99%</div>
              <div className="text-xs text-stone-400 font-medium">{t.hero.stats.satisfaction}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/60 backdrop-blur-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-stone-100">5</div>
              <div className="text-xs text-stone-400 font-medium">{t.hero.stats.warranty}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
