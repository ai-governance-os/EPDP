import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard-shell";
import { getSessionUser } from "@/lib/auth";

import { logoutAction } from "../actions";

const submissions = [
  {
    subject: "Bahasa Melayu Tahun 5",
    week: "Minggu 12",
    status: "Draf",
    updatedAt: "15 Mac 2026, 09:10",
  },
  {
    subject: "Matematik Tahun 4",
    week: "Minggu 12",
    status: "Dihantar",
    updatedAt: "14 Mac 2026, 16:40",
  },
  {
    subject: "Sains Tahun 6",
    week: "Minggu 12",
    status: "Disemak",
    updatedAt: "13 Mac 2026, 11:20",
  },
];

export default async function RphPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell
      activePath="/dashboard/rph"
      title="Modul RPH"
      subtitle="Ruang ini menempatkan ringkasan penghantaran RPH. Langkah seterusnya ialah borang penciptaan, semakan dan cetakan PDF."
      user={user}
      actions={
        <>
          <button className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-strong)]">
            Cipta RPH
          </button>
          <form action={logoutAction}>
            <button className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-black/4">
              Keluar
            </button>
          </form>
        </>
      }
    >
      <div className="space-y-4">
        {submissions.map((item) => (
          <article
            key={`${item.subject}-${item.week}`}
            className="rounded-[24px] border border-black/6 bg-[var(--panel-alt)] p-5"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-lg font-medium text-[var(--ink)]">{item.subject}</p>
                <p className="mt-1 text-sm text-[var(--ink-muted)]">{item.week}</p>
              </div>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--ink)]">
                {item.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--ink-muted)]">
              Kemas kini terakhir: {item.updatedAt}
            </p>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
