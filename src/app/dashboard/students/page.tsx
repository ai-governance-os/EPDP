import { DashboardShell } from "@/components/dashboard-shell";
import { getClassSummaries } from "@/lib/data";
import { requireSessionUser } from "@/lib/auth";

import { logoutAction } from "../actions";

export default async function StudentsPage() {
  const user = await requireSessionUser();

  const classSummary = await getClassSummaries();

  return (
    <DashboardShell
      activePath="/dashboard/students"
      title="Pengurusan murid"
      subtitle="Paparan awal untuk mengurus import data, jumlah murid mengikut kelas dan status kemas kini rekod."
      user={user}
      actions={
        <>
          <button className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-strong)]">
            Import murid
          </button>
          <form action={logoutAction}>
            <button className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-black/4">
              Keluar
            </button>
          </form>
        </>
      }
    >
      <section className="grid gap-4 md:grid-cols-3">
        {classSummary.map((item) => (
          <article
            key={item.id}
            className="rounded-[24px] border border-black/6 bg-[var(--panel-alt)] p-5"
          >
            <p className="text-sm text-[var(--ink-muted)]">{item.name}</p>
            <p className="mt-4 text-4xl font-semibold tracking-tight">
              {item.pupilCount}
            </p>
            <p className="mt-2 text-sm text-[var(--ink)]">murid berdaftar</p>
            <p className="mt-4 text-sm leading-6 text-[var(--ink-muted)]">
              Data diimport: {item.imported}%
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--ink-muted)]">
              {item.notes}
            </p>
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
