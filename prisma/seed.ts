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
      "Schools coordinating admissions, academics, and exams across scattered spreadsheets struggled to keep data accurate and staff aligned. Edupiere centralizes PPDB admissions, academics, and CBT examinations in one multi-tenant system — giving school leaders one source of truth and staff more time for students instead of paperwork.",
    descriptionId:
      "Sekolah yang mengelola PPDB, akademik, dan ujian melalui spreadsheet dan formulir kertas yang terpisah kesulitan menjaga data tetap akurat dan tim tetap selaras. Edupiere memusatkan PPDB, akademik, dan ujian CBT dalam satu sistem multi-tenant — memberi pimpinan sekolah satu sumber data yang jelas dan memberi staf lebih banyak waktu untuk siswa, bukan untuk administrasi.",
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
      "Companies and job seekers were relying on scattered, inefficient channels to connect — slow postings, manual applicant tracking, and missed opportunities on both sides. Mulaikerja.com brings hiring into one marketplace: employers post and manage applicants in one place, while candidates discover and apply for relevant roles faster.",
    descriptionId:
      "Perusahaan dan pencari kerja mengandalkan kanal yang terpisah dan kurang efisien untuk saling terhubung — posting lowongan yang lambat, pelacakan pelamar manual, dan peluang yang terlewat di kedua sisi. Mulaikerja.com menyatukan proses rekrutmen dalam satu marketplace: employer memposting dan mengelola pelamar dalam satu tempat, sementara kandidat menemukan dan melamar peluang yang relevan lebih cepat.",
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
      "Long, unpredictable waiting times and manual registration were straining front-desk staff and frustrating patients at the clinic. We built a real-time queue management system with role-based queues for doctors and midwives — helping the clinic cut patient wait times by roughly 60% and giving staff a clear, live view of daily patient flow.",
    descriptionId:
      "Waktu tunggu yang panjang dan tidak menentu serta registrasi manual membebani staf front-desk dan membuat pasien frustrasi di klinik. Kami membangun sistem manajemen antrian real-time dengan antrian berbasis peran untuk dokter dan bidan — membantu klinik memangkas waktu tunggu pasien hingga sekitar 60% dan memberi staf gambaran alur pasien harian secara langsung.",
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
      "Students working on their thesis often juggle consultations, document structuring, and revisions across scattered channels with little support in between. We built a single platform bringing that entire journey together — so students get consistent guidance and structure instead of navigating it alone.",
    descriptionId:
      "Mahasiswa yang mengerjakan skripsi sering harus mengurus konsultasi, penyusunan dokumen, dan revisi lewat kanal yang terpisah dengan dukungan yang minim di antaranya. Kami membangun satu platform yang menyatukan seluruh proses tersebut — sehingga mahasiswa mendapatkan bimbingan dan struktur yang konsisten, bukan menjalaninya sendirian.",
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
      "A growing coffee brand needed an online presence that matched the quality of their in-store experience, not a generic template. We built a digital storefront combining brand storytelling, product showcasing, and online ordering in one clean interface — giving the brand a professional presence that turns visitors into customers.",
    descriptionId:
      "Sebuah brand kopi yang sedang berkembang membutuhkan kehadiran online yang setara dengan kualitas pengalaman di toko fisiknya, bukan sekadar template generik. Kami membangun toko digital yang menggabungkan brand storytelling, showcase produk, dan pemesanan online dalam satu antarmuka yang bersih — memberi brand tersebut kehadiran profesional yang mengubah pengunjung menjadi pelanggan.",
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
      "Residents had no single, reliable place to find public information, announcements, and community services from their village government. We built an accessible web portal that centralizes that information — making it easier for residents to stay informed and for the local government to communicate clearly.",
    descriptionId:
      "Warga tidak memiliki satu tempat yang andal untuk menemukan informasi publik, pengumuman, dan layanan masyarakat dari pemerintahan desa mereka. Kami membangun portal web yang mudah diakses dan memusatkan informasi tersebut — memudahkan warga untuk tetap mendapat informasi dan pemerintah desa untuk berkomunikasi secara jelas.",
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
      "Developers often waste time searching across scattered resources and tools instead of building. ICodie brings curated resources, tools, and a collaborative space into one platform — helping developers move from idea to working project faster.",
    descriptionId:
      "Developer sering membuang waktu mencari sumber daya dan tools yang terpisah-pisah alih-alih fokus membangun. ICodie menyatukan sumber daya, tools, dan ruang kolaborasi dalam satu platform — membantu developer bergerak dari ide menjadi proyek yang berjalan lebih cepat.",
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
      "Software businesses managing license keys manually risk piracy, support overhead, and lost revenue from ungoverned distribution. Keyzify gives them a dashboard to generate, distribute, and validate product keys automatically — turning license management from a manual liability into a controlled, revenue-protecting process.",
    descriptionId:
      "Bisnis software yang mengelola lisensi secara manual berisiko menghadapi pembajakan, beban support, dan kehilangan pendapatan akibat distribusi yang tidak terkontrol. Keyzify memberi mereka dashboard untuk generate, mendistribusikan, dan memvalidasi product key secara otomatis — mengubah manajemen lisensi dari risiko manual menjadi proses terkontrol yang melindungi pendapatan.",
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
      "Online retailers stitching together separate tools for products, payments, and order tracking lose time and visibility as they grow. ProStore brings product management, checkout, payment integration, and order tracking into one platform — giving retail businesses a single system to run and scale their store.",
    descriptionId:
      "Peritel online yang menggabungkan berbagai tools terpisah untuk produk, pembayaran, dan pelacakan pesanan kehilangan waktu dan visibilitas seiring pertumbuhan bisnis. ProStore menyatukan manajemen produk, checkout, integrasi pembayaran, dan pelacakan pesanan dalam satu platform — memberi bisnis ritel satu sistem untuk menjalankan dan mengembangkan toko mereka.",
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
      "Gamers topping up in-game currency across multiple titles often deal with slow, unreliable checkout processes. TopUp Game offers a fast, secure, and user-friendly platform for in-game currency and voucher purchases across popular titles — turning a frustrating step into a quick, trustworthy transaction.",
    descriptionId:
      "Gamer yang melakukan top-up mata uang dalam game di berbagai judul sering menghadapi proses checkout yang lambat dan kurang andal. TopUp Game menghadirkan platform yang cepat, aman, dan mudah digunakan untuk pembelian mata uang dalam game dan voucher di berbagai judul populer — mengubah langkah yang menyebalkan menjadi transaksi yang cepat dan terpercaya.",
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
