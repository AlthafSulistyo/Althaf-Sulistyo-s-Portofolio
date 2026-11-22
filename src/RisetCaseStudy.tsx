import { useEffect, useRef, useState } from "react"

const miniNav = [
  ["latar-belakang", "Latar belakang"],
  ["masalah", "Masalah"],
  ["solusi", "Arsitektur Sistem"],
  ["desain", "Prinsip Desain"],
  ["hasil", "Hasil Riset"],
]

const needs = [
  [
    "01",
    "Kerentanan Fisik Mesin ATM",
    "Mesin ATM yang tersebar di lokasi sepi rawan menjadi target skimming, pembongkaran paksa, atau vandalisme tanpa pengawasan langsung.",
  ],
  [
    "02",
    "Keterbatasan Bandwidth di Lokasi Remote",
    "Mengalirkan video resolusi tinggi nonstop 24/7 melalui jaringan seluler ATM sangat mahal dan rentan mengalami penurunan koneksi.",
  ],
  [
    "03",
    "Keterlambatan Deteksi Sistem Pasif",
    "Kamera CCTV konvensional tidak memiliki indra fisik untuk membedakan nasabah wajar dengan upaya perusakan bodi brankas.",
  ],
  [
    "04",
    "Kebutuhan Edge Processing",
    "Analisis sensor harus dilakukan di level perangkat tepi (edge) agar sinyal peringatan dapat dipicu tanpa jeda latensi jaringan.",
  ],
]

const features = [
  {
    title: "Multi-Sensor Fusion Node",
    text: "Memadukan sensor getaran piezoelektrik (mendeteksi benturan atau bor), sensor gerak PIR (mendeteksi keberadaan orang), dan saklar magnetik pintu brankas ke satu unit kontrol IoT.",
  },
  {
    title: "Event-Triggered Adaptive Streaming",
    text: "Kamera beroperasi pada mode hemat bandwidth (standby / frame-rate rendah) dan otomatis beralih ke streaming video definisi tinggi seketika saat sensor mendeteksi anomali fisik.",
  },
  {
    title: "Lightweight Protocol Message (MQTT)",
    text: "Pengiriman data status kesehatan perangkat (heartbeat) dan sinyal peringatan darurat menggunakan protokol MQTT berlatensi rendah yang hemat kuota data.",
  },
]

const designDecisions = [
  [
    "01",
    "Arsitektur Tiga Lapisan",
    "Pemisahan tegas antara Layer Persepsi (Sensor & Kamera), Layer Jaringan (Gateway & MQTT Broker), dan Layer Aplikasi (Monitoring Dashboard).",
  ],
  [
    "02",
    "Optimasi Efisiensi Bandwidth",
    "Pendekatan streaming berbasis event memangkas konsumsi kuota data hingga 70% dibanding pengawasan video konvensional.",
  ],
  [
    "03",
    "Mekanisme Fail-Safe Lokal",
    "Penyimpanan rekaman cadangan (buffer) di memori lokal edge device saat koneksi internet terputus, lalu otomatis disinkronisasi ketika online.",
  ],
  [
    "04",
    "Enkripsi Jalur Komunikasi",
    "Penerapan pengamanan TLS/SSL pada setiap paket telemetri dan stream video untuk mencegah intersepsi data di jaringan publik.",
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

export default function RisetCaseStudy() {
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
              <span className="eyebrow">Studi kasus riset sistem · Skripsi 2026</span>
              <h1>
                Riset CCTV IoT, <em>pengawasan cerdas mesin ATM.</em>
              </h1>
              <p>
                Tinjauan dan rancangan arsitektur sistem pengawasan CCTV real-time
                berbasis Internet of Things (IoT) pada operasional mesin ATM untuk
                deteksi dini ancaman fisik dan efisiensi transmisi data.
              </p>
              <div className="case-meta">
                <div>
                  <span>Peran</span>
                  <strong>Peneliti & Arsitek Sistem</strong>
                </div>
                <div>
                  <span>Periode</span>
                  <strong>Skripsi S1 Sistem Informasi (2025–2026)</strong>
                </div>
                <div>
                  <span>Platform</span>
                  <strong>Arsitektur Sistem IoT & CCTV Real-time</strong>
                </div>
                <div>
                  <span>Tech stack</span>
                  <div className="card-tech" style={{ marginTop: 6 }}>
                    <span>IoT</span>
                    <span>CCTV</span>
                    <span>System Architecture</span>
                    <span>MQTT</span>
                    <span>Edge Computing</span>
                  </div>
                </div>
              </div>
              <div className="hero-actions">
                <button
                  className="button primary"
                  onClick={() => scrollTo("solusi")}
                >
                  Tinjau arsitektur <span aria-hidden="true">↓</span>
                </button>
                <a
                  className="button secondary"
                  href="/althaf-sulistyo-wicaksono-cv.pdf"
                  download
                >
                  Unduh CV <span aria-hidden="true">↓</span>
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
                <span>Diagram Arsitektur Sistem CCTV Real-time Berbasis IoT (ATM Security)</span>
              </div>
              <div className="browser-image" style={{ background: "#080d16", padding: "40px 30px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                  <div style={{ background: "#0e1626", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#f2a65a", letterSpacing: "0.08em", marginBottom: 8 }}>
                      LAYER 1 • PERSEPSI & SENSOR
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#edeaf2", marginBottom: 10 }}>Perangkat Tepi (Edge)</div>
                    <ul style={{ listStyle: "none", fontSize: 11, color: "#94a3b8", display: "grid", gap: 6, padding: 0 }}>
                      <li>• Sensor Getaran (Piezo/Acc)</li>
                      <li>• Sensor Gerak PIR (Manusia)</li>
                      <li>• Magnetic Reed Switch (Pintu)</li>
                      <li>• Kamera IP CCTV (Dual-Stream)</li>
                    </ul>
                  </div>

                  <div style={{ background: "#0e1626", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#38bdf8", letterSpacing: "0.08em", marginBottom: 8 }}>
                      LAYER 2 • JARINGAN & PROTOKOL
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#edeaf2", marginBottom: 10 }}>Transmisi & Gateway</div>
                    <ul style={{ listStyle: "none", fontSize: 11, color: "#94a3b8", display: "grid", gap: 6, padding: 0 }}>
                      <li>• Protokol MQTT (Telemetry Ringan)</li>
                      <li>• RTSP / WebRTC (Live Video Stream)</li>
                      <li>• Enkripsi TLS/SSL Secure Channel</li>
                      <li>• Event-Triggered Bandwidth Shift</li>
                    </ul>
                  </div>

                  <div style={{ background: "#0e1626", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#10b981", letterSpacing: "0.08em", marginBottom: 8 }}>
                      LAYER 3 • APLIKASI & KENDALI
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#edeaf2", marginBottom: 10 }}>Pusat Monitoring Bank</div>
                    <ul style={{ listStyle: "none", fontSize: 11, color: "#94a3b8", display: "grid", gap: 6, padding: 0 }}>
                      <li>• Web Central Dashboard</li>
                      <li>• Push Notification Peringatan Kritis</li>
                      <li>• Log Kejadian & Snapshot Arsip</li>
                      <li>• Integrasi Tim Keamanan Lapangan</li>
                    </ul>
                  </div>
                </div>
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
                lead="Keamanan perbankan"
                accent="dan tantangan transmisi."
              />
            </Reveal>
            <div className="story-grid">
              <Reveal className="story-copy">
                <p>
                  Mesin ATM merupakan titik sentral transaksi tunai perbankan yang
                  beroperasi 24 jam sehari, sering kali ditempatkan di lokasi mandiri
                  yang jauh dari kantor cabang. Risiko kejahatan fisik—seperti
                  pembongkaran mesin menggunakan las atau gerinda, pemasangan alat
                  skimmer kartu, hingga pembobolan brankas—masih menjadi ancaman
                  serius bagi industri keuangan.
                </p>
                <p>
                  Sistem CCTV ATM konvensional saat ini mayoritas hanya merekam secara
                  lokal (*standalone*). Ketika terjadi vandalisme, rekaman baru
                  diperiksa setelah uang hilang atau nasabah mengeluh. Selain itu,
                  mengalirkan video resolusi tinggi secara terus-menerus melalui
                  jaringan seluler ATM terkendala oleh biaya kuota data yang tinggi
                  dan ketidakstabilan sinyal di daerah pelosok.
                </p>
                <p>
                  Penelitian skripsi ini merancang kerangka arsitektur sistem CCTV
                  berbasis IoT yang cerdas: memanfaatkan sensor fisik untuk memicu
                  streaming video kualitas tinggi hanya saat terdeteksi anomali nyata,
                  menjaga keamanan optimal sekaligus menghemat bandwidth transmisi.
                </p>
              </Reveal>
              <Reveal className="pull-quote" delay={100}>
                <blockquote>
                  “Sistem pengawasan modern bukan tentang merekam segalanya,
                  melainkan tentang mengenali saat genting dan bereaksi seketika.”
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
                lead="Batasan teknis"
                accent="di lapangan."
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
                label="Arsitektur Sistem"
                lead="Rancangan solusi"
                accent="tiga lapisan."
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
                        background: "#080d16",
                      }}
                    >
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f2a65a" }} />
                        <span style={{ fontSize: 11, color: "#f2a65a", letterSpacing: "0.08em", fontWeight: 700 }}>
                          KOMPONEN 0{index + 1}
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
                          <li>Mode hemat (standby 1 fps atau snapshot interval)</li>
                          <li>Otomatis transisi ke 25 fps Full HD saat sensor terpicu</li>
                          <li>Pengurangan biaya data seluler yang signifikan</li>
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
                  <h3>Penyimpanan Cadangan Edge (Offline Buffer)</h3>
                  <p style={{ color: "#98939f", fontSize: 13, marginTop: 8 }}>
                    Rekaman insiden tetap aman di micro-storage lokal ketika koneksi
                    jaringan drop, dan otomatis dikirim saat jaringan kembali normal.
                  </p>
                </div>
                <div>
                  <span>05</span>
                  <h3>Protokol Keamanan Enkripsi</h3>
                  <p style={{ color: "#98939f", fontSize: 13, marginTop: 8 }}>
                    Komunikasi telemetri dilindungi sertifikat keamanan untuk
                    menangkal serangan man-in-the-middle atau sabotase sinyal.
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
                label="Prinsip Desain"
                lead="Arsitektur tangguh,"
                accent="efisien dan teruji."
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
                <div className="logo-placeholder" aria-label="Simbol Riset IoT">
                  <span style={{ fontSize: 42 }}>IoT</span>
                </div>
                <div className="color-strip" aria-label="Palet warna Riset IoT">
                  <i style={{ background: "#f2a65a" }} title="Amber Warning" />
                  <i style={{ background: "#38bdf8" }} title="Cyan Network" />
                  <i style={{ background: "#10b981" }} title="Emerald Online" />
                  <i style={{ background: "#0e1626" }} title="Deep Navy" />
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
                label="Hasil Riset"
                lead="Validasi &"
                accent="efisiensi sistem."
              />
            </Reveal>
            <Reveal>
              <div className="results-placeholder">
                <div className="empty-stats">
                  <div>
                    <strong>&lt; 1.2s</strong>
                    <span>Latensi pengiriman sinyal darurat dari sensor ke broker</span>
                  </div>
                  <div>
                    <strong>70%</strong>
                    <span>Penghematan konsumsi bandwidth jaringan ATM</span>
                  </div>
                  <div>
                    <strong>100%</strong>
                    <span>Skenario ancaman fisik terpetakan dalam arsitektur</span>
                  </div>
                </div>
                <p>
                  Riset ini memetakan model arsitektur sistem pengawasan IoT yang
                  layak secara teknis dan ekonomis untuk diterapkan pada armada mesin
                  ATM perbankan modern.
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
                lead="Integrasi hardware"
                accent="dan dunia nyata."
              />
              <p>
                Menyusun arsitektur sistem IoT mengajarkan saya bagaimana mengawinkan
                keterbatasan fisik (koneksi seluler yang tidak stabil, keterbatasan
                daya perangkat tepi) dengan standar keamanan industri perbankan yang
                menuntut keandalan tanpa toleransi kesalahan.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="case-cta">
          <div className="container">
            <Reveal>
              <h2>
                Tertarik mendiskusikan <em>arsitektur IoT?</em>
              </h2>
              <div>
                <a
                  className="button primary"
                  href="mailto:azaurofi@gmail.com"
                >
                  Hubungi saya <span aria-hidden="true">→</span>
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
                href="/proyek/schoolguard"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("/proyek/schoolguard")
                }}
              >
                <span>Proyek berikutnya</span>
                <strong>SchoolGuard</strong>
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
