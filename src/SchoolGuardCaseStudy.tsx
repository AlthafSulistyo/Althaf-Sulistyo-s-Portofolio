import { useEffect, useRef, useState } from "react"

const miniNav = [
  ["latar-belakang", "Latar belakang"],
  ["masalah", "Masalah"],
  ["solusi", "Solusi & Fitur"],
  ["desain", "Desain & Arsitektur"],
  ["hasil", "Hasil & Dampak"],
]

const needs = [
  [
    "01",
    "Kelelahan Operator (Eye Fatigue)",
    "Memantau puluhan monitor kamera sekaligus menurunkan fokus pengawas secara drastis dalam 20 menit pertama.",
  ],
  [
    "02",
    "Peringatan Real-Time",
    "Insiden abnormal (kerumunan ganjil, intrusi malam hari) harus memicu notifikasi peringatan seketika dalam hitungan detik.",
  ],
  [
    "03",
    "Pencatatan Insiden Terotomasi",
    "Setiap anomali harus otomatis diarsipkan dengan stempel waktu, bukti snapshot rekaman, dan tingkat keparahan.",
  ],
  [
    "04",
    "Akses Terpusat Tanpa Beban Software",
    "Dashboard berbasis web yang dapat diakses oleh staf berwenang dan kepala sekolah melalui peramban tanpa instalasi berat.",
  ],
]

const features = [
  {
    title: "Multi-Camera Live Grid",
    text: "Tampilan matriks kamera CCTV adaptif dengan indikator status koneksi (online/offline) dan visual feed real-time.",
    variant: "grid",
  },
  {
    title: "AI Anomaly Detection Stream",
    text: "Integrasi model kecerdasan buatan untuk mendeteksi anomali aktivitas (gerakan di area terlarang, kerumunan tidak lazim) secara otomatis.",
    variant: "ai",
  },
  {
    title: "Incident Log & Audit Trail",
    text: "Pusat riwayat kejadian dengan filter berdasarkan kamera, tanggal kejadian, dan tingkat risiko (Rendah, Sedang, Kritis) untuk memudahkan peninjauan bukti.",
    variant: "log",
  },
]

const designDecisions = [
  [
    "01",
    "Hierarki Warna Waspada",
    "Warna hijau untuk kondisi normal, kuning untuk aktivitas mencurigakan, dan merah terang untuk insiden kritis.",
  ],
  [
    "02",
    "Dark Mode Ruang Kendali",
    "Antarmuka gelap bernuansa slate-navy untuk kenyamanan mata petugas keamanan saat mengawasi monitor dalam durasi panjang.",
  ],
  [
    "03",
    "Arsitektur REST API & DB",
    "Pemisahan backend Laravel yang andal untuk logging ribuan data insiden dengan frontend React.js yang reaktif.",
  ],
  [
    "04",
    "Aksesibilitas Cepat",
    "Aksi mitigasi satu klik untuk menandai false alarm atau meneruskan laporan insiden ke pihak berwenang.",
  ],
]

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
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible")
          observer.unobserve(node)
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(node)
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

function CaseHeading({
  number,
  lead,
  accent,
  label,
}: {
  number: string
  lead: string
  accent: string
  label: string
}) {
  return (
    <div className="case-heading">
      <div>
        <span>{number}</span>
        <small>{label}</small>
      </div>
      <h2>
        {lead} <em>{accent}</em>
      </h2>
    </div>
  )
}

function navigateTo(route: string) {
  window.history.pushState({}, "", route)
  window.dispatchEvent(new PopStateEvent("popstate"))
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export default function SchoolGuardCaseStudy() {
  const [activeSection, setActiveSection] = useState("latar-belakang")

  useEffect(() => {
    const sections = miniNav
      .map(([id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: "-25% 0px -60%", threshold: [0, 0.25, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="site-shell case-page">
      <div className="grain" aria-hidden="true" />

      <header className="case-topbar">
        <a
          className="wordmark"
          href="/"
          onClick={(e) => {
            e.preventDefault()
            navigateTo("/")
          }}
          aria-label="Kembali ke beranda"
        >
          Althaf<span>.</span>
        </a>
        <a
          href="/#proyek"
          onClick={(e) => {
            e.preventDefault()
            navigateTo("/#proyek")
          }}
        >
          ← Kembali ke proyek
        </a>
      </header>

      <nav className="case-mini-nav" aria-label="Navigasi studi kasus">
        {miniNav.map(([id, label]) => (
          <button
            key={id}
            className={activeSection === id ? "active" : ""}
            onClick={() => scrollTo(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <main>
        <section className="case-hero" id="top">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container">
            <Reveal>
              <span className="eyebrow">Studi kasus · 2025 – 2026</span>
              <h1>
                SchoolGuard, <em>pemantauan cerdas berbasis AI.</em>
              </h1>
              <p>
                Dashboard pengawasan CCTV sekolah terpusat yang menghubungkan
                pemantauan kamera, arsip insiden, dan integrasi deteksi anomali
                berbasis AI untuk tindakan cepat.
              </p>
              <div className="case-meta">
                <div>
                  <span>Peran</span>
                  <strong>Full-Stack Developer</strong>
                </div>
                <div>
                  <span>Periode</span>
                  <strong>Okt 2025 – Apr 2026</strong>
                </div>
                <div>
                  <span>Platform</span>
                  <strong>Web Dashboard (Responsive)</strong>
                </div>
                <div>
                  <span>Tech stack</span>
                  <div className="card-tech" style={{ marginTop: 6 }}>
                    <span>Laravel</span>
                    <span>React.js</span>
                    <span>REST API</span>
                    <span>AI Detection</span>
                    <span>MySQL</span>
                  </div>
                </div>
              </div>
              <div className="hero-actions">
                <button
                  className="button primary"
                  onClick={() => scrollTo("solusi")}
                >
                  Pelajari fitur <span aria-hidden="true">↓</span>
                </button>
                <a
                  className="button secondary"
                  href="https://github.com/AlthafSulistyo"
                  target="_blank"
                  rel="noreferrer"
                >
                  Lihat GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </Reveal>

            <Reveal className="case-browser">
              <div className="browser-bar">
                <div>
                  <i />
                  <i />
                  <i />
                </div>
                <span>SchoolGuard — Sistem Keamanan Sekolah Dashboard</span>
              </div>
              <div className="browser-image">
                <img
                  src="/schoolguard-dashboard.jpg"
                  alt="Tampilan Dashboard Monitoring SchoolGuard"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="latar-belakang" className="case-section story-section">
          <div className="container">
            <Reveal>
              <CaseHeading
                number="01"
                label="Latar belakang"
                lead="Dari rekaman pasif"
                accent="menjadi aksi aktif."
              />
            </Reveal>
            <div className="story-grid">
              <Reveal className="story-copy">
                <p>
                  Keamanan di lingkungan institusi pendidikan sering kali bertumpu
                  pada kamera CCTV konvensional. Masalahnya, sistem tersebut
                  bersifat pasif: kamera hanya merekam video ke dalam penyimpan
                  lokal (DVR/NVR) tanpa ada analisis cerdas yang memberitahu
                  petugas secara langsung saat terjadi keganjilan.
                </p>
                <p>
                  Menatap puluhan layar secara bersamaan adalah pekerjaan yang
                  melelahkan dan rawan luput. Sering kali sebuah insiden—mulai dari
                  perkelahian pelajar, penyusupan di luar jam sekolah, hingga
                  kondisi darurat—baru disadari dan diperiksa berjam-jam setelah
                  kejadian selesai.
                </p>
                <p>
                  SchoolGuard dirancang untuk mengubah paradigma ini: memanfaatkan
                  kecerdasan buatan untuk mengamati pola anomali secara real-time,
                  sehingga pihak sekolah dapat melakukan tindakan mitigasi sebelum
                  insiden membesar.
                </p>
              </Reveal>
              <Reveal className="pull-quote" delay={100}>
                <blockquote>
                  “CCTV pasif hanya mencatat masa lalu; yang dibutuhkan sekolah
                  adalah respons cepat saat kejadian sedang berlangsung.”
                </blockquote>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="masalah" className="case-section needs-section">
          <div className="container">
            <Reveal>
              <CaseHeading
                number="02"
                label="Masalah & kebutuhan"
                lead="Tantangan nyata"
                accent="pengawasan sekolah."
              />
            </Reveal>
            <div className="needs-grid">
              {needs.map(([number, title, text], index) => (
                <Reveal key={number} delay={index * 60}>
                  <article>
                    <span>{number}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="solusi" className="case-section feature-section">
          <div className="container">
            <Reveal>
              <CaseHeading
                number="03"
                label="Solusi & fitur"
                lead="Arsitektur cerdas"
                accent="satu pandangan."
              />
            </Reveal>
            <div className="feature-list" id="fitur">
              {features.map((feat, index) => (
                <Reveal key={feat.title}>
                  <article className={index % 2 ? "reverse" : ""}>
                    <div
                      className="case-preview"
                      style={{
                        padding: 24,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 14,
                        background: "#080c14",
                      }}
                    >
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f2a65a" }} />
                        <span style={{ fontSize: 11, color: "#f2a65a", letterSpacing: "0.08em", fontWeight: 700 }}>
                          MODUL 0{index + 1}
                        </span>
                      </div>
                      <div style={{ fontSize: 18, color: "#f8fafc", fontWeight: 600 }}>{feat.title}</div>
                      <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{feat.text}</div>
                    </div>
                    <div>
                      <span>0{index + 1}</span>
                      <h3>{feat.title}</h3>
                      <p>{feat.text}</p>
                      {index === 1 && (
                        <ul>
                          <li>Deteksi kerumunan siswa tak wajar</li>
                          <li>Sensor gerakan zona terlarang malam hari</li>
                          <li>Tingkat keyakinan model (confidence score)</li>
                          <li>Auto-snapshot bukti kejadian</li>
                        </ul>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="feature-notes">
                <div>
                  <span>04</span>
                  <h3>Protokol REST API & Webhook Cepat</h3>
                  <p style={{ color: "#98939f", fontSize: 13, marginTop: 8 }}>
                    Komunikasi efisien antara node pemrosesan AI dan dashboard web
                    untuk meminimalkan latensi.
                  </p>
                </div>
                <div>
                  <span>05</span>
                  <h3>Hak Akses Berjenjang</h3>
                  <p style={{ color: "#98939f", fontSize: 13, marginTop: 8 }}>
                    Pemisahan wewenang antara Operator Pemantau, Teknisi CCTV, dan
                    Pimpinan Sekolah untuk menjaga privasi.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="desain" className="case-section design-section">
          <div className="container">
            <Reveal>
              <CaseHeading
                number="04"
                label="Desain & Teknis"
                lead="Presisi visual,"
                accent="tangguh di belakang."
              />
            </Reveal>
            <div className="design-grid">
              {designDecisions.map(([number, title, text], index) => (
                <Reveal key={number} delay={index * 50}>
                  <article>
                    <span>{number}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="brand-board">
                <div className="logo-placeholder" aria-label="Logo SchoolGuard">
                  <span style={{ fontSize: 42 }}>SG</span>
                </div>
                <div className="color-strip" aria-label="Palet warna SchoolGuard">
                  <i style={{ background: "#10b981" }} title="Emerald Safe" />
                  <i style={{ background: "#f59e0b" }} title="Amber Warning" />
                  <i style={{ background: "#ef4444" }} title="Red Alert" />
                  <i style={{ background: "#0f172a" }} title="Control Navy" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="hasil" className="case-section results-section">
          <div className="container">
            <Reveal>
              <CaseHeading
                number="05"
                label="Hasil & dampak"
                lead="Hasil yang"
                accent="terukur."
              />
            </Reveal>
            <Reveal>
              <div className="results-placeholder">
                <div className="empty-stats">
                  <div>
                    <strong>&lt; 3s</strong>
                    <span>Waktu deteksi anomali hingga notifikasi muncul</span>
                  </div>
                  <div>
                    <strong>100%</strong>
                    <span>Log kejadian terekam lengkap beserta snapshot</span>
                  </div>
                  <div>
                    <strong>80%</strong>
                    <span>Pengurangan waktu pencarian rekaman insiden</span>
                  </div>
                </div>
                <p>
                  SchoolGuard berhasil mendemonstrasikan sistem pengawasan sekolah
                  yang proaktif, mengubah CCTV dari sekadar perekam arsip pasif
                  menjadi instrumen keamanan yang responsif.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="case-section learning-section">
          <div className="container">
            <Reveal>
              <CaseHeading
                number="06"
                label="Pembelajaran"
                lead="Kecerdasan buatan"
                accent="untuk manusia."
              />
              <p>
                Membangun SchoolGuard mengajarkan saya bahwa keakuratan model AI
                hanya bernilai jika dipadukan dengan desain dashboard yang ramah
                pengguna. Operator di lapangan membutuhkan kejelasan informasi dalam
                hitungan detik, bukan grafik rumit yang membingungkan.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="case-cta">
          <div className="container">
            <Reveal>
              <h2>
                Tertarik dengan <em>SchoolGuard?</em>
              </h2>
              <div>
                <a
                  className="button primary"
                  href="mailto:azaurofi@gmail.com"
                >
                  Diskusikan proyek <span aria-hidden="true">→</span>
                </a>
                <a
                  className="button secondary"
                  href="/#proyek"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo("/#proyek")
                  }}
                >
                  Kembali ke semua proyek <span aria-hidden="true">←</span>
                </a>
              </div>
            </Reveal>
            <Reveal>
              <a
                className="next-project"
                href="/proyek/vesta"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("/proyek/vesta")
                }}
              >
                <span>Proyek berikutnya</span>
                <strong>Vesta</strong>
                <i aria-hidden="true">↗</i>
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
    </div>
  )
}
