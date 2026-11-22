import { useEffect, useRef, useState } from "react"

const demoUrl = "https://genuine-entremet-f67570.netlify.app/"

const miniNav = [
  ["latar-belakang", "Latar belakang"],
  ["solusi", "Solusi"],
  ["fitur", "Fitur"],
  ["desain", "Desain"],
  ["hasil", "Hasil"],
]

const needs = [
  [
    "01",
    "Pencatatan harian yang cepat",
    "Setoran dan penarikan bisa dicatat dalam hitungan detik.",
  ],
  [
    "02",
    "Banyak anak, satu pengelola",
    "Setiap anak punya catatan sendiri dalam satu sistem.",
  ],
  [
    "03",
    "Riwayat yang jelas",
    "Semua transaksi bisa dilihat dan dicari kembali kapan saja.",
  ],
  [
    "04",
    "Laporan yang mudah dibagikan",
    "Data bisa diekspor untuk dokumentasi dan pelaporan.",
  ],
]

const features = [
  [
    "Dashboard",
    "Ringkasan kondisi keuangan secara keseluruhan untuk memberi gambaran cepat sebelum masuk ke detail.",
    "dashboard",
  ],
  [
    "Manajemen Anak",
    "Mengelola data setiap anak yang uangnya dititipkan dalam satu tempat yang mudah ditinjau.",
    "children",
  ],
  [
    "Riwayat Transaksi",
    "Halaman utama pencatatan dengan empat kartu ringkasan: Total Setoran, Total Penarikan, Arus Kas Bersih, dan Total Transaksi dalam 30 hari. Data dapat difilter berdasarkan rentang tanggal, jenis transaksi, serta nama anak, lalu dikembalikan melalui Reset Filter.",
    "history",
  ],
]

const designDecisions = [
  [
    "01",
    "Warna semantik",
    "Hijau untuk setoran dan merah untuk penarikan agar jenis transaksi langsung terbaca.",
  ],
  [
    "02",
    "Angka yang menonjol",
    "Angka besar pada kartu ringkasan memudahkan pengelola menangkap kondisi utama.",
  ],
  [
    "03",
    "Navigasi sederhana",
    "Sidebar dibatasi pada tiga menu utama agar perpindahan halaman tetap jelas.",
  ],
  [
    "04",
    "Identitas mandiri",
    "Logo Vesta dirancang sendiri untuk memberi identitas yang konsisten pada aplikasi.",
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

function AppPreview({ variant }: { variant: string }) {
  return (
    <div className={`case-preview preview-${variant}`} aria-hidden="true">
      <div className="preview-sidebar">
        <i />
        <span />
        <span />
        <span />
      </div>
      <div className="preview-main">
        <div className="preview-title" />
        <div className="preview-cards">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="preview-panel">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}

function navigateTo(route: string) {
  window.history.pushState({}, "", route)
  window.dispatchEvent(new PopStateEvent("popstate"))
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export default function VestaCaseStudy() {
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
              <span className="eyebrow">Studi kasus · 2026</span>
              <h1>
                Vesta, <em>menabung tanpa ribet.</em>
              </h1>
              <p>
                Aplikasi web manajemen keuangan anak asrama untuk mencatat
                setoran dan penarikan uang harian dengan mudah.
              </p>
              <div className="case-meta">
                <div>
                  <span>Peran</span>
                  <strong>Developer & UI/UX Designer</strong>
                </div>
                <div>
                  <span>Periode</span>
                  <strong>Feb – Mar 2026</strong>
                </div>
                <div>
                  <span>Platform</span>
                  <strong>Web app responsif</strong>
                </div>
                <div>
                  <span>Tech stack</span>
                  <div className="card-tech" style={{ marginTop: 6 }}>
                    <span>Figma</span>
                    <span>UI/UX</span>
                    <span>Front-end</span>
                    <span>Tailwind CSS</span>
                  </div>
                </div>
              </div>
              <div className="hero-actions">
                <a
                  className="button primary"
                  href={demoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buka demo <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="button secondary"
                  href="#"
                  onClick={(event) => event.preventDefault()}
                >
                  Lihat kode <span aria-hidden="true">↗</span>
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
                <span>Vesta</span>
              </div>
              <div className="browser-image">
                <img
                  src="/vesta-dashboard.png"
                  alt="Tampilan halaman riwayat transaksi Vesta"
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
                lead="Berawal dari"
                accent="keluhan sederhana."
              />
            </Reveal>
            <div className="story-grid">
              <Reveal className="story-copy">
                <p>
                  Vesta lahir dari obrolan dengan seorang teman, seorang ustaz
                  yang bertanggung jawab atas salah satu asrama. Ia mengeluh:
                  uang saku anak-anak yang dititipkan kepadanya sulit dikelola
                  dengan baik. Setoran dan penarikan terjadi hampir setiap hari,
                  dan pencatatan manual membuatnya sulit melacak siapa menyetor
                  berapa, siapa mengambil kapan, dan berapa saldo yang tersisa.
                </p>
                <p>
                  Ia bertanya kepada saya: adakah aplikasi keuangan yang cocok
                  untuk menyimpan dan mengambil uang dengan mudah, per hari?
                  Saya menyarankan ia mencari rekomendasi di TikTok dan
                  internet. Hasilnya, tidak ada aplikasi yang benar-benar sesuai
                  kebutuhannya. Kebanyakan dirancang untuk dompet pribadi atau
                  keluarga, bukan untuk satu pengelola yang mengurus uang banyak
                  anak sekaligus.
                </p>
                <p>Dari situ saya menawarkan diri untuk membuatnya sendiri.</p>
              </Reveal>
              <Reveal className="pull-quote" delay={100}>
                <blockquote>
                  “Tidak ada yang cocok, jadi kami membuatnya.”
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
                lead="Apa yang"
                accent="sebenarnya dibutuhkan."
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
                lead="Dirancang"
                accent="untuk satu tujuan."
              />
            </Reveal>
            <div className="feature-list" id="fitur">
              {features.map(([title, text, variant], index) => (
                <Reveal key={title}>
                  <article className={index % 2 ? "reverse" : ""}>
                    <AppPreview variant={variant} />
                    <div>
                      <span>0{index + 1}</span>
                      <h3>{title}</h3>
                      <p>{text}</p>
                      {variant === "history" && (
                        <ul>
                          <li>Transaksi dikelompokkan per hari</li>
                          <li>Total setoran dan penarikan harian</li>
                          <li>
                            Waktu, nama anak, jenis, nominal, dan keterangan
                          </li>
                          <li>Export CSV</li>
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
                  <h3>Mode gelap dan terang</h3>
                </div>
                <div>
                  <span>05</span>
                  <h3>Responsif di ponsel dan laptop</h3>
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
                label="Desain"
                lead="Jelas dibaca,"
                accent="nyaman dipakai."
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
                <div
                  className="logo-placeholder"
                  aria-label="Placeholder logo Vesta"
                >
                  <span>V</span>
                </div>
                <div className="color-strip" aria-label="Palet warna Vesta">
                  <i className="green" />
                  <i className="red" />
                  <i className="blue" />
                  <i className="navy" />
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
                label="Hasil & penggunaan"
                lead="Hasil &"
                accent="penggunaan."
              />
            </Reveal>
            <Reveal>
              <div className="results-placeholder">
                <div className="empty-stats">
                  <div>
                    <strong>30+</strong>
                    <span>Santri aktif terkelola dalam satu sistem</span>
                  </div>
                  <div>
                    <strong>100%</strong>
                    <span>Setoran dan penarikan harian tercatat rapi</span>
                  </div>
                  <div>
                    <strong>0</strong>
                    <span>Selisih saldo fisik vs pencatatan digital</span>
                  </div>
                </div>
                <p>
                  Digunakan oleh pengelola asrama untuk mencatat transaksi harian
                  santri secara konsisten, menggantikan buku tulis manual menjadi
                  sistem digital.
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
                lead="Masalah dulu,"
                accent="baru merancang."
              />
              <p>
                Membangun aplikasi dari kebutuhan nyata satu pengguna
                mengajarkan saya pentingnya memahami masalah sebelum merancang,
                serta menjaga alur pencatatan tetap sesederhana mungkin agar
                benar-benar membantu dalam penggunaan sehari-hari.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="case-cta">
          <div className="container">
            <Reveal>
              <h2>
                Mau lihat <em>langsung?</em>
              </h2>
              <div>
                <a
                  className="button primary"
                  href={demoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buka demo Vesta <span aria-hidden="true">↗</span>
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
                href="/proyek/ai-risk-modeler"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("/proyek/ai-risk-modeler")
                }}
              >
                <span>Proyek berikutnya</span>
                <strong>Prototipe AI Pemodel Risiko</strong>
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
