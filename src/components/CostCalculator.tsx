import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Calculator, Sparkles, MessageSquare, Info } from 'lucide-react';

interface CostCalculatorProps {
  currentLang: Language;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const [serviceType, setServiceType] = useState<string>('paintingClassic');
  const [area, setArea] = useState<number>(100);
  const [quality, setQuality] = useState<'standard' | 'premium' | 'royal'>('premium');

  // Base rate per m² in TRY
  const serviceRates: Record<string, number> = {
    paintingClassic: 180,
    paintingLuxury: 420,
    ceilingsStandard: 480,
    ceilingsStretch: 850,
    completeDecor: 1450,
  };

  const qualityMultipliers = {
    standard: 1.0,
    premium: 1.25,
    royal: 1.6,
  };

  const baseRate = serviceRates[serviceType] || 250;
  const multiplier = qualityMultipliers[quality] || 1.25;

  const totalMin = Math.round(baseRate * multiplier * 0.9 * area);
  const totalMax = Math.round(baseRate * multiplier * 1.15 * area);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(currentLang === 'ar' ? 'ar-SA' : currentLang === 'tr' ? 'tr-TR' : 'en-US').format(num);
  };

  const selectedServiceLabel =
    (t.calculator.options as Record<string, string>)[serviceType] || serviceType;

  const handleWhatsAppSend = () => {
    const text = `Hello saif.group!
I used the cost estimator on your website:
- Service: ${selectedServiceLabel}
- Space Area: ${area} m²
- Quality Tier: ${t.calculator.qualities[quality]}
- Estimated Range: ${formatNumber(totalMin)} - ${formatNumber(totalMax)} TL
I would like to book a free inspection in Bursa!`;

    window.open(`https://wa.me/905362515878?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="calculator" className="py-24 bg-stone-900/60 border-t border-b border-stone-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.calculator.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100">
            {t.calculator.title}
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="rounded-3xl bg-stone-950/90 border border-stone-800 p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Service Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                {t.calculator.serviceType}
              </label>
              <select
                id="service-select"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
              >
                <option value="paintingClassic">{t.calculator.options.paintingClassic}</option>
                <option value="paintingLuxury">{t.calculator.options.paintingLuxury}</option>
                <option value="ceilingsStandard">{t.calculator.options.ceilingsStandard}</option>
                <option value="ceilingsStretch">{t.calculator.options.ceilingsStretch}</option>
                <option value="completeDecor">{t.calculator.options.completeDecor}</option>
              </select>
            </div>

            {/* Area Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                  {t.calculator.spaceArea}
                </label>
                <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-extrabold text-sm border border-amber-500/20">
                  {area} م²
                </span>
              </div>
              <input
                id="area-slider"
                type="range"
                min={20}
                max={500}
                step={5}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-bold">
                <span>20 م²</span>
                <span>150 م²</span>
                <span>300 م²</span>
                <span>500 م²</span>
              </div>
            </div>

          </div>

          {/* Quality Tiers */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
              {t.calculator.finishQuality}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['standard', 'premium', 'royal'] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setQuality(tier)}
                  className={`p-4 rounded-xl border text-center transition ${
                    quality === tier
                      ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-md shadow-amber-500/10'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                  }`}
                >
                  <div className="text-xs font-bold">{t.calculator.qualities[tier]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
              <span className="text-xs font-bold text-stone-400 uppercase">
                {t.calculator.estimatedCost}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-['Plus_Jakarta_Sans',sans-serif]">
                ₺ {formatNumber(totalMin)} - ₺ {formatNumber(totalMax)}{' '}
                <span className="text-xs font-normal text-stone-400">
                  {t.calculator.currency}
                </span>
              </div>
            </div>

            <button
              id="send-estimate-whatsapp-btn"
              onClick={handleWhatsAppSend}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.calculator.sendToWhatsApp}</span>
            </button>
          </div>

          <div className="flex items-start gap-2 text-xs text-stone-500 bg-stone-900/50 p-3.5 rounded-xl border border-stone-800">
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>{t.calculator.note}</p>
          </div>

        </div>

      </div>
    </section>
  );
};
