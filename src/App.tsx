import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { PortfolioGallery } from './components/PortfolioGallery';
import { CostCalculator } from './components/CostCalculator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VoiceSalesChatbot } from './components/VoiceSalesChatbot';
import { ExportCodeModal } from './components/ExportCodeModal';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Synchronize document direction and language attributes
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  return (
    <div className={`min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950 ${currentLang === 'ar' ? 'font-arabic' : 'font-latin'}`}>
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenChat={() => setIsChatbotOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Slider */}
        <Hero
          currentLang={currentLang}
          onOpenChat={() => setIsChatbotOpen(true)}
        />

        {/* Specialized Services */}
        <Services currentLang={currentLang} />

        {/* Portfolio & Before/After Comparison */}
        <PortfolioGallery currentLang={currentLang} />

        {/* Interactive Cost Estimator */}
        <CostCalculator currentLang={currentLang} />

        {/* Contact & Inspection Booking */}
        <ContactSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Floating AI Voice & Text Sales Consultant */}
      <VoiceSalesChatbot
        currentLang={currentLang}
        isOpen={isChatbotOpen}
        onToggle={setIsChatbotOpen}
      />

      {/* Standalone Code Export Modal (HTML, CSS, JS) */}
      <ExportCodeModal
        currentLang={currentLang}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}

