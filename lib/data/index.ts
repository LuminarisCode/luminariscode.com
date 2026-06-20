export type PortfolioItem = {
  id: number;
  name: string;
  category: { en: string; id: string };
  description: { en: string; id: string };
  image: string | null;
  gradient?: string;
  technologies: string[];
  status: "Active" | "Beta" | "Coming Soon";
  demoUrl: string | null;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    name: "Edupiere",
    category: { en: "School ERP Platform", id: "Platform ERP Sekolah" },
    description: {
      en: "A modern multi-tenant School ERP empowering educational institutions with digital transformation — covering PPDB admissions, academics, CBT examinations, and school management through a scalable centralized system.",
      id: "Platform ERP Sekolah multi-tenant modern yang mendorong transformasi digital institusi pendidikan — mencakup PPDB, akademik, ujian CBT, dan manajemen sekolah melalui sistem terpusat yang skalabel.",
    },
    image: "/project/edupiere.png",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    status: "Active",
    demoUrl: "https://edupiere.vercel.app",
  },
  {
    id: 2,
    name: "Mulaikerja.com",
    category: { en: "Job Marketplace", id: "Platform Lowongan Kerja" },
    description: {
      en: "A scalable job marketplace streamlining recruitment for companies and job seekers — employers post openings and manage applicants, while candidates efficiently discover and apply for relevant opportunities.",
      id: "Platform marketplace kerja yang skalabel untuk mempermudah rekrutmen — employer memposting lowongan dan mengelola pelamar, sementara kandidat menemukan dan melamar peluang yang relevan secara efisien.",
    },
    image: "/project/mulaikerja.png",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    status: "Active",
    demoUrl: "https://mulaikerja.com",
  },
  {
    id: 3,
    name: "Clinic Queue System",
    category: { en: "Healthcare Management", id: "Manajemen Klinik" },
    description: {
      en: "A web-based queue management solution optimizing patient registration and service flow in clinical environments — with daily queue generation, role-based queues for doctors and midwives, and real-time tracking.",
      id: "Solusi manajemen antrian berbasis web untuk mengoptimalkan alur registrasi dan pelayanan pasien — dengan generasi antrian harian, antrian berbasis peran untuk dokter dan bidan, serta pelacakan real-time.",
    },
    image: null,
    gradient: "from-blue-500 to-cyan-600",
    technologies: ["React", "Laravel", "MySQL", "WebSocket"],
    status: "Active",
    demoUrl: null,
  },
  {
    id: 4,
    name: "KerjainByVivi",
    category: { en: "Education Platform", id: "Platform Pendidikan" },
    description: {
      en: "A digital academic assistance platform supporting students through their thesis journey — integrating consultation, document structuring, revision support, and community engagement in one streamlined experience.",
      id: "Platform bantuan akademik digital yang mendampingi mahasiswa dalam proses skripsi — mengintegrasikan konsultasi, penyusunan dokumen, dukungan revisi, dan komunitas dalam satu pengalaman terpadu.",
    },
    image: "/project/kerjainbyvivi.png",
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
    status: "Active",
    demoUrl: "https://kerjainbyvivi.vercel.app",
  },
  {
    id: 5,
    name: "Tribun Kopi",
    category: { en: "F&B Digital Storefront", id: "Toko Digital F&B" },
    description: {
      en: "A modern digital storefront for a coffee brand delivering a seamless customer experience — combining brand storytelling, product showcasing, and online ordering within a clean and elegant interface.",
      id: "Toko digital modern untuk brand kopi dengan pengalaman pelanggan yang mulus — menggabungkan brand storytelling, showcase produk, dan pemesanan online dalam antarmuka yang bersih dan elegan.",
    },
    image: "/project/tribunkopi.png",
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
    status: "Active",
    demoUrl: "https://tribunkopi.vercel.app",
  },
  {
    id: 6,
    name: "Desa Bandung",
    category: { en: "Government Website", id: "Website Pemerintahan" },
    description: {
      en: "A professional digital presence for a village government, providing residents access to public information, announcements, and community services through a clean and accessible web portal.",
      id: "Kehadiran digital profesional untuk pemerintahan desa, memberikan akses warga ke informasi publik, pengumuman, dan layanan masyarakat melalui portal web yang bersih dan mudah diakses.",
    },
    image: "/project/desa-bandung.png",
    technologies: ["Next.js", "Tailwind CSS"],
    status: "Active",
    demoUrl: "https://fe-kkn-landingpage.vercel.app",
  },
  {
    id: 7,
    name: "ICodie",
    category: { en: "Developer Platform", id: "Platform Developer" },
    description: {
      en: "A modern platform designed for developers — providing curated resources, tools, and a collaborative space to accelerate coding workflows and project development.",
      id: "Platform modern yang dirancang untuk developer — menyediakan sumber daya, tools, dan ruang kolaborasi untuk mempercepat alur kerja coding dan pengembangan proyek.",
    },
    image: "/project/icodie.png",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    status: "Active",
    demoUrl: "https://icode-landingpage.vercel.app",
  },
  {
    id: 8,
    name: "Keyzify",
    category: { en: "SaaS Platform", id: "Platform SaaS" },
    description: {
      en: "A SaaS platform for digital license and software key management — enabling businesses to generate, distribute, and validate product keys through an intuitive dashboard.",
      id: "Platform SaaS untuk manajemen lisensi digital dan software key — memungkinkan bisnis untuk generate, mendistribusikan, dan memvalidasi product key melalui dashboard yang intuitif.",
    },
    image: "/project/keyzify.png",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    status: "Active",
    demoUrl: "https://keyzify.vercel.app",
  },
  {
    id: 9,
    name: "ProStore",
    category: { en: "E-Commerce", id: "E-Commerce" },
    description: {
      en: "A full-featured e-commerce platform with product management, shopping cart, payment integration, and order tracking — built for modern online retail businesses.",
      id: "Platform e-commerce lengkap dengan manajemen produk, keranjang belanja, integrasi pembayaran, dan pelacakan pesanan — dibangun untuk bisnis ritel online modern.",
    },
    image: "/project/prostore.png",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    status: "Active",
    demoUrl: "https://pstores-frontend.vercel.app",
  },
  {
    id: 10,
    name: "TopUp Game",
    category: { en: "Gaming Platform", id: "Platform Gaming" },
    description: {
      en: "A digital game top-up and voucher platform offering seamless in-game currency purchases across popular titles — with a fast, secure, and user-friendly checkout flow.",
      id: "Platform top-up game dan voucher digital yang menawarkan pembelian mata uang dalam game secara mulus — dengan checkout yang cepat, aman, dan mudah digunakan.",
    },
    image: "/project/topupgame.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Active",
    demoUrl: "https://top-up-game-virid.vercel.app",
  },
];

export const products = [
  { id: 1, name: "Edupiere", status: "Active" as const, emoji: "🎓" },
  { id: 2, name: "HRIS", status: "Beta" as const, emoji: "👥" },
  { id: 3, name: "POS", status: "Coming Soon" as const, emoji: "🛒" },
  { id: 4, name: "CRM", status: "Coming Soon" as const, emoji: "📈" },
];

export const blogPosts = [
  { id: 1, date: "2024-12-15", gradient: "from-indigo-500 to-purple-600" },
  { id: 2, date: "2024-11-28", gradient: "from-blue-500 to-cyan-500" },
  { id: 3, date: "2024-11-10", gradient: "from-emerald-500 to-teal-500" },
];

export const techStack = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Laravel", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Prisma", category: "ORM" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "Redis", category: "Cache" },
  { name: "WebSocket", category: "Realtime" },
  { name: "n8n", category: "Automation" },
  { name: "Keycloak", category: "Auth & SSO" },
  { name: "Figma", category: "Design" },
];
