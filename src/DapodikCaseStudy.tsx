import { useEffect, useRef, useState } from "react"

const miniNav = [
  ["latar-belakang", "Latar belakang"],
  ["masalah", "Masalah"],
  ["solusi", "Alur & Solusi"],
  ["desain", "Prinsip Data"],
  ["hasil", "Hasil & Dampak"],
]

const needs = [
  [
    "01",
    "Fragmentasi Berkas & Format",
    "Data siswa dan tenaga pendidik tersebar di dokumen fisik, formulir kertas, dan file spreadsheet dengan format yang sering kali tidak seragam.",
  ],
  [
    "02",
    "Batas Waktu Cut-off Ketat",
    "Sinkronisasi nasional Dapodik memiliki jadwal cut-off yang mutlak, di mana keterlambatan berakibat langsung pada penghentian hak bantuan dan tunjangan.",
  ],
  [
    "03",
    "Verifikasi Silang Dukcapil & GTK",
    "Setiap identitas siswa (NIK, NISN, nama ibu kandung) harus 100% padan dengan catatan sipil nasional tanpa toleransi selisih satu huruf pun.",
  ],
  [
    "04",
    "Mitigasi Data Invalid",
    "Mendeteksi dan menyelesaikan kendala data invalid (beban jam mengajar ganda, relasi rombel tidak valid) sebelum proses sinkronisasi server pusat.",
  ],
]

const features = [
  {
    title: "Standardized Data Intake Pipeline",
    text: "Menyusun sistem formulir digital terstandardisasi untuk Penerimaan Peserta Didik Baru (PPDB) yang langsung memvalidasi kelengkapan NIK dan berkas identitas keluarga.",
  },
  {
    title: "Pre-Sync Audit & Verification Checklist",
    text: "Alur verifikasi berkala untuk memeriksa keselarasan rombongan belajar (rombel), jadwal pembelajaran, keaktifan siswa, dan data linieritas sertifikasi guru.",
  },
  {
    title: "Automated Backup & Disaster Recovery",
    text: "Prosedur pencadangan database lokal Dapodik terjadwal dan terenkripsi untuk mengantisipasi potensi kerusakan perangkat keras sebelum batas sinkronisasi.",
  },
]

const designDecisions = [
  [
    "01",
    "Single Source of Truth",
    "Menetapkan database induk sekolah sebagai satu-satunya rujukan resmi guna meniadakan duplikasi dan inkonsistensi data antar divisi.",
  ],
  [
    "02",
    "Prinsip Zero-Invalid",
    "Menerapkan audit mandiri berkala sebelum tanggal cut-off kementerian agar tidak ada data siswa atau guru yang berstatus invalid.",
  ],
  [
    "03",
    "Perlindungan Data Pribadi",
    "Mengklasifikasikan data sensitif kependudukan (NIK, gaji orang tua, nomor KK) dengan akses terbatas untuk menjaga kerahasiaan siswa.",
  ],
  [
    "04",
    "Kolaborasi Lintas Divisi",
    "Membangun alur komunikasi terstruktur dengan guru mata pelajaran, wali kelas, dan bagian tata usaha untuk penyelesaian kendala berkas.",
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

export default function DapodikCaseStudy() {
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
              <span className="eyebrow">Studi kasus operasional · 2025 – sekarang</span>
              <h1>
                Sistem Data Sekolah, <em>akurasi di jantung operasional.</em>
              </h1>
              <p>
                Pengelolaan, validasi, dan sinkronisasi ekosistem Data Pokok
                Pendidikan (Dapodik) dan administrasi digital di SMAS Plus Cendekia
                Cikeas untuk menjamin kelancaran hak siswa dan pendidik.
              </p>
              <div className="case-meta">
                <div>
                  <span>Peran</span>
                  <strong>Operator Sekolah & IT Operations</strong>
                </div>
                <div>
                  <span>Periode</span>
                  <strong>2025 – sekarang</strong>
                </div>
                <div>
                  <span>Platform</span>
                  <strong>Dapodik Kemendikbud & Database Sekolah</strong>
                </div>
                <div>
                  <span>Tech stack</span>
                  <div className="card-tech" style={{ marginTop: 6 }}>
                    <span>Dapodik</span>
                    <span>Data Management</span>
                    <span>SQL</span>
                    <span>Excel Advanced</span>
                    <span>Troubleshooting</span>
                  </div>
                </div>
              </div>
              <div className="hero-actions">
                <button
                  className="button primary"
                  onClick={() => scrollTo("solusi")}
                >
                  Lihat alur kerja <span aria-hidden="true">↓</span>
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
                <span>Sistem Administrasi Data Sekolah — SMAS Plus Cendekia Cikeas</span>
              </div>
              <div className="browser-image" style={{ background: "#0d0c15", padding: "40px 30px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
                  {[
                    { label: "Status Validasi Dapodik", val: "100% VALID", sub: "0 Data Invalid Terdeteksi", color: "#10b981" },
                    { label: "Total Peserta Didik", val: "Aktif & Terdaftar", sub: "Padan Dukcapil 100%", color: "#f2a65a" },
                    { label: "Sinkronisasi Terakhir", val: "BERHASIL", sub: "Tersambung ke Server Pusat", color: "#38bdf8" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#14121d",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 8,
                        padding: 16,
                      }}
                    >
                      <div style={{ fontSize: 10, color: "#98939f", textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: stat.color, margin: "6px 0 2px" }}>{stat.val}</div>
                      <div style={{ fontSize: 11, color: "#98939f" }}>{stat.sub}</div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    background: "#14121d",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    padding: "16px 20px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: "#edeaf2", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 10 }}>
                    <span>Entitas Data</span>
                    <span>Jumlah Record</span>
                    <span>Integritas Validasi</span>
                    <span>Status</span>
                  </div>
                  {[
                    { name: "Peserta Didik (Siswa Baru & Pindahan)", count: "Ratusan Siswa", val: "Verval PD Padan", ok: true },
                    { name: "Pendidik & Tenaga Kependidikan (PTK)", count: "Guru & Staf", val: "Linieritas Beban Ajar OK", ok: true },
                    { name: "Rombongan Belajar & Kurikulum Merdeka", count: "Semua Tingkat", val: "Struktur Kurikulum Valid", ok: true },
                    { name: "Sarana Prasarana & Ruang Belajar", count: "Seluruh Aset", val: "Kondisi & Luas Terverifikasi", ok: true },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 11,
                        color: "#c2bdc7",
                        padding: "10px 0",
                        borderBottom: idx === 3 ? "none" : "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <span style={{ fontWeight: 500, color: "#edeaf2" }}>{row.name}</span>
                      <span>{row.count}</span>
                      <span style={{ color: "#38bdf8" }}>{row.val}</span>
                      <span style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>SYNC READY</span>
                    </div>
                  ))}
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
                lead="Tulang punggung"
                accent="kebijakan institusi."
              />
            </Reveal>
            <div className="story-grid">
              <Reveal className="story-copy">
                <p>
                  Di balik berjalannya kegiatan belajar mengajar di sekolah,
                  terdapat satu pilar data terpusat yang menjadi penentu segalanya:
                  Data Pokok Pendidikan (Dapodik). Sistem ini menjadi rujukan
                  kementerian dalam penyaluran dana Bantuan Operasional Sekolah
                  (BOS), tunjangan profesi guru, hingga verifikasi peserta ujian
                  nasional.
                </p>
                <p>
                  Satu ketidaksesuaian kecil—misalnya NIK siswa yang tidak padan
                  dengan database kependudukan Dukcapil, perbedaan nama pada akta
                  kelahiran, atau jam mengajar guru yang bentrok—dapat membekukan
                  hak siswa dan pendidik selama berbulan-bulan.
                </p>
                <p>
                  Sebagai Operator Sekolah di SMAS Plus Cendekia Cikeas, peran saya
                  adalah memastikan seluruh ekosistem data ini beroperasi dengan
                  akurasi mutlak, disiplin waktu, dan zero invalid data.
                </p>
              </Reveal>
              <Reveal className="pull-quote" delay={100}>
                <blockquote>
                  “Dalam manajemen data pendidikan, akurasi bukanlah sekadar angka,
                  melainkan kepastian hak siswa dan guru.”
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
                lead="Tantangan integritas"
                accent="operasional data."
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
                label="Alur & Solusi"
                lead="Standardisasi"
                accent="tanpa celah."
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
                        background: "#0d0c15",
                      }}
                    >
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f2a65a" }} />
                        <span style={{ fontSize: 11, color: "#f2a65a", letterSpacing: "0.08em", fontWeight: 700 }}>
                          TAHAPAN 0{index + 1}
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
                          <li>Verifikasi keselarasan Akta Kelahiran dan Kartu Keluarga</li>
                          <li>Penomoran NISN baru dan verval PD terpusat</li>
                          <li>Pengurangan berkas fisik yang tercecer</li>
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
                  <h3>Penyelesaian Anomali Sistem (Troubleshooting)</h3>
                  <p style={{ color: "#98939f", fontSize: 13, marginTop: 8 }}>
                    Menangani kendala error database lokal, konflik modul aplikasi,
                    serta pemulihan data ketika terjadi pembaruan patch sistem.
                  </p>
                </div>
                <div>
                  <span>05</span>
                  <h3>Dukungan Infrastruktur IT Sekolah</h3>
                  <p style={{ color: "#98939f", fontSize: 13, marginTop: 8 }}>
                    Memastikan kesiapan jaringan laboratorium komputer, server
                    asesmen nasional (ANBK), dan perangkat pendukung kelas.
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
                label="Prinsip Data"
                lead="Tata kelola"
                accent="dan disiplin data."
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
                <div className="logo-placeholder" aria-label="Simbol Data">
                  <span style={{ fontSize: 42 }}>DS</span>
                </div>
                <div className="color-strip" aria-label="Palet warna Data Sekolah">
                  <i style={{ background: "#38bdf8" }} title="Cyan Data" />
                  <i style={{ background: "#818cf8" }} title="Indigo Tech" />
                  <i style={{ background: "#10b981" }} title="Emerald Valid" />
                  <i style={{ background: "#18161d" }} title="Surface Dark" />
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
                lead="Kepastian"
                accent="operasional."
              />
            </Reveal>
            <Reveal>
              <div className="results-placeholder">
                <div className="empty-stats">
                  <div>
                    <strong>100%</strong>
                    <span>Ketepatan sinkronisasi sebelum batas waktu cut-off</span>
                  </div>
                  <div>
                    <strong>0</strong>
                    <span>Data invalid saat penutupan periode pelaporan</span>
                  </div>
                  <div>
                    <strong>40%</strong>
                    <span>Efisiensi waktu rekonsiliasi data kesiswaan semesteran</span>
                  </div>
                </div>
                <p>
                  Pengelolaan sistem data yang disiplin memastikan administrasi
                  sekolah SMAS Plus Cendekia Cikeas berjalan tanpa kendala birokrasi,
                  menjaga kelancaran pencairan dana bantuan dan verifikasi ijazah.
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
                lead="Ketelitian"
                accent="dan empati."
              />
              <p>
                Mengelola data operasional sekolah mengajarkan saya bahwa di balik
                setiap baris database terdapat manusia nyata. Ketelitian dalam
                memvalidasi data bukan sekadar tugas teknis, melainkan bentuk
                tanggung jawab kepada masa depan siswa dan kesejahteraan guru.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="case-cta">
          <div className="container">
            <Reveal>
              <h2>
                Tertarik mendiskusikan <em>manajemen data?</em>
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
                href="/proyek/riset"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("/proyek/riset")
                }}
              >
                <span>Proyek berikutnya</span>
                <strong>Riset CCTV Real-time Berbasis IoT</strong>
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
