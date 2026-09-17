/**
 * saif.group - Standalone JavaScript Engine
 * Handles: Multilingual i18n, Web Speech API (STT/TTS), AI Sales Chatbot, Cost Calculator, Sliders
 */

// Multilingual Translations Dictionary
const i18n = {
  ar: {
    dir: 'rtl',
    welcome: 'أهلاً بك في saif.group! أنا مستشارك الذكي للديكور والأسقف في بورصا. كيف أساعدك اليوم؟',
    listening: 'جارٍ الاستماع لصوتك... تحدث الآن',
    calcNote: 'السعر تقريبي بالليرة التركية، والمعاينة الميدانية مجانية ببورصا.',
  },
  en: {
    dir: 'ltr',
    welcome: 'Welcome to saif.group! I am your AI decor & ceilings consultant in Bursa. How may I assist you?',
    listening: 'Listening to your voice... Speak now',
    calcNote: 'Prices are indicative in TL. Site inspection in Bursa is completely free.',
  },
  tr: {
    dir: 'ltr',
    welcome: "saif.group'a hoş geldiniz! Bursa'daki yapay zeka dekorasyon ve asma tavan danışmanınızım. Size nasıl yardımcı olabilirim?",
    listening: 'Sesiniz dinleniyor... Lütfen konuşun',
    calcNote: 'Fiyatlar TL bazında yaklaşık olup, Bursa içi keşif ücretsizdir.',
  }
};

let currentLanguage = 'ar';
let isListening = false;
let recognition = null;
let ttsEnabled = true;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initBeforeAfterSlider();
  initCalculator();
  initSpeechRecognition();
  initChatbot();
});

// 1. Hero Carousel
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  let currentIndex = 0;

  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }, 5000);
}

// 2. Interactive Before & After Slider
function initBeforeAfterSlider() {
  const rangeInput = document.getElementById('baRange');
  const beforeImg = document.getElementById('baBefore');
  if (!rangeInput || !beforeImg) return;

  rangeInput.addEventListener('input', (e) => {
    beforeImg.style.width = `${e.target.value}%`;
  });
}

// 3. Cost Calculator
function initCalculator() {
  const serviceSelect = document.getElementById('calcService');
  const areaInput = document.getElementById('calcArea');
  const areaDisplay = document.getElementById('areaDisplay');
  const totalDisplay = document.getElementById('calcTotal');
  const whatsappBtn = document.getElementById('calcWhatsAppBtn');

  if (!serviceSelect || !areaInput || !totalDisplay) return;

  const rates = {
    paintingClassic: 180,
    paintingLuxury: 420,
    ceilingsStandard: 480,
    ceilingsStretch: 850,
    completeDecor: 1450,
  };

  function recalculate() {
    const service = serviceSelect.value;
    const area = Number(areaInput.value);
    if (areaDisplay) areaDisplay.textContent = `${area} m²`;

    const rate = rates[service] || 250;
    const min = Math.round(rate * 0.9 * area);
    const max = Math.round(rate * 1.15 * area);

    totalDisplay.textContent = `₺ ${min.toLocaleString()} - ₺ ${max.toLocaleString()} TL`;

    if (whatsappBtn) {
      const text = `Hello saif.group! I calculated a project on your site: Area: ${area} m², Service: ${service}, Estimate: ₺${min} - ₺${max} TL. I want a free inspection in Bursa!`;
      whatsappBtn.href = `https://wa.me/905362515878?text=${encodeURIComponent(text)}`;
    }
  }

  serviceSelect.addEventListener('change', recalculate);
  areaInput.addEventListener('input', recalculate);
  recalculate();
}

// 4. Web Speech API (Speech to Text & Text to Speech)
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn('Web Speech API is not supported in this browser.');
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    isListening = true;
    const micBtn = document.getElementById('chatMicBtn');
    if (micBtn) micBtn.classList.add('listening');
  };

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    const input = document.getElementById('chatInput');
    if (input && transcript) {
      input.value = transcript;
      sendChatMessage(transcript);
    }
  };

  recognition.onerror = () => {
    isListening = false;
    const micBtn = document.getElementById('chatMicBtn');
    if (micBtn) micBtn.classList.remove('listening');
  };

  recognition.onend = () => {
    isListening = false;
    const micBtn = document.getElementById('chatMicBtn');
    if (micBtn) micBtn.classList.remove('listening');
  };
}

function speakAIResponse(text) {
  if (!ttsEnabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const clean = text.replace(/[*#_`~>]/g, '').trim();
  const utterance = new SpeechSynthesisUtterance(clean);
  const langMap = { ar: 'ar-SA', en: 'en-US', tr: 'tr-TR' };
  utterance.lang = langMap[currentLanguage] || 'ar-SA';
  utterance.rate = 1.0;

  window.speechSynthesis.speak(utterance);
}

// 5. Chatbot Interface
function initChatbot() {
  const launcher = document.getElementById('chatbotLauncher');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatCloseBtn');
  const sendBtn = document.getElementById('chatSendBtn');
  const input = document.getElementById('chatInput');
  const micBtn = document.getElementById('chatMicBtn');
  const langSelect = document.getElementById('langSelect');

  if (launcher && panel) {
    launcher.addEventListener('click', () => {
      panel.classList.toggle('active');
    });
  }

  if (closeBtn && panel) {
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('active');
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    });
  }

  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => sendChatMessage());
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }

  if (micBtn) {
    micBtn.addEventListener('click', () => {
      if (!recognition) {
        alert('Voice speech is not supported in this browser.');
        return;
      }
      if (isListening) {
        recognition.stop();
      } else {
        const langMap = { ar: 'ar-SA', en: 'en-US', tr: 'tr-TR' };
        recognition.lang = langMap[currentLanguage];
        recognition.start();
      }
    });
  }

  // Language Switch
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }
}

function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = i18n[lang].dir;

  const welcomeEl = document.getElementById('chatWelcomeText');
  if (welcomeEl) {
    welcomeEl.textContent = i18n[lang].welcome;
  }
}

async function sendChatMessage(presetText) {
  const input = document.getElementById('chatInput');
  const body = document.getElementById('chatBody');
  if (!body) return;

  const text = (presetText || input?.value || '').trim();
  if (!text) return;

  if (input) input.value = '';

  // Append user bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'msg msg-user';
  userBubble.textContent = text;
  body.appendChild(userBubble);
  body.scrollTop = body.scrollHeight;

  // Append typing indicator
  const typingBubble = document.createElement('div');
  typingBubble.className = 'msg msg-assistant';
  typingBubble.textContent = '...';
  body.appendChild(typingBubble);
  body.scrollTop = body.scrollHeight;

  try {
    // Try calling server endpoint first
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, language: currentLanguage }),
    });

    if (res.ok) {
      const data = await res.json();
      typingBubble.textContent = data.reply;
      speakAIResponse(data.reply);
      return;
    }
  } catch (e) {
    // Server not running; use smart client-side sales responder
  }

  // Fallback intelligent response based on keywords
  let reply = '';
  const lower = text.toLowerCase();
  if (lower.includes('سعر') || lower.includes('تكلفة') || lower.includes('price') || lower.includes('fiyat')) {
    reply = currentLanguage === 'tr'
      ? 'Bursa genelinde standart duvar boyama 150-250 TL/m², alçıpan ve asma tavan ise 380-800 TL/m² arasındadır. Ücretsiz yerinde keşif için bize +905362515878 nolu hattan ulaşabilirsiniz.'
      : currentLanguage === 'en'
      ? 'In Bursa, standard wall painting is 150-250 TL/m², and false ceilings range from 380-800 TL/m². Free on-site inspection is available! Call us at +905362515878.'
      : 'أسعار طلاء الجدران في بورصا تبدأ من 150 إلى 250 ليرة للمتر، والأسقف المستعارة من 380 إلى 800 ليرة للمتر حسب التصميم ونوع الإضاءة المخفية. المعاينة مجانية بالكامل! اتصل بنا على +905362515878.';
  } else {
    reply = currentLanguage === 'tr'
      ? "saif.group olarak Bursa'da lüks boya, asma tavan ve anahtar teslim dekorasyon hizmeti veriyoruz. Hemen WhatsApp'tan yazabilirsiniz: +905362515878."
      : currentLanguage === 'en'
      ? 'saif.group provides luxury painting, false ceilings, and turnkey interior design in Bursa, Turkey. Reach us directly on WhatsApp at +905362515878.'
      : 'أهلاً بك في saif.group! نحن متخصصون في أرقى دهانات الجدران، الأسقف المستعارة والمشدودة، والديكور المتكامل في بورصا. يسعدنا ترتيب معاينة مجانية عبر واتساب: +905362515878.';
  }

  typingBubble.textContent = reply;
  speakAIResponse(reply);
}
