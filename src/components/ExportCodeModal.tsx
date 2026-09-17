import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { X, Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';

interface ExportCodeModalProps {
  currentLang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportCodeModal: React.FC<ExportCodeModalProps> = ({
  currentLang,
  isOpen,
  onClose,
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const downloadFile = (filename: string, url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    downloadFile('index.html', '/standalone/index.html');
    setTimeout(() => downloadFile('style.css', '/standalone/style.css'), 200);
    setTimeout(() => downloadFile('script.js', '/standalone/script.js'), 400);
  };

  const sampleSnippets = {
    html: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>saif.group | الديكور والأسقف المستعارة وطلاء الجدران - بورصا، تركيا</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Header with animated logo, multilingual switch, and contact -->
  <!-- Hero slider, services cards, before/after slider -->
  <!-- Cost calculator, contact form, and voice sales chatbot -->
  <script src="script.js"></script>
</body>
</html>`,
    css: `/* saif.group - Standalone Stylesheet */
:root {
  --bg-primary: #0c0a09;
  --accent-gold: #f59e0b;
}
.logo-glow-anim {
  animation: logoShimmer 4s ease-in-out infinite;
}
@keyframes logoShimmer {
  0%, 100% { filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.4)); }
  50% { filter: drop-shadow(0 0 16px rgba(245, 158, 11, 0.85)); }
}`,
    js: `// saif.group - Web Speech API & Chatbot Engine
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// Speech-to-Text (STT) & SpeechSynthesis (TTS)
function speakAIResponse(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}`,
  };

  const handleCopy = () => {
    const content = sampleSnippets[activeTab];
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-stone-900 border border-stone-700 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-100">{t.exportModal.title}</h3>
              <p className="text-xs text-stone-400">{t.exportModal.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="px-6 pt-4 flex items-center justify-between border-b border-stone-800 bg-stone-950/40">
          <div className="flex items-center gap-2">
            {(['html', 'css', 'js'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-bold border-t border-x transition ${
                  activeTab === tab
                    ? 'bg-stone-900 text-amber-400 border-stone-700'
                    : 'bg-transparent text-stone-400 border-transparent hover:text-stone-200'
                }`}
              >
                {tab === 'html' ? 'index.html' : tab === 'css' ? 'style.css' : 'script.js'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{t.exportModal.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.exportModal.copyFile}</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-md transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.exportModal.downloadZip}</span>
            </button>
          </div>
        </div>

        {/* Code Preview Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-950 font-mono text-xs text-stone-300 leading-relaxed" dir="ltr">
          <pre className="whitespace-pre-wrap">{sampleSnippets[activeTab]}</pre>
        </div>

        {/* Modal Footer Instructions */}
        <div className="p-4 bg-stone-900 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.exportModal.instructions}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition"
          >
            {t.exportModal.close}
          </button>
        </div>
      </div>
    </div>
  );
};
