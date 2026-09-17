export interface ProjectItem {
  id: string;
  title: {
    ar: string;
    en: string;
    tr: string;
  };
  category: 'painting' | 'ceilings' | 'decor';
  location: string;
  imageUrl: string;
  specs: {
    ar: string;
    en: string;
    tr: string;
  };
  badge: {
    ar: string;
    en: string;
    tr: string;
  };
}

export const portfolioProjects: ProjectItem[] = [
  {
    id: 'p1',
    title: {
      ar: 'فيلا مودرن - أسقف مشدودة وليد بروفايل مدمج',
      en: 'Modern Villa - Stretch Ceilings & Magnetic LED Tracks',
      tr: 'Modern Villa - Gergi Tavan ve Manyetik LED Ray',
    },
    category: 'ceilings',
    location: 'Nilüfer, Bursa',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    specs: {
      ar: 'مساحة 180م²، جبس بورد مضاد للرطوبة، إنارة مخفية 3000K، أسقف مشدودة عاكسة للضوء',
      en: '180m², moisture-resistant gypsum, 3000K ambient coves, reflective stretch ceiling',
      tr: '180m², suya dayanıklı alçıpan, 3000K gizli ışık, parlak gergi tavan panelleri',
    },
    badge: {
      ar: 'أسقف مستعارة فاخرة',
      en: 'Luxury Ceilings',
      tr: 'Lüks Asma Tavan',
    },
  },
  {
    id: 'p2',
    title: {
      ar: 'صالون ملكي - طلاء ستوكو رخامي إيطالي',
      en: 'Royal Salon - Italian Venetian Marble Stucco',
      tr: 'Kral Salonu - İtalyan Mermer Dokulu Stucco',
    },
    category: 'painting',
    location: 'Osmangazi, Bursa',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    specs: {
      ar: 'ستوكو إيطالي 3 طبقات، ملمس حريري فائق النعومة، لمسة ذهبية محايدة',
      en: '3-coat Italian stucco, ultra-smooth silk finish, subtle golden undertones',
      tr: '3 kat İtalyan stucco, ultra pürüzsüz ipeksi doku, zarif sıcak tonlar',
    },
    badge: {
      ar: 'طلاء جدران إيطالي',
      en: 'Italian Stucco',
      tr: 'İtalyan Boya',
    },
  },
  {
    id: 'p3',
    title: {
      ar: 'مقر شركة استثمارية - ديكور مكتبي معاصر',
      en: 'Investment HQ - Contemporary Executive Office Decor',
      tr: 'Yatırım Şirketi - Çağdaş Yönetici Ofis Dekorasyonu',
    },
    category: 'decor',
    location: 'Mudanya, Bursa',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    specs: {
      ar: 'إكساء جداري بخشب الجوز الطبيعي، فواصل زجاجية عازلة، إنارة معمارية متناسقة',
      en: 'Natural walnut wood slats, acoustic glass partitions, architectural illumination',
      tr: 'Doğal ceviz ahşap çıtalar, akustik cam bölmeler, mimari aydınlatma',
    },
    badge: {
      ar: 'ديكور مكتبي تنفيذي',
      en: 'Executive Office',
      tr: 'Yönetici Ofisi',
    },
  },
  {
    id: 'p4',
    title: {
      ar: 'بنتهاوس فاخر - سقف جبس بورد عائم مع فتحات تكييف مدمجة',
      en: 'Luxury Penthouse - Floating Gypsum Ceiling & Linear Slots',
      tr: 'Lüks Penthouse - Yüzen Alçıpan Tavan ve Lineer Menfezler',
    },
    category: 'ceilings',
    location: 'Bademli, Bursa',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    specs: {
      ar: 'سقف عائم بطبقتين، مجرى إضاءة ممغنطة 48V، فتحات تكييف مخفية بدون إطارات',
      en: 'Dual-level floating ceiling, 48V magnetic track lighting, frameless AC diffusers',
      tr: 'Çift kademeli asma tavan, 48V manyetik ray spot, çerçevesiz gizli menfez',
    },
    badge: {
      ar: 'تصميم أسقف متقدم',
      en: 'Advanced Ceilings',
      tr: 'İleri Asma Tavan',
    },
  },
  {
    id: 'p5',
    title: {
      ar: 'غرفة نوم ماستر - دهانات شامواه وجدار مميز ببديل الرخام',
      en: 'Master Suite - Velvet Textured Paint & Marble Accent Wall',
      tr: 'Ebeveyn Süiti - Süet Dokulu Boya ve Mermer Panel',
    },
    category: 'painting',
    location: 'Yıldırım, Bursa',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    specs: {
      ar: 'دهان مخملي مقاوم للبقع، بديل رخام إيطالي مع ليد خلفي دافئ',
      en: 'Stain-resistant velvet effect paint, Italian marble panel with warm backlighting',
      tr: 'Leke tutmaz süet boya, sıcak arka aydınlatmalı İtalyan mermer panel',
    },
    badge: {
      ar: 'دهانات شامواه وديكور',
      en: 'Velvet Texture',
      tr: 'Kadife & Sedef Boya',
    },
  },
  {
    id: 'p6',
    title: {
      ar: 'شقة سكنية متكاملة - تشطيب تسليم مفتاح كلاسيك مودرن',
      en: 'Full Residence - Turnkey Modern-Classic Finishing',
      tr: 'Rezidans Daire - Anahtar Teslim Modern Klasik Tadilat',
    },
    category: 'decor',
    location: 'Görükle, Bursa',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    specs: {
      ar: 'تنسيق متكامل للألوان، بانوهات جدارية نيو كلاسيك، أرضيات باركيه مقاومة للماء',
      en: 'Harmonious color palette, neo-classic wall mouldings, waterproof acoustic parquet',
      tr: 'Uyumlu renk paleti, neoklasik duvar çıtaları, suya dayanıklı parke',
    },
    badge: {
      ar: 'تسليم مفتاح',
      en: 'Turnkey Living',
      tr: 'Anahtar Teslim',
    },
  },
];

// High quality before and after imagery for renovation showcase
export const beforeAfterShowcase = {
  beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', // raw/plain unpainted room
  afterImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', // pristine luxury finished living room with false ceiling & warm accent lights
};
