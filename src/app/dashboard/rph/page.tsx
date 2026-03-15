import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard-shell";
import { getSessionUser } from "@/lib/auth";
import { getDskpTopicSelection, getRphEntries } from "@/lib/data";

import { logoutAction } from "../actions";

type RphPageProps = {
  searchParams: Promise<{
    topic?: string;
  }>;
};

export default async function RphPage({ searchParams }: RphPageProps) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  const submissions = await getRphEntries();
  const params = await searchParams;
  const selectedTopic = params.topic
    ? await getDskpTopicSelection(params.topic)
    : null;

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
      {selectedTopic ? (
        <section className="mb-6 rounded-[28px] border border-[var(--accent)]/20 bg-[var(--panel-alt)] p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">
                DSKP dipilih
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)]">
                {selectedTopic.textbook.subject.name} | {selectedTopic.unitCode} | {selectedTopic.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
                {selectedTopic.textbook.title} | Fokus: {selectedTopic.focus}
              </p>
            </div>
            <a
              href="/dashboard/dskp"
              className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-black/4"
            >
              Tukar pilihan
            </a>
          </div>

          <div className="mt-5 grid gap-3">
            {selectedTopic.mappings.map((mapping) => (
              <div
                key={mapping.id}
                className="rounded-2xl border border-black/6 bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[var(--panel-alt)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                    {mapping.standard.standardType}
                  </span>
                  <span className="text-sm font-medium text-[var(--ink)]">
                    {mapping.standard.code}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--ink)]">
                  {mapping.standard.description}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
                  {mapping.rationale}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="mb-6 rounded-[28px] border border-dashed border-black/10 bg-[var(--panel-alt)] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">
            Cadangan DSKP
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
            Pilih unit daripada modul DSKP untuk bawa terus standard yang
            dipadankan ke halaman RPH.
          </p>
          <a
            href="/dashboard/dskp"
            className="mt-4 inline-flex rounded-full border border-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
          >
            Pilih dari modul DSKP
          </a>
        </section>
      )}

      <div className="space-y-4">
        {submissions.map((item) => (
          <article
            key={item.id}
            className="rounded-[24px] border border-black/6 bg-[var(--panel-alt)] p-5"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-lg font-medium text-[var(--ink)]">{item.subject}</p>
                <p className="mt-1 text-sm text-[var(--ink-muted)]">
                  {item.week} | {item.schoolClass.name}
                </p>
              </div>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--ink)]">
                {item.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--ink-muted)]">
              {item.title}
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--ink-muted)]">
              Guru: {item.teacher.name}
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--ink-muted)]">
              Kemas kini terakhir: {item.updatedLabel}
            </p>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
