import { useEffect, useRef, useState } from "react"
import SchoolGuardCaseStudy from "./SchoolGuardCaseStudy"
import VestaCaseStudy from "./VestaCaseStudy"
import AiRiskModelerCaseStudy from "./AiRiskModelerCaseStudy"
import DapodikCaseStudy from "./DapodikCaseStudy"
import RisetCaseStudy from "./RisetCaseStudy"

type Project = {
  id: string
  number: string
  name: string
  category: string
  summary: string
  role: string
  period: string
  tech: string[]
  problem: string
  solution: string
  result: string
  visual: string
  demoUrl?: string
  imageUrl?: string
  detailRoute?: string
}

const projects: Project[] = [
  {
    id: "schoolguard",
    number: "01",
    name: "SchoolGuard",
    category: "Web Development · AI",
    summary:
      "Dashboard pemantauan CCTV berbasis web dengan deteksi anomali AI real-time.",
    role: "Full-Stack Developer",
    period: "Okt 2025 – Apr 2026",
    tech: ["Laravel", "React.js", "REST API", "AI", "Relational DB"],
    problem:
      "Pemantauan CCTV sekolah membutuhkan perhatian terus-menerus dan respons cepat saat aktivitas tidak biasa terjadi.",
    solution:
      "Membangun dashboard terpusat yang menghubungkan pemantauan kamera, data kejadian, dan deteksi anomali berbasis AI.",
    result:
      "Alur pemantauan menjadi lebih terstruktur dan informasi kejadian dapat ditinjau melalui satu antarmuka.",
    visual: "guard",
    imageUrl: "/schoolguard-dashboard.jpg",
    detailRoute: "/proyek/schoolguard",
  },
  {
    id: "vesta",
    number: "02",
    name: "Vesta",
    category: "Product Design · Front-end",
    summary: "Aplikasi manajemen tabungan interaktif untuk anak-anak.",
    role: "Developer & UI/UX Designer",
    period: "Feb – Mar 2026",
    tech: ["Figma", "UI/UX", "Front-end", "Logo"],
    problem:
      "Pengalaman menabung untuk anak sering terasa rumit, abstrak, dan kurang menarik untuk digunakan secara rutin.",
    solution:
      "Merancang alur, identitas, dan antarmuka interaktif yang membuat pencatatan tabungan terasa sederhana dan menyenangkan.",
    result:
      "Konsep produk yang utuh dari identitas visual hingga antarmuka front-end dengan pengalaman yang ramah anak.",
    visual: "vesta",
    demoUrl: "https://genuine-entremet-f67570.netlify.app/",
    imageUrl: "/vesta-dashboard.png",
    detailRoute: "/proyek/vesta",
  },
  {
    id: "ai-risk-modeler",
    number: "03",
    name: "AI Pemodel Risiko Mikrofauna",
    category: "AI & Data Science · Ekologi Pertanian",
    summary:
      "Sistem kecerdasan buatan untuk memprediksi risiko kepunahan mikrofauna tanah di lahan pertanian berdasarkan kondisi lingkungan dan praktik manajemen.",
    role: "Product Designer & AI Prototyper",
    period: "2026",
    tech: ["Figma Make", "AI Simulation", "UI/UX", "Data Science", "Agriculture"],
    problem:
      "Dampak pestisida kimia dan intensitas pupuk terhadap kepunahan mikroorganisme tanah sulit diprediksi secara akurat oleh praktisi pertanian.",
    solution:
      "Membangun antarmuka simulasi AI interaktif dengan 4 tahapan alur (Input, Penilaian, Analisis, Rekomendasi) serta slider parameter lahan yang presisi.",
    result:
      "Memudahkan pemodelan risiko ekologis tanah secara real-time untuk mendukung pertanian berkelanjutan.",
    visual: "risk",
    imageUrl: "/ai-risk-modeler.png",
    demoUrl:
      "https://www.figma.com/make/xNRXNa8rJfj752O8ZWRfkO/Prototipe-AI-Pemodel-Risiko?fullscreen=1&t=iC23QwxwTyW9Zcsb-1&code-node-id=0-9",
    detailRoute: "/proyek/ai-risk-modeler",
  },
  {
    id: "dapodik",
    number: "04",
    name: "Sistem Data Sekolah",
    category: "Data Operations · Dapodik",
    summary: "Pengelolaan dan sinkronisasi data operasional sekolah.",
    role: "Operator Sekolah",
    period: "2025 – sekarang",
    tech: ["Dapodik", "Data Management", "Troubleshooting"],
    problem:
      "Data sekolah harus tetap akurat, sinkron, dan siap digunakan untuk kebutuhan administrasi serta pelaporan.",
    solution:
      "Mengelola validasi, pembaruan, sinkronisasi, dan penyelesaian kendala data melalui alur kerja yang konsisten.",
    result:
      "Administrasi digital sekolah menjadi lebih rapi dan kendala operasional data dapat ditangani lebih cepat.",
    visual: "data",
    imageUrl: "/dapodik-dashboard.jpg",
    detailRoute: "/proyek/dapodik",
  },
  {
    id: "riset",
    number: "05",
    name: "Riset CCTV Real-time Berbasis IoT",
    category: "Riset · Arsitektur Sistem",
    summary:
      "Tinjauan sistem pengawasan CCTV real-time berbasis IoT pada operasional mesin ATM.",
    role: "Peneliti",
    period: "Skripsi",
    tech: ["IoT", "CCTV", "System Architecture"],
    problem:
      "Operasional mesin ATM membutuhkan rancangan pengawasan yang mampu menghubungkan perangkat, data, dan pemantauan real-time.",
    solution:
      "Meninjau pendekatan arsitektur sistem CCTV berbasis IoT untuk memahami alur informasi dan kebutuhan pengawasan.",
    result:
      "Kerangka penelitian yang memetakan komponen dan relasi sistem sebagai dasar analisis skripsi.",
    visual: "research",
    imageUrl: "/cctv-dashboard.jpg",
    detailRoute: "/proyek/riset",
  },
]

const navItems = [
  ["tentang", "About Me"],
  ["proyek", "Projects"],
  ["pengalaman", "Experience"],
  ["skill", "Skills"],
  ["kontak", "Contact"],
]

const skills = [
  ["Frontend", "React.js, HTML5, CSS3, Tailwind CSS"],
  ["Backend", "Laravel, PHP, REST API, MySQL"],
  ["Data & AI", "KNIME, BIRT, Data Preprocessing, Machine Learning dasar"],
  ["Design & UI/UX", "Figma, Canva, User Research, Video Creation"],
  ["Digital Marketing", "SEO, SEM, Ads Manager, AI Prompting, Copywriting"],
  ["Operations & IT", "Dapodik, Administrasi Akademik, IoT, IT Infrastructure"],
  [
    "Soft Skills",
    "Project Management, Team Leadership, Public Speaking, Teaching, Problem Solving, Logistics Management",
  ],
]

const marqueeSkills = [
  "React.js",
  "Laravel",
  "PHP",
  "REST API",
  "MySQL",
  "KNIME",
  "Data Science",
  "Figma",
  "Canva",
  "UI/UX Design",
  "SEO & SEM",
  "Ads Manager",
  "AI Prompting",
  "Project Management",
  "Team Leadership",
  "Public Speaking",
  "Teaching",
  "Problem Solving",
  "Logistics & Operations",
]

const experience = [
  [
    "2026",
    "Guru Informatika",
    "SMAS Plus Cendekia Cikeas",
    "2026 – sekarang",
    "Merancang kurikulum dan modul; mengajar literasi komputer, logika pemrograman, dan etika digital.",
  ],
  [
    "2025",
    "Operator Sekolah",
    "SMAS Plus Cendekia Cikeas",
    "2025 – sekarang",
    "Mengelola Dapodik, administrasi digital, dan dukungan infrastruktur IT.",
  ],
  [
    "2025",
    "Full-Stack Developer",
    "SchoolGuard",
    "Okt 2025 – Apr 2026",
    "Membangun dashboard pemantauan CCTV dan integrasi deteksi anomali AI real-time.",
  ],
  [
    "2026",
    "Developer & UI/UX Designer",
    "Vesta",
    "Feb – Mar 2026",
    "Merancang produk, identitas visual, dan antarmuka aplikasi tabungan interaktif.",
  ],
  [
    "2025",
    "Staf Kurikulum & Desain",
    "Pramuka “Arjuna Srikandi”",
    "Jul 2025 – Apr 2026",
    "Mendukung penyusunan kurikulum kegiatan dan kebutuhan desain visual.",
  ],
  [
    "2022",
    "Culinary Operations Coordinator",
    "Ma'had Daarul Birr",
    "2022 – 2025",
    "Mengoordinasikan operasional dan logistik untuk ratusan santri.",
  ],
  [
    "2023",
    "Staff Media Center",
    "DPM STT Terpadu Nurul Fikri",
    "2023",
    "Mendukung publikasi dan kebutuhan media organisasi.",
  ],
  [
    "2019",
    "Ketua Divisi Pendidikan",
    "OSIS SMA Plus Cendekia Cikeas",
    "2019 – 2021",
    "Memimpin program pendidikan dan koordinasi kegiatan siswa.",
  ],
]

interface CertificateItem {
  id: string
  number: string
  title: string
  issuer: string
  scoreOrDate: string
  imageUrl: string
  secondaryImageUrl?: string
  category: string
  credentialUrl?: string
  description?: string
}

const certificates: CertificateItem[] = [
  {
    id: "knime",
    number: "01",
    title: "Basic Proficiency in KNIME Analytics Platform",
    issuer: "KNIME AG, Zurich, Switzerland",
    scoreOrDate: "Jun 2025 · Credly Verified",
    imageUrl: "/certificates/knime-basic-proficiency.png",
    category: "Data Science & Analytics",
    credentialUrl:
      "https://www.credly.com/badges/05a21c49-db20-4f5b-a9da-ac1e35450cb3",
    description:
      "Sertifikasi resmi kompetensi pemrosesan data, workflow analytics, manipulasi data tabular, dan pemodelan analitik data science menggunakan KNIME Analytics Platform.",
  },
  {
    id: "aws-dicoding",
    number: "02",
    title: "Cloud Practitioner Essentials (Dasar AWS Cloud)",
    issuer: "Dicoding Indonesia & AWS",
    scoreOrDate: "Jun 2024 · ID: JMZV3V00QPN9",
    imageUrl: "/certificates/peserta-4si02.png",
    category: "Cloud Computing",
    credentialUrl: "https://dicoding.com/certificates/JMZV3V00QPN9",
    description:
      "Kelulusan kurikulum berstandar internasional AWS: konsep cloud, infrastruktur global AWS, shared responsibility model, penyimpanan, dan basis data cloud.",
  },
  {
    id: "inspirasi-2026",
    number: "03",
    title: "Pemakalah Seminar Nasional INSPIRASI 2026",
    issuer: "LPPM STT Terpadu Nurul Fikri",
    scoreOrDate: "Agu 2026 · Presenter",
    imageUrl: "/certificates/seminar-inspirasi-2026.png",
    category: "Publikasi Ilmiah",
    description:
      "Sertifikat apresiasi sebagai Pemakalah/Presenter riset: 'Pengembangan Aplikasi Dashboard Pemantauan Data CCTV Berbasis Web pada SMAS Plus Cendekia Cikeas dengan Metode Waterfall'.",
  },
  {
    id: "cisiitech-2023",
    number: "04",
    title: "Peserta Konferensi CISIITECH 2023",
    issuer: "LPPM STT Terpadu Nurul Fikri",
    scoreOrDate: "Nov 2023 · Peserta",
    imageUrl: "/certificates/cisiitech-2023.png",
    category: "Konferensi Teknologi",
    description:
      "The 1st Conference on Information System and Informatics Innovation Technology 2023: 'Teknologi sebagai Pendorong Transformasi Digital'.",
  },
  {
    id: "msib-digital-marketing",
    number: "05",
    title: "Studi Independen: AI-Powered Digital Marketing",
    issuer: "Kampus Merdeka & PT Cipta Konsultan Internasional (CIAS)",
    scoreOrDate: "Des 2024 · Nilai 82,0 (A-)",
    imageUrl: "/certificates/msib-digital-marketing.png",
    secondaryImageUrl: "/certificates/msib-digital-marketing-transkrip.png",
    category: "AI & Digital Marketing",
    description:
      "Sertifikat kelulusan MSIB Angkatan 7 (ID Kegiatan: 10579250) dengan predikat A- (82,0). Mempelajari AI prompt engineering, SEO/SEM, perancangan kampanye iklan media sosial UMKM, dan evaluasi metrik pemasaran digital.",
  },
]

const cvLink = "/althaf-sulistyo-wicaksono-cv.pdf"

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible")
          observer.unobserve(element)
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function SectionHeading({
  lead,
  accent,
  number,
}: {
  lead: string
  accent: string
  number: string
}) {
  return (
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <h2>
        {lead} <em>{accent}</em>
      </h2>
    </div>
  )
}

function ProjectVisual({ type, imageUrl }: { type: string; imageUrl?: string }) {
  return (
    <div
      className={`project-visual visual-${type}${imageUrl ? " has-image" : ""}`}
      aria-hidden="true"
    >
      {imageUrl ? (
        <img src={imageUrl} alt="" />
      ) : (
        <>
          <div className="visual-window">
            <div className="visual-bar">
              <i />
              <i />
              <i />
            </div>
            <div className="visual-body">
              <div className="visual-sidebar" />
              <div className="visual-content">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className="visual-orbit" />
        </>
      )}
    </div>
  )
}

function PortfolioHome() {
  const [activeSection, setActiveSection] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedCertificate, setSelectedCertificate] =
    useState<CertificateItem | null>(null)
  const [activeCertPage, setActiveCertPage] = useState(0)

  useEffect(() => {
    const sections = [
      "tentang",
      "proyek",
      "pengalaman",
      "skill",
      "pendidikan",
      "kontak",
    ]
      .map((id) => document.getElementById(id))
      .filter((item): item is HTMLElement => Boolean(item))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: "-28% 0px -55%", threshold: [0, 0.2, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow =
      menuOpen || selectedProject || selectedCertificate ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen, selectedProject, selectedCertificate])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        setSelectedProject(null)
        setSelectedCertificate(null)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className="navbar">
        <a className="wordmark" href="#top" aria-label="Kembali ke atas">
          Althaf<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {navItems.map(([id, label]) => (
            <button
              key={id}
              className={activeSection === id ? "active" : ""}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <a className="nav-cta" href={cvLink} download>
          Unduh CV <span aria-hidden="true">↓</span>
        </a>
        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </header>

      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-links">
          {navItems.map(([id, label], index) => (
            <button key={id} onClick={() => scrollTo(id)}>
              <span>[0{index + 1}]</span>
              {label}
            </button>
          ))}
        </div>
        <div className="mobile-menu-bottom">
          <a className="button primary" href={cvLink} download>
            Unduh CV <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <main>
        <section className="hero job-hero" id="top">
          <div className="hero-glow" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => (
              <i key={index} style={{ "--i": index } as React.CSSProperties} />
            ))}
          </div>
          <div className="container hero-inner">
            <Reveal>
              <span className="eyebrow job-status">
                <i /> Terbuka untuk kesempatan kerja
              </span>
              <h1>
                Dari sebutir ide<em> menjadi sistem yang bekerja.</em>
              </h1>
              <p className="hero-copy">
                Saya lulusan Sistem Informasi dengan keahlian komprehensif di
                bidang Full-Stack Web Development (Laravel, React.js), Pengolahan
                Data, dan Digital Marketing berbasis AI. Berpengalaman merancang
                arsitektur sistem hingga antarmuka UI/UX yang berpusat pada kenyamanan audiens.
              </p>
              <div className="hero-actions">
                <button
                  className="button primary"
                  onClick={() => scrollTo("proyek")}
                >
                  Lihat proyek <Arrow />
                </button>
                <a className="button secondary" href={cvLink} download>
                  Unduh CV <span aria-hidden="true">↓</span>
                </a>
              </div>
            </Reveal>
          </div>
          <div className="container hero-stats">
            <div>
              <strong>3.60</strong>
              <span>IPK</span>
            </div>
            <div>
              <strong>
                900 <em>jam</em>
              </strong>
              <span>studi data science bersertifikat</span>
            </div>
            <div>
              <strong>2</strong>
              <span>studi independen bersertifikat</span>
            </div>
          </div>
        </section>

        <section id="tentang" className="section about-section">
          <div className="container">
            <Reveal>
              <SectionHeading
                lead="Tentang"
                accent="saya."
                number="01"
              />
            </Reveal>
            <div className="about-layout">
              <Reveal className="portrait-wrap">
                <div className="portrait">
                  <div className="portrait-halo" />
                  <img
                    className="portrait-photo"
                    src="/althaf-portrait.png"
                    alt="Althaf Sulistyo Wicaksono"
                  />
                  <div className="portrait-lines" />
                </div>
              </Reveal>
              <Reveal className="about-copy" delay={100}>
                <p>
                  Saya Althaf Sulistyo Wicaksono merupakan lulusan Sistem Informasi
                  di Sekolah Tinggi Teknologi Terpadu Nurul Fikri dengan keahlian
                  komprehensif di bidang Full-Stack Web Development (Laravel, React.js)
                  dan Digital Marketing. Saya memiliki pengalaman praktis dalam
                  merancang arsitektur sistem, mengelola basis data operasional institusi,
                  dan membangun antarmuka pengguna (UI/UX) yang berpusat pada kenyamanan audiens.
                </p>
                <p>
                  Terbukti mampu menggabungkan keahlian teknis pemrograman dengan strategi
                  pemasaran berbasis Artificial Intelligence (AI) dan optimasi SEO/SEM untuk
                  merancang solusi digital yang terukur. Terbiasa memimpin tim, memanajemen
                  logistik skala besar, dan memiliki kemampuan komunikasi publik yang kuat dari
                  pengalaman mengajar maupun berorganisasi. Saat ini, saya terbuka untuk
                  kesempatan belajar, berkembang, dan berkontribusi secara profesional.
                </p>
              </Reveal>
            </div>
            <div className="highlight-grid">
              {[
                ["01", "Full-Stack Web", "Laravel, React.js, REST API, MySQL"],
                ["02", "UI/UX & Arsitektur", "Figma, desain sistem & basis data"],
                ["03", "AI & Marketing", "SEO/SEM, Ads Manager, strategi AI"],
              ].map(([number, title, detail], index) => (
                <Reveal key={number} delay={index * 70}>
                  <div className="highlight-card">
                    <span>{number}</span>
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="proyek" className="section projects-section">
          <div className="container">
            <Reveal>
              <SectionHeading lead="Proyek" accent="pilihan." number="02" />
            </Reveal>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <Reveal key={project.id} delay={index * 70}>
                  <article className="project-card" id={project.id}>
                    <button
                      onClick={() => {
                        if (project.detailRoute) {
                          window.history.pushState({}, "", project.detailRoute)
                          window.dispatchEvent(new PopStateEvent("popstate"))
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        } else if (project.demoUrl) {
                          window.open(
                            project.demoUrl,
                            "_blank",
                            "noopener,noreferrer",
                          )
                        } else {
                          setSelectedProject(project)
                        }
                      }}
                      aria-label={`Buka studi kasus ${project.name}`}
                    >
                      <ProjectVisual
                        type={project.visual}
                        imageUrl={project.imageUrl}
                      />
                      <div className="project-meta">
                        <div>
                          <span className="project-number">
                            {project.number}
                          </span>
                          <span className="project-category">
                            {project.category}
                          </span>
                        </div>
                        <span className="project-arrow">
                          <Arrow diagonal />
                        </span>
                      </div>
                      <h3>{project.name}</h3>
                      <p>{project.summary}</p>
                      <div className="card-tech">
                        {project.tech.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    </button>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="pengalaman" className="section journey-section">
          <div className="container">
            <Reveal>
              <SectionHeading
                lead="Satu jalur,"
                accent="banyak peran."
                number="03"
              />
            </Reveal>
            <div className="timeline experience-timeline">
              {experience.map(
                ([year, role, organization, period, detail], index) => (
                  <Reveal key={`${role}-${period}`} delay={(index % 3) * 50}>
                    <article className="timeline-item">
                      <span className="year">{year}</span>
                      <i className="timeline-dot" />
                      <div>
                        <div className="timeline-title">
                          <div>
                            <h3>{role}</h3>
                            <span>{organization}</span>
                          </div>
                          <time>{period}</time>
                        </div>
                        <p>{detail}</p>
                      </div>
                    </article>
                  </Reveal>
                ),
              )}
            </div>
          </div>
        </section>

        <section id="skill" className="section skills-section">
          <div className="container">
            <Reveal>
              <SectionHeading
                lead="Stack yang"
                accent="saya kuasai."
                number="04"
              />
            </Reveal>
            <div className="toolkit-grid">
              {skills.map(([title, detail], index) => (
                <Reveal key={title} delay={(index % 3) * 60}>
                  <div className="tool-card">
                    <span>{title}</span>
                    <p>{detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="marquee" aria-label="Keahlian">
            <div className="marquee-track">
              {[0, 1].map((set) => (
                <div className="marquee-set" key={set} aria-hidden={set === 1}>
                  {marqueeSkills.map((skill) => (
                    <span key={`${set}-${skill}`}>{skill}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="container language-row">
            <span>
              Indonesia <strong>Native</strong>
            </span>
            <span>
              Inggris <strong>Menengah</strong>
            </span>
          </div>
        </section>

        <section id="pendidikan" className="section education-section">
          <div className="container">
            <Reveal>
              <SectionHeading
                lead="Pendidikan &"
                accent="sertifikasi."
                number="05"
              />
            </Reveal>
            <div className="education-grid">
              <Reveal>
                <article className="degree-card">
                  <span>2022 – 2026</span>
                  <h3>S1 Sistem Informasi</h3>
                  <p>STT Terpadu Nurul Fikri</p>
                  <strong>IPK 3.60 / 4.00</strong>
                  <div>
                    Rekayasa Perangkat Lunak · Desain Database · Arsitektur
                    Sistem · Data Management
                  </div>
                </article>
              </Reveal>
              <div className="certification-list">
                {certificates.map((cert, index) => (
                  <Reveal key={cert.id} delay={index * 55}>
                    <button
                      type="button"
                      className="cert-card"
                      onClick={() => {
                        setSelectedCertificate(cert)
                        setActiveCertPage(0)
                      }}
                      aria-label={`Buka pratinjau sertifikat ${cert.title}`}
                    >
                      <span className="cert-index">{cert.number}</span>
                      <div className="cert-thumb-preview">
                        <img src={cert.imageUrl} alt={cert.title} />
                        <span className="cert-thumb-badge" aria-hidden="true">
                          🔍
                        </span>
                      </div>
                      <div className="cert-main-info">
                        <h3>{cert.title}</h3>
                        <p>{cert.issuer}</p>
                      </div>
                      <div className="cert-meta-tag">
                        <strong>{cert.scoreOrDate}</strong>
                        <span className="cert-view-cta">
                          Perbesar <Arrow diagonal />
                        </span>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="kontak" className="section contact-section job-contact">
          <div className="container">
            <Reveal>
              <SectionHeading lead="Mari" accent="berkenalan." number="06" />
              <p className="contact-intro">
                Saya sedang mencari kesempatan kerja di bidang pengembangan web
                dan sistem informasi. Hubungi saya langsung melalui WhatsApp atau Email.
              </p>
            </Reveal>
            <Reveal className="contact-links">
              <a
                href="https://wa.me/6287711415890"
                target="_blank"
                rel="noreferrer"
              >
                <span>WhatsApp</span>
                <strong>+62 877-1141-5890</strong>
                <Arrow diagonal />
              </a>
              <a href="mailto:azaurofi@gmail.com">
                <span>Email</span>
                <strong>azaurofi@gmail.com</strong>
                <Arrow diagonal />
              </a>
              <a
                href="https://linkedin.com/in/althafsulistyo"
                target="_blank"
                rel="noreferrer"
              >
                <span>LinkedIn</span>
                <strong>linkedin.com/in/althafsulistyo</strong>
                <Arrow diagonal />
              </a>
              <a
                href="https://github.com/AlthafSulistyo"
                target="_blank"
                rel="noreferrer"
              >
                <span>GitHub</span>
                <strong>github.com/AlthafSulistyo</strong>
                <Arrow diagonal />
              </a>
            </Reveal>
            <Reveal>
              <a className="button primary contact-cv" href={cvLink} download>
                Unduh CV <span aria-hidden="true">↓</span>
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-wordmark">Althaf Sulistyo</div>
          <div className="footer-bottom job-footer">
            <span>© 2026 Althaf Sulistyo Wicaksono</span>
            <a href="#top">
              Kembali ke atas <span>↑</span>
            </a>
          </div>
        </div>
      </footer>

      {selectedProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setSelectedProject(null)}
        >
          <div
            className="project-modal case-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Tutup detail"
            >
              ×
            </button>
            <ProjectVisual
              type={selectedProject.visual}
              imageUrl={selectedProject.imageUrl}
            />
            <div className="modal-content">
              <div className="modal-topline">
                <span className="project-number">{selectedProject.number}</span>
                <p className="project-category">{selectedProject.category}</p>
              </div>
              <h2 id="modal-title">{selectedProject.name}</h2>
              <div className="case-role">
                <div>
                  <span>Peran</span>
                  <p>{selectedProject.role}</p>
                </div>
                <div>
                  <span>Periode</span>
                  <p>{selectedProject.period}</p>
                </div>
              </div>
              <div className="case-study">
                <div>
                  <span>Masalah</span>
                  <p>{selectedProject.problem}</p>
                </div>
                <div>
                  <span>Solusi</span>
                  <p>{selectedProject.solution}</p>
                </div>
                <div>
                  <span>Hasil</span>
                  <p>{selectedProject.result}</p>
                </div>
              </div>
              <div className="tech-pills">
                {selectedProject.tech.map((tech) => (
                  <i key={tech}>{tech}</i>
                ))}
              </div>
              <div className="modal-actions">
                <a
                  className="button primary"
                  href="#"
                  onClick={(event) => event.preventDefault()}
                >
                  Lihat kode <Arrow diagonal />
                </a>
                <a
                  className="button secondary"
                  href={selectedProject.demoUrl || "#"}
                  target={selectedProject.demoUrl ? "_blank" : undefined}
                  rel={selectedProject.demoUrl ? "noreferrer" : undefined}
                  onClick={
                    selectedProject.demoUrl
                      ? undefined
                      : (event) => event.preventDefault()
                  }
                >
                  Lihat demo <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCertificate && (
        <div
          className="cert-lightbox-backdrop"
          role="presentation"
          onMouseDown={() => setSelectedCertificate(null)}
        >
          <div
            className="cert-lightbox-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedCertificate(null)}
              aria-label="Tutup pratinjau sertifikat"
            >
              ×
            </button>
            {selectedCertificate.secondaryImageUrl && (
              <div className="cert-page-switch">
                <button
                  type="button"
                  className={activeCertPage === 0 ? "active" : ""}
                  onClick={() => setActiveCertPage(0)}
                >
                  Sertifikat Kelulusan
                </button>
                <button
                  type="button"
                  className={activeCertPage === 1 ? "active" : ""}
                  onClick={() => setActiveCertPage(1)}
                >
                  Transkrip Nilai (82,0 / A-)
                </button>
              </div>
            )}
            <div className="cert-lightbox-img-container">
              <img
                src={
                  activeCertPage === 1 && selectedCertificate.secondaryImageUrl
                    ? selectedCertificate.secondaryImageUrl
                    : selectedCertificate.imageUrl
                }
                alt={selectedCertificate.title}
              />
            </div>
            <div className="cert-lightbox-body">
              <div className="cert-lightbox-details">
                <span className="cert-lightbox-category">
                  {selectedCertificate.category}
                </span>
                <h3 id="cert-modal-title">{selectedCertificate.title}</h3>
                <p>
                  <span>{selectedCertificate.issuer}</span> ·{" "}
                  <strong>{selectedCertificate.scoreOrDate}</strong>
                </p>
                {selectedCertificate.description && (
                  <p className="cert-lightbox-desc">
                    {selectedCertificate.description}
                  </p>
                )}
              </div>
              <div className="cert-lightbox-btns">
                {selectedCertificate.credentialUrl && (
                  <a
                    className="button primary"
                    href={selectedCertificate.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Verifikasi Kredensial <Arrow diagonal />
                  </a>
                )}
                <a
                  className="button secondary"
                  href={
                    activeCertPage === 1 && selectedCertificate.secondaryImageUrl
                      ? selectedCertificate.secondaryImageUrl
                      : selectedCertificate.imageUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Buka Gambar Asli <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  if (currentPath === "/proyek/schoolguard") {
    return <SchoolGuardCaseStudy />
  }
  if (currentPath === "/proyek/vesta") {
    return <VestaCaseStudy />
  }
  if (currentPath === "/proyek/ai-risk-modeler") {
    return <AiRiskModelerCaseStudy />
  }
  if (currentPath === "/proyek/dapodik") {
    return <DapodikCaseStudy />
  }
  if (currentPath === "/proyek/riset") {
    return <RisetCaseStudy />
  }

  return <PortfolioHome />
}
