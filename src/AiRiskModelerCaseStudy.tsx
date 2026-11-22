import { useEffect, useRef, useState } from "react"

const demoUrl =
  "https://www.figma.com/make/xNRXNa8rJfj752O8ZWRfkO/Prototipe-AI-Pemodel-Risiko?fullscreen=1&t=iC23QwxwTyW9Zcsb-1&code-node-id=0-9"

const miniNav = [
  ["latar-belakang", "Latar belakang"],
  ["masalah", "Masalah"],
  ["solusi", "Solusi & Parameter"],
  ["desain", "Keputusan Desain"],
  ["hasil", "Hasil & Dampak"],
]

const needs = [
  [
    "01",
    "Pemodelan Dampak Pestisida & Kimia",
    "Penggunaan pestisida sintetis (seperti Piretroid) dan dosis pupuk kimia berlebih berisiko merusak populasi mikrofauna tanah yang menjaga siklus hara alami.",
  ],
  [
    "02",
    "Kalibrasi Parameter Lingkungan Nyata",
    "Daya tahan mikrofauna tanah sangat dipengaruhi oleh fluktuasi pH tanah, kelembaban, suhu rata-rata, serta persentase bahan organik tanah.",
  ],
  [
    "03",
    "Alur Analisis Bertahap yang Rapi",
    "Pengguna membutuhkan pembagian kerja yang terstruktur mulai dari tahap Input Parameter, Penilaian Risiko, Analisis Grafik, hingga Rekomendasi Solusi.",
  ],
  [
    "04",
    "Rekomendasi Praktik Berkelanjutan",
    "Sistem kecerdasan buatan harus mampu memberikan anjuran rotasi tanaman, metode pengolahan tanah ramah lingkungan, dan dosis aplikasi yang aman.",
  ],
]

const features = [
  {
    title: "Parameter Lahan Pertanian Presisi",
    text: "Kontrol input komprehensif mencakup jenis pestisida, frekuensi aplikasi, konsentrasi, pH, kelembaban, suhu, bahan organik, hingga intensitas pupuk kimia.",
  },
  {
    title: "AI Risk Prediction & Scoring",
    text: "Algoritma machine learning yang mengevaluasi tingkat ancaman kepunahan mikrofauna dan mengklasifikasikan status kelayakan lahan pertanian.",
  },
  {
    title: "Actionable Eco-Farming Strategy",
    text: "Saran taktis mitigasi risiko seperti penyesuaian rotasi tanaman multi-jenis dan teknik pengolahan tanah minimum untuk memulihkan ekosistem mikrofauna.",
  },
]

const designDecisions = [
  [
    "01",
    "Palet Warna Semantik Cerdas",
    "Aksen ungu neon (#a855f7) untuk fitur cerdas AI, dipadu dengan warna status risiko standar (hijau aman, kuning waspada, merah kritis).",
  ],
  [
    "02",
    "Micro-interactions Responsif",
    "Setiap pergeseran slider memicu pembaruan animasi grafik secara real-time untuk memberi rasa kendali penuh bagi pengguna.",
  ],
  [
    "03",
    "Tata Letak Kartu Modular",
    "Pemisahan panel input parameter di sisi kiri dan kanvas visualisasi hasil di sisi kanan agar alur analisis tetap fokus dan berimbang.",
  ],
  [
    "04",
    "Optimalisasi Fullscreen View",
    "Dirancang khusus untuk pengalaman presentasi layar penuh pada rapat dewan atau sesi pitching strategi perusahaan.",
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

export default function AiRiskModelerCaseStudy() {
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
              <span className="eyebrow">Studi kasus AI & Ekologi · 2026</span>
              <h1>
                Mikrofauna Tanah, <em>prediksi risiko kepunahan AI.</em>
              </h1>
              <p>
                Sistem kecerdasan buatan untuk memprediksi risiko kepunahan mikrofauna
                tanah di lahan pertanian berdasarkan praktik manajemen dan kondisi
                lingkungan.
              </p>
              <div className="case-meta">
                <div>
                  <span>Peran</span>
                  <strong>Product Designer & AI Prototyper</strong>
                </div>
                <div>
                  <span>Periode</span>
                  <strong>2026</strong>
                </div>
                <div>
                  <span>Platform</span>
                  <strong>Figma Make Web App (Interactive Prototype)</strong>
                </div>
                <div>
                  <span>Tech stack</span>
                  <div className="card-tech" style={{ marginTop: 6 }}>
                    <span>Figma Make</span>
                    <span>AI Simulation</span>
                    <span>UI/UX</span>
                    <span>Data Science</span>
                    <span>AgriTech</span>
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
                  Buka demo interaktif <span aria-hidden="true">↗</span>
                </a>
                <button
                  className="button secondary"
                  onClick={() => scrollTo("solusi")}
                >
                  Lihat parameter <span aria-hidden="true">↓</span>
                </button>
              </div>
            </Reveal>

            <Reveal className="case-browser">
              <div className="browser-bar">
                <div>
                  <i />
                  <i />
                  <i />
                </div>
                <span>AI Pemodel Risiko Kepunahan Mikrofauna Tanah — Figma Make</span>
              </div>
              <div className="browser-image">
                <img
                  src="/ai-risk-modeler.png"
                  alt="Tampilan Antarmuka AI Pemodel Risiko Kepunahan Mikrofauna Tanah"
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
                lead="Menjaga tanah"
                accent="dengan kecerdasan buatan."
              />
            </Reveal>
            <div className="story-grid">
              <Reveal className="story-copy">
                <p>
                  Mikrofauna tanah (seperti cacing, nematoda, dan mikro-artropoda)
                  adalah pahlawan tak terlihat yang menjadi fondasi kesuburan
                  ekosistem pertanian. Mereka menggemburkan tanah, mendaur ulang
                  nutrisi organik, dan menjaga porositas air alami.
                </p>
                <p>
                  Namun, intensitas penggunaan pestisida kimia sintetis (seperti
                  Piretroid), konsentrasi dosis yang berlebihan, penurunan bahan
                  organik, serta metode pengolahan tanah agresif sering kali
                  memicu penurunan drastis populasi mikrofauna tanpa disadari
                  oleh petani maupun agronomis.
                </p>
                <p>
                  Prototipe AI ini hadir untuk menjembatani sains ekologi tanah
                  dengan antarmuka simulasi prediktif: memungkinkan pengguna
                  memasukkan parameter lahan riil, menilai risiko kepunahan, dan
                  memperoleh rekomendasi pemulihan sebelum degradasi lahan menjadi
                  permanen.
                </p>
              </Reveal>
              <Reveal className="pull-quote" delay={100}>
                <blockquote>
                  “Kesuburan pangan dunia bertumpu pada mikrofauna tanah yang
                  kasat mata; melindungi mereka dimulai dari pemodelan risiko yang
                  akurat.”
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
                lead="Kerapuhan analisis"
                accent="konvensional."
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
                label="Solusi & Simulasi"
                lead="Eksplorasi skenario"
                accent="tanpa jeda."
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
                        background: "#110d1a",
                      }}
                    >
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a855f7" }} />
                        <span style={{ fontSize: 11, color: "#a855f7", letterSpacing: "0.08em", fontWeight: 700 }}>
                          MODUL AI 0{index + 1}
                        </span>
                      </div>
                      <div style={{ fontSize: 18, color: "#f8fafc", fontWeight: 600 }}>{feat.title}</div>
                      <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{feat.text}</div>
                    </div>
                    <div>
                      <span>0{index + 1}</span>
                      <h3>{feat.title}</h3>
                      <p>{feat.text}</p>
                      {index === 0 && (
                        <ul>
                          <li>Slider parameter interaktif dengan step presisi</li>
                          <li>Perhitungan otomatis Value at Risk (VaR)</li>
                          <li>Indikator toleransi ambang batas (Threshold Alert)</li>
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
                  <h3>Peta Panas Matriks Risiko (Risk Heatmap)</h3>
                  <p style={{ color: "#98939f", fontSize: 13, marginTop: 8 }}>
                    Gradasi warna 2D memetakan konsentrasi bahaya berdasarkan
                    frekuensi kejadian dan bobot kerugian finansial.
                  </p>
                </div>
                <div>
                  <span>05</span>
                  <h3>Mode Layar Penuh (Figma Make Fullscreen)</h3>
                  <p style={{ color: "#98939f", fontSize: 13, marginTop: 8 }}>
                    Dukungan mode fullscreen tanpa distraksi untuk simulasi langsung
                    di hadapan dewan direksi dan investor.
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
                label="Keputusan Desain"
                lead="Kejelasan visual,"
                accent="presisi analitik."
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
                <div className="logo-placeholder" aria-label="Logo AI Risk Modeler">
                  <span style={{ fontSize: 38, color: "#c084fc", borderColor: "rgba(192, 132, 252, 0.45)" }}>
                    AI
                  </span>
                </div>
                <div className="color-strip" aria-label="Palet warna AI Risk Modeler">
                  <i style={{ background: "#a855f7" }} title="AI Violet" />
                  <i style={{ background: "#f59e0b" }} title="Amber Caution" />
                  <i style={{ background: "#10b981" }} title="Emerald Stable" />
                  <i style={{ background: "#130f1e" }} title="Deep Space Navy" />
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
                lead="Simulasi yang"
                accent="dapat diandalkan."
              />
            </Reveal>
            <Reveal>
              <div className="results-placeholder">
                <div className="empty-stats">
                  <div>
                    <strong>100%</strong>
                    <span>Prototipe interaktif berfungsi penuh di Figma Make</span>
                  </div>
                  <div>
                    <strong>&lt; 1s</strong>
                    <span>Waktu reaksi simulasi terhadap pergeseran parameter</span>
                  </div>
                  <div>
                    <strong>4x</strong>
                    <span>Kecepatan mengevaluasi opsi skenario mitigasi risiko</span>
                  </div>
                </div>
                <p>
                  Prototipe berhasil memvalidasi alur kerja analisis risiko modern,
                  membuktikan bahwa konsep machine learning kompleks dapat
                  disajikan secara elegan dan transparan bagi pembuat keputusan.
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
                lead="Transparansi"
                accent="di era kecerdasan buatan."
              />
              <p>
                Merancang antarmuka bertenaga AI mengajarkan saya bahwa kecepatan
                prediksi tidak ada artinya jika pengguna tidak memahami logika di
                baliknya. Prinsip <em>Explainable AI</em> dan kontrol interaktif
                adalah kunci utama dalam membangun kepercayaan antara manusia dan
                sistem otomatis.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="case-cta">
          <div className="container">
            <Reveal>
              <h2>
                Ingin mencoba <em>simulasi AI?</em>
              </h2>
              <div>
                <a
                  className="button primary"
                  href={demoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buka prototipe Figma <span aria-hidden="true">↗</span>
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
                href="/proyek/dapodik"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("/proyek/dapodik")
                }}
              >
                <span>Proyek berikutnya</span>
                <strong>Sistem Data Sekolah</strong>
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
