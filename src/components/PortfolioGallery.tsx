import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { portfolioProjects, beforeAfterShowcase, ProjectItem } from '../data/portfolio';
import { MapPin, ZoomIn, X, Sparkles, SlidersHorizontal } from 'lucide-react';

interface PortfolioGalleryProps {
  currentLang: Language;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'painting' | 'ceilings' | 'decor'>('all');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects = selectedFilter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === selectedFilter);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section id="gallery" className="py-24 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
            {t.portfolio.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            {t.portfolio.title}
          </h2>
          <p className="text-stone-400 text-base leading-relaxed">
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Interactive Before & After Renovation Comparison */}
        <div className="mb-20 rounded-3xl bg-stone-900/80 border border-stone-800 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.portfolio.beforeAfterBadge}</span>
              </div>
              <h3 className="text-2xl font-bold text-stone-100">
                {t.portfolio.beforeAfterTitle}
              </h3>
              <p className="text-stone-400 text-sm max-w-2xl">
                {t.portfolio.beforeAfterDesc}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>
                {currentLang === 'ar' ? 'اسحب المقبض لرؤية الفرق' : currentLang === 'tr' ? 'Karşılaştırmak için kaydırın' : 'Drag handle to compare'}
              </span>
            </div>
          </div>

          {/* Interactive Split-Screen Comparison Box */}
          <div
            className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-stone-700 select-none cursor-ew-resize touch-none shadow-2xl"
            onMouseMove={handleSliderMove}
            onTouchMove={handleSliderMove}
          >
            {/* "After" Image (Background Full) */}
            <img
              src={beforeAfterShowcase.afterImage}
              alt="After Renovation"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 ltr:right-4 rtl:left-4 z-10 px-3.5 py-1.5 rounded-lg bg-amber-500/90 text-stone-950 font-bold text-xs shadow-lg backdrop-blur-sm">
              ✨ {t.portfolio.after}
            </div>

            {/* "Before" Image (Clipped Left Side) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={beforeAfterShowcase.beforeImage}
                alt="Before Renovation"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{
                  width: '100%',
                  minWidth: '100%',
                  objectFit: 'cover',
                }}
              />
              <div className="absolute top-4 ltr:left-4 rtl:right-4 px-3.5 py-1.5 rounded-lg bg-stone-900/90 text-stone-300 font-bold text-xs shadow-lg backdrop-blur-sm border border-stone-700">
                🧱 {t.portfolio.before}
              </div>
            </div>

            {/* Draggable Divider Line & Knob */}
            <div
              className="absolute inset-y-0 z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute inset-y-0 -left-[1.5px] w-[3px] bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-xl border-2 border-stone-950">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { key: 'all', label: t.portfolio.filters.all },
            { key: 'painting', label: t.portfolio.filters.painting },
            { key: 'ceilings', label: t.portfolio.filters.ceilings },
            { key: 'decor', label: t.portfolio.filters.decor },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key as any)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition duration-200 border ${
                selectedFilter === filter.key
                  ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-lg shadow-amber-500/20'
                  : 'bg-stone-900/70 text-stone-300 border-stone-800 hover:border-stone-700 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-stone-900/70 border border-stone-800 overflow-hidden hover:border-amber-500/40 transition duration-300 shadow-xl flex flex-col justify-between"
            >
              {/* Image Container with Zoom Overlay */}
              <div
                className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-stone-950"
                onClick={() => setActiveModalProject(project)}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title[currentLang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="p-3 rounded-full bg-amber-500 text-stone-950 shadow-xl transform scale-75 group-hover:scale-100 transition duration-300">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Badge Tag */}
                <div className="absolute top-3 rtl:right-3 ltr:left-3 px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-bold">
                  {project.badge[currentLang]}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-400">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{project.location}</span>
                  </div>
                  <h4 className="text-base font-bold text-stone-100 group-hover:text-amber-400 transition leading-snug">
                    {project.title[currentLang]}
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {project.specs[currentLang]}
                  </p>
                </div>

                {/* Action Row */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-semibold text-stone-300 hover:text-amber-400 transition flex items-center gap-1"
                  >
                    <span>{t.portfolio.viewDetails}</span>
                  </button>

                  <a
                    href={`https://wa.me/905362515878?text=${encodeURIComponent(
                      `Hello saif.group, I saw this project on your website: ${project.title[currentLang]} and I want something similar.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-amber-400 hover:text-amber-300"
                  >
                    {currentLang === 'ar' ? 'طلب مماثل' : currentLang === 'tr' ? 'Benzerini İste' : 'Request Similar'}
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* High-Resolution Project Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-stone-900 border border-stone-700 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 rtl:left-4 ltr:right-4 z-20 p-2 rounded-full bg-stone-950/80 hover:bg-stone-800 text-stone-200 border border-stone-700 transition"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-video bg-stone-950">
              <img
                src={activeModalProject.imageUrl}
                alt={activeModalProject.title[currentLang]}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Details */}
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-stone-100">
                  {activeModalProject.title[currentLang]}
                </h3>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
                  {activeModalProject.badge[currentLang]}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-400">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{activeModalProject.location}</span>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed">
                {activeModalProject.specs[currentLang]}
              </p>

              <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-end gap-3">
                <a
                  href={`https://wa.me/905362515878?text=${encodeURIComponent(
                    `Hello saif.group, I would like to consult with an engineer about project: ${activeModalProject.title[currentLang]}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs shadow-lg"
                >
                  {currentLang === 'ar' ? 'استشارة المهندس عبر واتساب' : currentLang === 'tr' ? 'WhatsApp ile Danış' : 'Inquire via WhatsApp'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
