import { DashboardShell } from "@/components/dashboard-shell";
import { requireSessionUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/data";

import { logoutAction } from "./actions";

const weeklyFocus = [
  "Semak RPH minggu depan sebelum Jumaat, 20 Mac 2026.",
  "Lengkapkan import murid baharu bagi Tahun 1 dan Tahun 4.",
  "Aktifkan ringkasan pentaksiran untuk ketua panitia.",
];

export default async function DashboardPage() {
  const user = await requireSessionUser();

  const { metrics, latestRph } = await getDashboardData();

  return (
    <DashboardShell
      activePath="/dashboard"
      title="Dashboard operasi sekolah"
      subtitle="Paparan ringkas untuk memantau penggunaan sistem, kemajuan modul dan tindakan yang perlu diambil oleh setiap peranan."
      user={user}
      actions={
        <>
          <a
            href="/dashboard/rph"
            className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-strong)]"
          >
            Buka modul RPH
          </a>
          <form action={logoutAction}>
            <button className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-black/4">
              Keluar
            </button>
          </form>
        </>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-[24px] border border-black/6 bg-[var(--panel-alt)] p-5"
          >
            <p className="text-sm text-[var(--ink-muted)]">{metric.label}</p>
            <p className="mt-4 text-4xl font-semibold tracking-tight">
              {metric.value}
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
              {metric.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[28px] border border-black/6 bg-[linear-gradient(135deg,#103d35,#1d6f61)] p-6 text-white">
          <p className="text-sm uppercase tracking-[0.26em] text-white/70">
            Status peranan
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight">
            {user.role === "admin"
              ? "Anda sedang melihat paparan penuh pentadbir."
              : user.role === "reviewer"
                ? "Anda sedang melihat paparan penyemak."
                : "Anda sedang melihat paparan guru."}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/78">
            Akses modul dan tindakan pantas akan berubah mengikut peranan.
            Struktur ini sudah sedia untuk kita sambung kepada pengguna sebenar
            dan kawalan akses berasaskan pangkalan data.
          </p>
        </article>

        <article className="rounded-[28px] border border-black/6 bg-[var(--panel-alt)] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">
            Fokus minggu ini
          </p>
          <div className="mt-5 space-y-3">
            {weeklyFocus.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-black/6 bg-white p-4 text-sm leading-6 text-[var(--ink-muted)]"
              >
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-6 rounded-[28px] border border-black/6 bg-[var(--panel-alt)] p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">
          RPH terkini dari database
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {latestRph.map((entry) => (
            <article
              key={entry.id}
              className="rounded-2xl border border-black/6 bg-white p-4"
            >
              <p className="text-lg font-medium text-[var(--ink)]">{entry.subject}</p>
              <p className="mt-1 text-sm text-[var(--ink-muted)]">
                {entry.week} | {entry.schoolClass.name}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
                {entry.objective}
              </p>
              <p className="mt-4 text-sm text-[var(--ink)]">
                {entry.teacher.name} | {entry.status}
              </p>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
