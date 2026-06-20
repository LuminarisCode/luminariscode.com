import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const portfolioItems = [
  {
    name: "Edupiere",
    categoryEn: "School ERP Platform",
    categoryId: "Platform ERP Sekolah",
    descriptionEn:
      "A modern multi-tenant School ERP empowering educational institutions with digital transformation — covering PPDB admissions, academics, CBT examinations, and school management through a scalable centralized system.",
    descriptionId:
      "Platform ERP Sekolah multi-tenant modern yang mendorong transformasi digital institusi pendidikan — mencakup PPDB, akademik, ujian CBT, dan manajemen sekolah melalui sistem terpusat yang skalabel.",
    image: "/project/edupiere.png",
    gradient: "from-indigo-500 to-purple-600",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    status: "Active",
    demoUrl: "https://edupiere.vercel.app",
    order: 1,
    published: true,
  },
  {
    name: "Mulaikerja.com",
    categoryEn: "Job Marketplace",
    categoryId: "Platform Lowongan Kerja",
    descriptionEn:
      "A scalable job marketplace streamlining recruitment for companies and job seekers — employers post openings and manage applicants, while candidates efficiently discover and apply for relevant opportunities.",
    descriptionId:
      "Platform marketplace kerja yang skalabel untuk mempermudah rekrutmen — employer memposting lowongan dan mengelola pelamar, sementara kandidat menemukan dan melamar peluang yang relevan secara efisien.",
    image: "/project/mulaikerja.png",
    gradient: "from-blue-500 to-cyan-500",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    status: "Active",
    demoUrl: "https://mulaikerja.com",
    order: 2,
    published: true,
  },
  {
    name: "Clinic Queue System",
    categoryEn: "Healthcare Management",
    categoryId: "Manajemen Klinik",
    descriptionEn:
      "A web-based queue management solution optimizing patient registration and service flow in clinical environments — with daily queue generation, role-based queues for doctors and midwives, and real-time tracking.",
    descriptionId:
      "Solusi manajemen antrian berbasis web untuk mengoptimalkan alur registrasi dan pelayanan pasien — dengan generasi antrian harian, antrian berbasis peran untuk dokter dan bidan, serta pelacakan real-time.",
    image: null,
    gradient: "from-blue-500 to-cyan-600",
    technologies: ["React", "Laravel", "MySQL", "WebSocket"],
    status: "Active",
    demoUrl: null,
    order: 3,
    published: true,
  },
  {
    name: "KerjainByVivi",
    categoryEn: "Education Platform",
    categoryId: "Platform Pendidikan",
    descriptionEn:
      "A digital academic assistance platform supporting students through their thesis journey — integrating consultation, document structuring, revision support, and community engagement in one streamlined experience.",
    descriptionId:
      "Platform bantuan akademik digital yang mendampingi mahasiswa dalam proses skripsi — mengintegrasikan konsultasi, penyusunan dokumen, dukungan revisi, dan komunitas dalam satu pengalaman terpadu.",
    image: "/project/kerjainbyvivi.png",
    gradient: "from-emerald-500 to-teal-500",
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
    status: "Active",
    demoUrl: "https://kerjainbyvivi.vercel.app",
    order: 4,
    published: true,
  },
  {
    name: "Tribun Kopi",
    categoryEn: "F&B Digital Storefront",
    categoryId: "Toko Digital F&B",
    descriptionEn:
      "A modern digital storefront for a coffee brand delivering a seamless customer experience — combining brand storytelling, product showcasing, and online ordering within a clean and elegant interface.",
    descriptionId:
      "Toko digital modern untuk brand kopi dengan pengalaman pelanggan yang mulus — menggabungkan brand storytelling, showcase produk, dan pemesanan online dalam antarmuka yang bersih dan elegan.",
    image: "/project/tribunkopi.png",
    gradient: "from-orange-500 to-amber-500",
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
    status: "Active",
    demoUrl: "https://tribunkopi.vercel.app",
    order: 5,
    published: true,
  },
  {
    name: "Desa Bandung",
    categoryEn: "Government Website",
    categoryId: "Website Pemerintahan",
    descriptionEn:
      "A professional digital presence for a village government, providing residents access to public information, announcements, and community services through a clean and accessible web portal.",
    descriptionId:
      "Kehadiran digital profesional untuk pemerintahan desa, memberikan akses warga ke informasi publik, pengumuman, dan layanan masyarakat melalui portal web yang bersih dan mudah diakses.",
    image: "/project/desa-bandung.png",
    gradient: "from-emerald-500 to-teal-500",
    technologies: ["Next.js", "Tailwind CSS"],
    status: "Active",
    demoUrl: "https://fe-kkn-landingpage.vercel.app",
    order: 6,
    published: true,
  },
  {
    name: "ICodie",
    categoryEn: "Developer Platform",
    categoryId: "Platform Developer",
    descriptionEn:
      "A modern platform designed for developers — providing curated resources, tools, and a collaborative space to accelerate coding workflows and project development.",
    descriptionId:
      "Platform modern yang dirancang untuk developer — menyediakan sumber daya, tools, dan ruang kolaborasi untuk mempercepat alur kerja coding dan pengembangan proyek.",
    image: "/project/icodie.png",
    gradient: "from-violet-500 to-purple-600",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    status: "Active",
    demoUrl: "https://icode-landingpage.vercel.app",
    order: 7,
    published: true,
  },
  {
    name: "Keyzify",
    categoryEn: "SaaS Platform",
    categoryId: "Platform SaaS",
    descriptionEn:
      "A SaaS platform for digital license and software key management — enabling businesses to generate, distribute, and validate product keys through an intuitive dashboard.",
    descriptionId:
      "Platform SaaS untuk manajemen lisensi digital dan software key — memungkinkan bisnis untuk generate, mendistribusikan, dan memvalidasi product key melalui dashboard yang intuitif.",
    image: "/project/keyzify.png",
    gradient: "from-indigo-500 to-purple-600",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    status: "Active",
    demoUrl: "https://keyzify.vercel.app",
    order: 8,
    published: true,
  },
  {
    name: "ProStore",
    categoryEn: "E-Commerce",
    categoryId: "E-Commerce",
    descriptionEn:
      "A full-featured e-commerce platform with product management, shopping cart, payment integration, and order tracking — built for modern online retail businesses.",
    descriptionId:
      "Platform e-commerce lengkap dengan manajemen produk, keranjang belanja, integrasi pembayaran, dan pelacakan pesanan — dibangun untuk bisnis ritel online modern.",
    image: "/project/prostore.png",
    gradient: "from-rose-500 to-pink-600",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    status: "Active",
    demoUrl: "https://pstores-frontend.vercel.app",
    order: 9,
    published: true,
  },
  {
    name: "TopUp Game",
    categoryEn: "Gaming Platform",
    categoryId: "Platform Gaming",
    descriptionEn:
      "A digital game top-up and voucher platform offering seamless in-game currency purchases across popular titles — with a fast, secure, and user-friendly checkout flow.",
    descriptionId:
      "Platform top-up game dan voucher digital yang menawarkan pembelian mata uang dalam game secara mulus — dengan checkout yang cepat, aman, dan mudah digunakan.",
    image: "/project/topupgame.png",
    gradient: "from-blue-500 to-cyan-500",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Active",
    demoUrl: "https://top-up-game-virid.vercel.app",
    order: 10,
    published: true,
  },
];

async function main() {
  console.log("Seeding database...");

  await prisma.project.deleteMany();

  for (const item of portfolioItems) {
    await prisma.project.create({ data: item });
  }
  console.log(`Created ${portfolioItems.length} projects`);

  console.log("Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
