import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sparkles, ChevronLeft, ChevronRight, Phone, MessageSquare, Play, Pause, Award, CheckCircle2, ShieldCheck, Clock, ZoomIn, X, MapPin, Quote } from 'lucide-react';
import khalidImage from '../assets/images/khalid_abu_saif.jpg';

interface HeroProps {
  currentLang: Language;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenChat }) => {
  const t = translations[currentLang];
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

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

        {/* Top-Centered Project Supervisor Spotlight */}
        <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-14">
          <div
            className="relative group cursor-pointer"
            onClick={() => setIsPhotoModalOpen(true)}
            title={currentLang === 'ar' ? 'انقر لتكبير صورة الأستاذ خالد' : currentLang === 'tr' ? 'Halid Bey\'in fotoğrafını büyütmek için tıklayın' : 'Click to enlarge photo'}
          >
            {/* Ambient Golden Glow Halo */}
            <div className="absolute -inset-1.5 sm:-inset-2 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 rounded-3xl blur-md sm:blur-lg opacity-75 group-hover:opacity-100 transition duration-500" />

            {/* Main Supervisor Photo Frame (Vertical Portrait Aspect) */}
            <div className="relative w-52 h-64 sm:w-64 sm:h-80 md:w-72 md:h-92 rounded-2xl overflow-hidden border-2 sm:border-4 border-amber-400/90 shadow-2xl bg-stone-900">
              <img
                src={khalidImage}
                alt="خالد - saif.group"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Subtle Bottom Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />

              {/* Hover Zoom Cue */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-stone-950/40 backdrop-blur-[2px]">
                <span className="px-3.5 py-1.5 rounded-full bg-stone-900/95 text-amber-300 text-xs font-bold border border-amber-500/50 shadow-xl flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{currentLang === 'ar' ? 'تكبير الصورة' : currentLang === 'tr' ? 'Büyüt' : 'View Full'}</span>
                </span>
              </div>
            </div>

            {/* Live On-Site Badge */}
            <div className="absolute -bottom-3 inset-x-0 flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950/95 border border-amber-500/80 text-[11px] sm:text-xs font-bold text-amber-300 shadow-xl backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {currentLang === 'ar'
                    ? 'إشراف ميداني مباشر'
                    : currentLang === 'tr'
                    ? 'Doğrudan Saha Denetimi'
                    : 'Direct On-Site Supervision'}
                </span>
              </span>
            </div>
          </div>

          {/* Supervisor Name, Title & Inspirational Quote */}
          <div className="mt-6 space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-stone-100 tracking-wide flex items-center justify-center gap-2">
              <span className="gold-gleam-text">
                {currentLang === 'ar' ? 'خالد (أبو سيف)' : currentLang === 'tr' ? 'Halid (Ebu Seyf)' : 'Khaled (Abu Saif)'}
              </span>
            </h2>
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>
                {currentLang === 'ar'
                  ? 'مشرف ومصمم مشاريع الديكور والموقع الميداني'
                  : currentLang === 'tr'
                  ? 'İç Mimari & Şantiye Proje Şefi'
                  : 'Interior Decorator & Site Project Supervisor'}
              </span>
            </div>

            {/* Quote Badge */}
            <div className="max-w-md mx-auto pt-1 px-4">
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-xl bg-stone-900/80 border border-amber-500/25 text-amber-200 text-xs sm:text-sm italic shadow-inner">
                <Quote className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  {currentLang === 'ar'
                    ? '«تركيا علّمتني أن الجمال لا يكون كاملاً، ليكون حقيقيًا.»'
                    : currentLang === 'tr'
                    ? '«Türkiye bana güzelliğin gerçek olması için kusursuz olmak zorunda olmadığını öğretti.»'
                    : '«Turkey taught me that beauty does not have to be complete to be real.»'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto pt-1 font-normal leading-relaxed px-4">
              {currentLang === 'ar'
                ? 'متواجد معكم في قلب الورشة والميدان لضمان أعلى معايير الجودة والإتقان في تنفيذ الدهانات والأسقف والديكور في بورصا.'
                : currentLang === 'tr'
                ? 'Bursa\'da boya, asma tavan ve iç dekorasyon uygulamalarında en üst düzey işçilik ve kalite güvencesi.'
                : 'Directly on-site to guarantee top-tier craftsmanship and flawless execution for all painting, ceilings, and decor in Bursa.'}
            </p>
          </div>
        </div>

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

      {/* Supervisor Photo Zoom Modal */}
      {isPhotoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-stone-900 border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-amber-300">
                  {currentLang === 'ar' ? 'خالد (أبو سيف)' : currentLang === 'tr' ? 'Halid (Ebu Seyf)' : 'Khaled (Abu Saif)'}
                </h3>
                <p className="text-xs text-stone-400">
                  {currentLang === 'ar' ? 'مشرف ومصمم مشاريع الديكور والموقع الميداني' : currentLang === 'tr' ? 'İç Mimari & Şantiye Proje Şefi' : 'Interior Decorator & Site Project Supervisor'}
                </p>
              </div>
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-amber-500/30 aspect-[3/4] max-h-[60vh] mx-auto bg-stone-950 flex items-center justify-center">
              <img
                src={khalidImage}
                alt="خالد أبو سيف"
                className="w-full h-full object-contain sm:object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-3 rounded-xl bg-stone-950/70 border border-amber-500/20 text-center">
              <p className="text-amber-300 font-serif italic text-sm">
                {currentLang === 'ar'
                  ? '«تركيا علّمتني أن الجمال لا يكون كاملاً، ليكون حقيقيًا.» — خالد'
                  : currentLang === 'tr'
                  ? '«Türkiye bana güzelliğin gerçek olması için kusursuz olmak zorunda olmadığını öğretti.» — Halid'
                  : '«Turkey taught me that beauty does not have to be complete to be real.» — Khaled'}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <a
                href="https://wa.me/905362515878?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A3%D8%B3%D8%AA%D8%A7%D8%B0%20%D8%AE%D8%A7%D9%84%D8%AF%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83%20%D8%A8%D8%AE%D8%B5%D9%88%D8%B5%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%AF%D9%8A%D9%83%D9%88%D8%B1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{currentLang === 'ar' ? 'مراسلة عبر واتساب' : currentLang === 'tr' ? 'WhatsApp\'tan Yaz' : 'Chat on WhatsApp'}</span>
              </a>
              <a
                href="tel:+905362515878"
                className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4" />
                <span>{currentLang === 'ar' ? 'اتصال مباشر' : currentLang === 'tr' ? 'Doğrudan Ara' : 'Direct Call'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
