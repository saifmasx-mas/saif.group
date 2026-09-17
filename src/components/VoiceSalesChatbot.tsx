import React, { useState, useEffect, useRef } from 'react';
import { Language, ChatMessage } from '../types';
import { translations } from '../data/translations';
import {
  MessageSquare,
  X,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  Phone,
  RotateCcw,
} from 'lucide-react';

interface VoiceSalesChatbotProps {
  currentLang: Language;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

export const VoiceSalesChatbot: React.FC<VoiceSalesChatbotProps> = ({
  currentLang,
  isOpen,
  onToggle,
}) => {
  const t = translations[currentLang];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize initial greeting message when language changes
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: t.chatbot.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [currentLang]);

  // Check Web Speech API support
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputValue(transcript);
          handleSendMessage(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Update speech recognition language when site language changes
  useEffect(() => {
    if (recognitionRef.current) {
      const langCodes: Record<Language, string> = {
        ar: 'ar-SA',
        en: 'en-US',
        tr: 'tr-TR',
      };
      recognitionRef.current.lang = langCodes[currentLang];
    }
  }, [currentLang]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle Text-to-Speech playback
  const speakText = (text: string) => {
    if (!ttsEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any active speech

    // Remove markdown symbols (*, #, _, -) from speech
    const cleanText = text.replace(/[*#_`~>]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const langCodes: Record<Language, string> = {
      ar: 'ar-SA',
      en: 'en-US',
      tr: 'tr-TR',
    };
    utterance.lang = langCodes[currentLang];
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Toggle voice input (Speech to Text)
  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert(
        currentLang === 'ar'
          ? 'عذراً، ميزة التعرف على الصوت غير مدعومة في هذا المتصفح.'
          : currentLang === 'tr'
          ? 'Tarayıcınız ses tanıma özelliğini desteklemiyor.'
          : 'Speech recognition is not supported in this browser.'
      );
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      stopSpeaking();
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Recognition start err:', err);
      }
    }
  };

  // Send message to Gemini server API
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    stopSpeaking();

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build history for Gemini
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-6)
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          language: currentLang,
        }),
      });

      const data = await res.json();
      const reply = data.reply || 'مرحباً بك! يمكنك الاتصال بنا مباشرة على +905362515878';

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      speakText(reply);
    } catch (error) {
      console.error('Chat error:', error);
      const fallbackReply =
        currentLang === 'ar'
          ? 'يسعدنا خدمتك! يمكنك التواصل المباشر مع مستشار المبيعات عبر الهاتف أو واتساب على الرقم: +905362515878'
          : currentLang === 'tr'
          ? 'Size yardımcı olmaktan mutluluk duyarız! Danışmanımıza doğrudan WhatsApp veya telefonla ulaşabilirsiniz: +905362515878'
          : 'We would love to assist you! Please connect with our sales consultant directly on WhatsApp or phone: +905362515878';

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    stopSpeaking();
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: t.chatbot.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 rtl:left-6 ltr:right-6 z-40 flex items-center gap-3">
          {/* Greeting Pill Tooltip */}
          <div
            onClick={() => onToggle(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-stone-900/95 border border-amber-500/30 text-stone-200 text-xs font-semibold shadow-2xl backdrop-blur-md cursor-pointer hover:border-amber-400 hover:text-amber-300 transition duration-300 animate-in fade-in slide-in-from-bottom-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{t.chatbot.launcherTooltip}</span>
          </div>

          {/* Main Button */}
          <button
            id="chatbot-launcher-btn"
            onClick={() => onToggle(true)}
            className="relative p-4 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 text-stone-950 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition duration-300 flex items-center justify-center group"
            aria-label="Open AI Sales Chatbot"
          >
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-stone-950 animate-pulse" />
            <MessageSquare className="w-6 h-6 text-stone-950 fill-stone-950 group-hover:rotate-6 transition duration-200" />
          </button>
        </div>
      )}

      {/* Expanded Chatbot Modal / Panel */}
      {isOpen && (
        <div
          id="sales-chatbot-panel"
          className="fixed bottom-4 rtl:left-4 ltr:right-4 z-50 w-[94vw] sm:w-[420px] h-[620px] max-h-[88vh] rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Chatbot Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Sparkles className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-stone-950" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                  <span>saif.group AI</span>
                  <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Gemini 3.8
                  </span>
                </h4>
                <p className="text-[11px] text-stone-400">{t.chatbot.status}</p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1.5 text-stone-400">
              {/* TTS Voice Toggle */}
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking) stopSpeaking();
                  setTtsEnabled(!ttsEnabled);
                }}
                className={`p-2 rounded-lg transition ${
                  ttsEnabled ? 'text-amber-400 hover:bg-stone-800' : 'text-stone-600 hover:bg-stone-800'
                }`}
                title={ttsEnabled ? t.chatbot.muteVoice : t.chatbot.unmuteVoice}
              >
                {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Clear Chat */}
              <button
                type="button"
                onClick={handleClearChat}
                className="p-2 rounded-lg hover:bg-stone-800 hover:text-stone-200 transition"
                title={t.chatbot.clearChat}
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Close Panel */}
              <button
                type="button"
                onClick={() => {
                  stopSpeaking();
                  onToggle(false);
                }}
                className="p-2 rounded-lg hover:bg-stone-800 hover:text-stone-200 transition"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Speech Active Wave Indicator Banner */}
          {isSpeaking && (
            <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                <span>{t.chatbot.voiceSpeaking}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 bg-amber-400 wave-bar-1 rounded-full" />
                <div className="w-1 bg-amber-400 wave-bar-2 rounded-full" />
                <div className="w-1 bg-amber-400 wave-bar-3 rounded-full" />
                <div className="w-1 bg-amber-400 wave-bar-4 rounded-full" />
                <div className="w-1 bg-amber-400 wave-bar-5 rounded-full" />
              </div>
              <button
                onClick={stopSpeaking}
                className="text-[10px] text-stone-400 hover:text-amber-300 underline"
              >
                إيقاف
              </button>
            </div>
          )}

          {/* Voice Listening Mode Indicator */}
          {isListening && (
            <div className="px-4 py-2 bg-rose-500/10 border-b border-rose-500/20 flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
                <Mic className="w-4 h-4 text-rose-500 animate-ping" />
                <span>{t.chatbot.voiceListening}</span>
              </div>
              <button
                onClick={() => recognitionRef.current?.stop()}
                className="text-[10px] text-rose-400 hover:underline"
              >
                إلغاء
              </button>
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                } space-y-1`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-amber-500 text-stone-950 font-medium rounded-br-none rtl:rounded-bl-none rtl:rounded-br-2xl shadow-md'
                      : 'bg-stone-900 text-stone-200 border border-stone-800 rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-2xl shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-stone-500 px-1">
                  <span>{msg.timestamp}</span>
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="hover:text-amber-400 transition"
                      title="استمع للرد صوتياً"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Loading / Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-stone-400 bg-stone-900/80 border border-stone-800 px-4 py-2.5 rounded-2xl rounded-bl-none max-w-[120px]">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                <div
                  className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
                <div
                  className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-4 py-2 border-t border-stone-800/60 bg-stone-950/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {t.chatbot.suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-400 border border-stone-800 hover:border-amber-500/30 text-[11px] font-medium transition shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* WhatsApp Direct Handoff Strip */}
          <div className="px-4 py-1.5 bg-stone-900/80 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
            <span className="text-stone-400">
              {currentLang === 'ar' ? 'تحتاج استجابة فورية من المهندس؟' : currentLang === 'tr' ? 'Hemen uzmanla mı görüşmek istiyorsunuz?' : 'Need instant engineer response?'}
            </span>
            <a
              href="https://wa.me/905362515878?text=Hello%20saif.group%2C%20I%20am%20chatting%20with%20your%20AI%20consultant%20and%20would%20like%20to%20speak%20with%20a%20human%20representative"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
            >
              <span>واتساب +905362515878</span>
            </a>
          </div>

          {/* Input & Voice Bar */}
          <div className="p-3 bg-stone-900 border-t border-stone-800 flex items-center gap-2">
            {/* Voice Input (Speech to Text) Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-3 rounded-xl transition ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-400'
              }`}
              title={
                isListening
                  ? 'إيقاف الاستماع'
                  : currentLang === 'ar'
                  ? 'تحدث صوتياً (تحويل الصوت لنص)'
                  : 'Speak via microphone'
              }
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Input Field */}
            <input
              id="chatbot-input-field"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={t.chatbot.inputPlaceholder}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition placeholder:text-stone-500"
            />

            {/* Send Button */}
            <button
              id="chatbot-send-btn"
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className={`p-3 rounded-xl transition ${
                inputValue.trim() && !isLoading
                  ? 'bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-stone-800 text-stone-500 cursor-not-allowed'
              }`}
              aria-label="Send message"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
