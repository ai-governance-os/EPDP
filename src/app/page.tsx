const quickStats = [
  {
    label: "Aktif Hari Ini",
    value: "184",
    detail: "Guru aktif dan menggunakan modul harian",
  },
  {
    label: "Pelan Pengajaran",
    value: "62",
    detail: "RPH sedia semak untuk minggu ini",
  },
  {
    label: "Semakan Pentadbir",
    value: "18",
    detail: "Item menunggu pengesahan pihak pentadbiran",
  },
  {
    label: "Latihan Dijana AI",
    value: "93",
    detail: "Set latihan baharu sepanjang bulan ini",
  },
];

const modules = [
  "Dashboard sekolah",
  "Pengurusan guru dan murid",
  "RPH, RPT dan pemantauan mingguan",
  "Pentaksiran PBD, SP, SK dan TPK",
  "Semakan latihan dan pencerapan",
  "Laporan, cetakan PDF dan eksport",
];

const notices = [
  {
    date: "15 Mac 2026",
    title: "Modul semakan latihan murid",
    summary: "Guru boleh menghantar borang semakan latihan terus dari sistem.",
    tone: "highlight",
  },
  {
    date: "10 Mac 2026",
    title: "Analisis TPK kelas oleh AI",
    summary: "Cadangan penambahbaikan automatik untuk setiap kelas dan subjek.",
    tone: "default",
  },
  {
    date: "5 Mac 2026",
    title: "PSO 2026-2030",
    summary: "Jana draf PSO sekolah dengan templat yang boleh diubah suai.",
    tone: "default",
  },
];

const workflows = [
  {
    name: "RPH Mingguan",
    owner: "Guru mata pelajaran",
    status: "Sedang berjalan",
    progress: 76,
  },
  {
    name: "Semakan Pentadbir",
    owner: "PK / Guru Besar",
    status: "Perlu tindakan",
    progress: 42,
  },
  {
    name: "Analisis PBD",
    owner: "Ketua panitia",
    status: "Siap",
    progress: 100,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--canvas)] text-[var(--ink)]">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="relative overflow-hidden border-r border-white/10 bg-[var(--panel-strong)] px-6 py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_40%)]" />
          <div className="relative flex h-full flex-col">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--ink-soft)]">
                EPDP
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                Education Planning Dashboard Platform
              </h1>
              <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--ink-muted)]">
                Versi asas untuk bina sistem pengurusan sekolah moden dengan
                aliran kerja guru, pentadbir dan modul AI.
              </p>
            </div>

            <nav className="mt-10 space-y-3 text-sm">
              {[
                "Ringkasan",
                "Guru & Murid",
                "RPH / RPT",
                "Pentaksiran",
                "Semakan",
                "Laporan",
              ].map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`block rounded-2xl border px-4 py-3 transition ${
                    index === 0
                      ? "border-white/20 bg-white/12 text-white"
                      : "border-white/8 bg-white/4 text-[var(--ink-soft)] hover:bg-white/8"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="mt-auto rounded-[28px] border border-white/12 bg-white/6 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--ink-soft)]">
                Fokus Fasa 1
              </p>
              <p className="mt-3 text-lg font-medium">Modul minimum yang kita akan siapkan dahulu</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--ink-muted)]">
                <li>Log masuk dan peranan pengguna</li>
                <li>Dashboard pentadbir</li>
                <li>Pengurusan data guru dan murid</li>
                <li>RPH mingguan dengan status semakan</li>
              </ul>
            </div>
          </div>
        </aside>

        <section className="px-5 py-5 sm:px-8 lg:px-10 lg:py-8">
          <div className="rounded-[30px] border border-black/6 bg-[var(--panel)] p-6 shadow-[0_24px_80px_rgba(11,20,18,0.08)]">
            <header className="flex flex-col gap-6 border-b border-black/6 pb-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
                  Prototype sekolah
                </p>
                <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--ink)]">
                  Panel kawalan untuk guru, pentadbir dan operasi sekolah dalam satu sistem.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-strong)]">
                  Bina modul seterusnya
                </button>
                <button className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-black/4">
                  Tetapan sekolah
                </button>
              </div>
            </header>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {quickStats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[24px] border border-black/6 bg-[var(--panel-alt)] p-5"
                >
                  <p className="text-sm text-[var(--ink-muted)]">{stat.label}</p>
                  <p className="mt-4 text-4xl font-semibold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
                    {stat.detail}
                  </p>
                </article>
              ))}
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <article className="rounded-[28px] border border-black/6 bg-[linear-gradient(135deg,#103d35,#1d6f61)] p-6 text-white">
                <p className="text-sm uppercase tracking-[0.26em] text-white/70">
                  Visi produk
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                  Sistem digital untuk mengurangkan kerja manual dan jadikan semakan lebih jelas.
                </h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {modules.map((module) => (
                    <div
                      key={module}
                      className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/88"
                    >
                      {module}
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[28px] border border-black/6 bg-[var(--panel-alt)] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.26em] text-[var(--accent)]">
                      Status hari ini
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                      Aliran kerja utama
                    </h3>
                  </div>
                  <span className="rounded-full bg-[var(--ok)]/12 px-3 py-1 text-xs font-medium text-[var(--ok)]">
                    3 aktif
                  </span>
                </div>

                <div className="mt-6 space-y-5">
                  {workflows.map((flow) => (
                    <div key={flow.name} className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium">{flow.name}</p>
                          <p className="text-sm text-[var(--ink-muted)]">
                            {flow.owner}
                          </p>
                        </div>
                        <span className="rounded-full bg-black/6 px-3 py-1 text-xs font-medium text-[var(--ink)]">
                          {flow.status}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-black/8">
                        <div
                          className="h-2 rounded-full bg-[var(--accent)]"
                          style={{ width: `${flow.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <article className="rounded-[28px] border border-black/6 bg-[var(--panel-alt)] p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">
                  Pengumuman
                </p>
                <div className="mt-5 space-y-4">
                  {notices.map((notice) => (
                    <div
                      key={notice.title}
                      className={`rounded-2xl border p-4 ${
                        notice.tone === "highlight"
                          ? "border-[var(--accent)]/25 bg-[var(--accent)]/8"
                          : "border-black/6 bg-white"
                      }`}
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                        {notice.date}
                      </p>
                      <h4 className="mt-2 text-lg font-medium">{notice.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
                        {notice.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[28px] border border-black/6 bg-[var(--panel-alt)] p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">
                  Roadmap pembangunan
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      phase: "Fasa 1",
                      title: "Asas operasi sekolah",
                      items: "Auth, dashboard, data guru, data murid, RPH asas",
                    },
                    {
                      phase: "Fasa 2",
                      title: "Proses semakan dan cetakan",
                      items: "Status semakan, tandatangan, PDF, laporan ringkas",
                    },
                    {
                      phase: "Fasa 3",
                      title: "Analitik dan AI",
                      items: "Jana latihan, analisis TPK, ringkasan prestasi kelas",
                    },
                  ].map((phase) => (
                    <div
                      key={phase.phase}
                      className="rounded-2xl border border-black/6 bg-white p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                        {phase.phase}
                      </p>
                      <h4 className="mt-2 text-lg font-medium">{phase.title}</h4>
                      <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
                        {phase.items}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
