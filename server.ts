import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini instance
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// System prompt tailored specifically for saif.group
const SYSTEM_PROMPT = `أنت مندوب مبيعات واستشارات ديكور ذكي واحترافي لشركة "saif.group" (سيف جروب للديكور الداخلي والتشطيبات الفاخرة).
الشركة متخصصة في:
1. طلاء الجدران والديكورات الجدارية: دهانات حديثة، ستوكو إيطالي، شامواه، تعتيق، ملمس رخامي، طلاء مضاد للرطوبة والبكتيريا.
2. الأسقف المستعارة والمشدودة: ألواح الجبس بورد (Gypsum Board)، أسقف مشدودة (Barrisol/Stretch Ceilings) مع إضاءة خافتة وليد بروفايل مدمج، وعزل صوتي وحراري للأسقف.
3. الديكور المنزلي والمكتبي المتكامل: تصميم وتنفيذ ديكورات شقق، فلل، مكاتب شركات، قاعات اجتماعات، محلات تجارية بأحدث معايير الأناقة والفخامة.

بيانات الاتصال الرسمية:
- الهاتف / واتساب: +905362515878
- البريد الإلكتروني: sai.masx@gmail.com
- المقر والمدينة: بورصا، تركيا (Bursa, Turkey) - ونقدم خدماتنا في بورصا، يالوفا، إسطنبول والمناطق المحيطة.

إرشادات الأسعار التقديرية (تقريبية بالليرة التركية أو ما يعادلها):
- طلاء الجدران الكلاسيكي: يبدأ من 120 إلى 250 ليرة تركية للمتر المربع (شامل المواد والعمالة عالية الجودة).
- الدهانات الديكورية والستوكو والشامواه: من 300 إلى 650 ليرة تركية للمتر المربع حسب التقنية والمواد الإيطالية المختارة.
- الأسقف المستعارة والجبس بورد: من 350 إلى 800 ليرة تركية للمتر المربع حسب التفاصيل والإنارة المخفية.
- الأسقف المشدودة مع الإضاءة المدمجة: من 600 إلى 1,200 ليرة للمتر المربع.
- باقات الديكور المتكامل للشقق والمكاتب: يتم تحديدها بعد معاينة مجانية وتقديم مخطط ثلاثي الأبعاد (3D).

أسلوب الرد:
- الرد بلغة العميل تلقائياً (العربية، الإنجليزية، أو التركية).
- أسلوب مرحب، راقٍ، مهني، ومقنع، يركز على تقديم قيمة وجمالية وتوفير خيارات تناسب الميزانية.
- قدم نصائح عملية ومباشرة حول الألوان والمساحات والإضاءة.
- اختم دائماً بعرض إرسال فريق للمعاينة المجانية أو التواصل المباشر عبر واتساب على الرقم +905362515878 أو عبر الهاتف.
- حافظ على أن تكون الإجابات واضحة، موجزة ومنظمة في نقاط لتكون مريحة للقراءة والاستماع صوتياً.`;

// API route for Chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [], language = "ar" } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Graceful fallback response when API key is not yet set in environment
      const fallbacks: Record<string, string> = {
        ar: `أهلاً بك في saif.group! نحن متخصصون في الديكور المنزلي والمكتبي، طلاء الجدران الفاخر، والأسقف المستعارة في بورصا، تركيا. أسعار طلاء الجدران تبدأ من 150 ليرة للمتر، والأسقف المستعارة من 380 ليرة للمتر. يسعدنا ترتيب معاينة مجانية لموقعك! يمكنك مراسلتنا مباشرة عبر واتساب على +905362515878 أو الاتصال بنا.`,
        en: `Welcome to saif.group! We specialize in interior home and office decoration, premium wall painting, and false ceilings in Bursa, Turkey. Wall painting starts from 150 TL/m² and false ceilings from 380 TL/m². We offer free on-site inspections! Reach us directly on WhatsApp at +905362515878.`,
        tr: `saif.group'a hoş geldiniz! Bursa'da ev ve ofis dekorasyonu, duvar boyama ve asma tavan alanında uzmanız. Duvar boyama 150 TL/m²'den, asma tavan ise 380 TL/m²'den başlamaktadır. Ücretsiz keşif için bize hemen WhatsApp'tan ulaşabilirsiniz: +905362515878.`,
      };
      return res.json({
        reply: fallbacks[language] || fallbacks.ar,
      });
    }

    // Build context with conversation history
    const formattedHistory = Array.isArray(history)
      ? history.slice(-6).map((item: { role: string; text: string }) => `${item.role === "user" ? "العميل" : "مندوب سيف جروب"}: ${item.text}`).join("\n")
      : "";

    const userPrompt = formattedHistory
      ? `سجل المحادثة السابق:\n${formattedHistory}\n\nرسالة العميل الحالية: "${message}"\nيرجى الرد بلغة العميل (${language}) بدفء واحترافية كمندوب مبيعات saif.group.`
      : `رسالة العميل: "${message}"\nيرجى الرد بلغة العميل (${language}) كمندوب مبيعات saif.group.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const reply = response.text || "مرحباً بك في saif.group! كيف يمكننا مساعدتك في مشروع ديكورك اليوم؟";
    return res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: "Failed to generate reply",
      details: error?.message || "Unknown error",
    });
  }
});

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    company: "saif.group",
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
});

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`saif.group server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
