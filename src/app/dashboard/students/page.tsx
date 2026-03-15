import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard-shell";
import { getSessionUser } from "@/lib/auth";

import { logoutAction } from "../actions";

const classSummary = [
  { className: "1 Bestari", pupils: 34, imported: "100%", notes: "Sedia semak" },
  { className: "4 Cemerlang", pupils: 36, imported: "92%", notes: "3 murid perlu dikemas kini" },
  { className: "6 Wawasan", pupils: 32, imported: "100%", notes: "Lengkap" },
];

export default async function StudentsPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

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
            key={item.className}
            className="rounded-[24px] border border-black/6 bg-[var(--panel-alt)] p-5"
          >
            <p className="text-sm text-[var(--ink-muted)]">{item.className}</p>
            <p className="mt-4 text-4xl font-semibold tracking-tight">
              {item.pupils}
            </p>
            <p className="mt-2 text-sm text-[var(--ink)]">murid berdaftar</p>
            <p className="mt-4 text-sm leading-6 text-[var(--ink-muted)]">
              Data diimport: {item.imported}
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
