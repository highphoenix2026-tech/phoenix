import { Engagement } from "next/font/google";

export const contactData = {
  en: {
    hero: {
      title: "Contact Us",
      desc:
        "Phoenix Aviation Consultancy engages with clients through tailored advisory mandates and customized training programs designed to meet institutional, regulatory, and operational objectives."
    },
    engagement: [
      {
        icon: "FaBusinessTime",
        title: "On-site Engagements",
        desc: "Deployed experts working directly within your facilities for hands-on support."
      },
      {
        icon: "FaLaptop",
        title: "Remote Engagements",
        desc: "Virtual advisory sessions and digital deliverables for efficient consultation."
      },
      {
        icon: "FaHubspot",
        title: "Blended Delivery",
        desc: "A hybrid approach combining the benefits of both on-site presence and remote flexibility."
      }
    ],
    Engagementde:{
      descreption:"Engagements typically begin with an initial discussion to understand organizational context, regulatory environment, and strategic objectives." },
    form: {
      name: "Full Name e.g. Jane Doe",
      organization: "Organization e.g. Civil Aviation Authority",
      role: "Position / Role e.g. Director of Safety",
      email: "Email Address",
      country: "Select a region",
      countries: [
        { value: "NA", label: "North America" },
        { value: "EU", label: "Europe" },
        { value: "AS", label: "Asia" },
        { value: "AF", label: "Africa" },
        { value: "OC", label: "Oceania" }
      ],
      message: "Please describe the nature of your inquiry...",
      submit: "Submit Enquiry"
    },
    professional: {
      title: "Professional Notice",
      desc1:
        "Phoenix Aviation Consultancy operates as an independent aviation advisory and training firm. All engagements are conducted with strict professional confidentiality and subject to agreed terms and defined scopes.",
      desc2:
        "We welcome engagement with aviation institutions, regulators, and stakeholders seeking trusted advisory and capacity-building support."
    }
  },
  ar: {
    hero: {
      title: "اتصل بنا",
      desc:
        "تتعامل فينيكس للاستشارات الجوية مع العملاء من خلال مهام استشارية مخصصة وبرامج تدريبية مصممة لتلبية الأهداف المؤسسية والتنظيمية والتشغيلية."
    },
    engagement: [
      {
        icon: "FaBusinessTime",
        title: "الاستشارات الميدانية",
        desc: "الخبراء ينتقلون مباشرة إلى منشآتكم لتقديم الدعم العملي."
      },
      {
        icon: "FaLaptop",
        title: "الاستشارات عن بعد",
        desc: "جلسات استشارية افتراضية وتسليمات رقمية لضمان كفاءة الاستشارة."
      },
      {
        icon: "FaHubspot",
        title: "النهج المختلط",
        desc: "جمع بين فوائد التواجد الميداني والمرونة الرقمية عن بعد."
      }
    ],
        Engagementde:{
      descreption:"تبدأ الارتباطات عادةً بمناقشة أولية لفهم السياق التنظيمي والبيئة التنظيمية والأهداف الاستراتيجية." },
    form: {
      name: "الاسم الكامل مثال: سارة أحمد",
      organization: "المنظمة مثال: الهيئة العامة للطيران المدني",
      role: "المنصب / الدور مثال: مدير السلامة",
      email: "البريد الإلكتروني",
      country: "اختر المنطقة",
      countries: [
        { value: "NA", label: "أمريكا الشمالية" },
        { value: "EU", label: "أوروبا" },
        { value: "AS", label: "آسيا" },
        { value: "AF", label: "أفريقيا" },
        { value: "OC", label: "أوقيانوسيا" }
      ],
      message: "يرجى وصف طبيعة استفسارك...",
      submit: "إرسال الاستفسار"
    },
    professional: {
      title: "تنويه مهني",
      desc1:
        "تعمل فينيكس للاستشارات الجوية كشركة استشارية وتدريبية مستقلة. جميع المهام تنفذ بسرية تامة ووفق الشروط المتفق عليها ونطاق العمل المحدد.",
      desc2:
        "نرحب بالتعاون مع المؤسسات الجوية والمنظمين وأصحاب المصلحة الذين يسعون للحصول على دعم استشاري وبناء قدرات موثوق."
    }
  }
};
