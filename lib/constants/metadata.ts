import type { Metadata } from "next";

// Environment & Base Info
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const SITE_TITLE = "HighPhoenix Aviation Consultancy";
export const SITE_TAGLINE = "Strategic aviation safety, governance & training";
export const APP_NAME = `${SITE_TITLE} | ${SITE_TAGLINE}`;
export const HOME_DESCRIPTION =
  "HighPhoenix supports aviation organisations to strengthen safety performance, governance, regulatory compliance, and long-term institutional sustainability through expert advisory and training.";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "HighPhoenix is a founder-led international aviation consultancy providing strategic and operational advisory, training, and governance support to safety-critical aviation organisations. We combine decades of aviation leadership experience with practical, context-aware delivery.";

export const COMMON_KEYWORDS = [
  // English keywords
  "HighPhoenix",
  "HighPhoenix Aviation Consultancy",
  "Phoenix Aviation Consultancy",
  "aviation consultancy",
  "aviation safety",
  "safety performance",
  "aviation governance",
  "regulatory compliance",
  "aviation training",
  "operational excellence",
  "institutional sustainability",
  "aviation advisory",
  "safety-critical aviation",
  "aviation leadership",
  "ICAO compliance",
  "civil aviation",
  "air transport safety",
  "aviation risk management",
  "SMS aviation",
  "remote aviation training",
  "blended aviation training",

  // Arabic keywords
  "هاي فينيكس",
  "هاي فينيكس للاستشارات الجوية",
  "فينيكس للاستشارات الجوية",
  "استشارات الطيران",
  "سلامة الطيران",
  "أداء السلامة",
  "حوكمة الطيران",
  "الامتثال التنظيمي",
  "التشريعات الجوية",
  "تدريب الطيران",
  "التميز التشغيلي",
  "الاستدامة المؤسسية",
  "استشارات الطيران المدني",
  "أنظمة إدارة السلامة",
  "SMS الطيران",
  "إدارة المخاطر في الطيران",
  "القيادة في الطيران",
  "منظمات الطيران",
  "الهيئات الجوية",
  "سلامة النقل الجوي",
  "تأهيل قيادات الطيران",
  "بيئات الطيران عالية الخطورة",
] as const;


// Home (Single page / landing)
export const HOME_METADATA: Metadata = {
  title: APP_NAME,
  description: HOME_DESCRIPTION,
  keywords: COMMON_KEYWORDS.join(", "),
  metadataBase: new URL(SITE_URL),

  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
    locale: "en-US",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_TITLE} — Strategic aviation safety, governance & training`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${SITE_URL}/logo.png`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

// About page
export const ABOUT_METADATA: Metadata = {
  title: `${SITE_TITLE} — About Us`,
  description:
    "HighPhoenix provides trusted, independent aviation consultancy and training that improves safety, operational performance, and regulatory compliance across the global aviation sector.",
  keywords: COMMON_KEYWORDS.join(", "),
  openGraph: {
    title: `${SITE_TITLE} — About Us`,
    description:
      "Learn about HighPhoenix’s founder-led team, decades of aviation leadership experience, and our approach to delivering confidential, impact-focused advisory and training worldwide.",
    url: `${SITE_URL}/about`,
    siteName: SITE_TITLE,
    locale: "en-US",
    type: "article",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_TITLE} — About Us`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE_TITLE} — About Us`,
    description:
      "Discover the leadership, values, and global approach that underpin HighPhoenix Aviation Consultancy.",
  },
};

export const generateDynamicMetadata = {
  page: (page: {
    type: "training";
    name: string;
    description?: string;
    slug: string;
    parent?: string;
  }): Metadata => {
    const defaultDescriptions: Record<string, string> = {
      training: `Phoenix Aviation Consultancy delivers aviation training as a strategic institutional capability designed to strengthen organizations—not merely individual competence.`,
    };

    const description = page.description || defaultDescriptions[page.type];

    const keywords: string[] = [
      "HighPhoenix",
      page.name,
      `${page.name} ${page.type}`,
      "training" ,
      "HighPhoenix Aviation Consultancy",
  "Phoenix Aviation Consultancy",
  "aviation consultancy",
    ];

    if (page.type === "training") {
      keywords.push("orienteering", "life skills", "team building");
    }

    return {
      title: `${page.name} | Training - ${SITE_TITLE}`,
      description,
      keywords: keywords.concat(Array.from(COMMON_KEYWORDS)).join(", "),
      openGraph: {
        title: `${page.name} | ${SITE_TITLE}`,
        description,
        type: "website",
        siteName: SITE_TITLE,
        images: [
          {
            url: `${SITE_URL}/${page.slug || "logo2"}.jpg`,
            width: 1200,
            height: 630,
            alt: page.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${page.name} | ${SITE_TITLE}`,
        description,
        images: [`${SITE_URL}/${page.slug || "logo2"}.jpg`],
      },
    };
  },
};

// Services page (Advisory & Training)
export const TRAINING_METADATA: Metadata = {
  title: `${SITE_TITLE} — Services`,
  description:
    "Advisory and training services focused on safety performance, governance, regulatory compliance, and sustainable institutional capability for aviation organisations.",
  keywords: COMMON_KEYWORDS.join(", "),
  openGraph: {
    title: `${SITE_TITLE} — Services`,
    description:
      "HighPhoenix delivers project-based advisory and training engagements — on-site, remote, or blended — to strengthen aviation institutions at leadership, governance, and system levels.",
    url: `${SITE_URL}/training`,
    siteName: SITE_TITLE,
    locale: "en-US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_TITLE} — Advisory & Training Services`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE_TITLE} — Training`,
    description:
      "Strategic and operational advisory, governance strengthening, regulatory support, and bespoke aviation training worldwide.",
  },
};
 
// Advisory Page
export const ADVISORY_METADATA: Metadata = {
  title: `${SITE_TITLE} — Advisory Services`,
  description:
     `Phoenix Aviation Consultancy delivers strategic and operational advisory services designed to strengthen aviation institutions at leadership, governance, and system levels. Advisory engagements support organizations operating in safety-critical and highly regulated environments.`,
  keywords: COMMON_KEYWORDS.join(", "),
  openGraph: {
    title: `${SITE_TITLE} — Advisory`,
    description:
      `Phoenix Aviation Consultancy delivers strategic and operational advisory services designed to strengthen aviation institutions at leadership, governance, and system levels. Advisory engagements support organizations operating in safety-critical and highly regulated environments.`,
    url: `${SITE_URL}/advisory`,
    siteName: SITE_TITLE,
    locale: "en-US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_TITLE} — Advisory Services`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE_TITLE} — Advisory Services`,
    description:
      `Phoenix Aviation Consultancy delivers strategic and operational advisory services designed to strengthen aviation institutions at leadership, governance, and system levels. Advisory engagements support organizations operating in safety-critical and highly regulated environments.`,
  },
};


// Root / Global metadata (app layout)
export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: APP_NAME,
  description: APP_DESCRIPTION,
  icons: {
    icon: `${SITE_URL}/favicon.ico`,
    shortcut: `${SITE_URL}/favicon.ico`,
    apple: `${SITE_URL}/logo.png`,
  },
  openGraph: {
    type: "website",
    locale: "en-US",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    siteName: SITE_TITLE,
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${SITE_URL}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};
