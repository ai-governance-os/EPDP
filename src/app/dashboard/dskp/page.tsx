import Link from "next/link";

import { DashboardShell } from "@/components/dashboard-shell";
import { requireSessionUser } from "@/lib/auth";
import { getDskpSubjects } from "@/lib/data";

import { logoutAction } from "../actions";

type DskpPageProps = {
  searchParams: Promise<{
    subject?: string;
    textbook?: string;
  }>;
};

export default async function DskpPage({ searchParams }: DskpPageProps) {
  const user = await requireSessionUser();

  const subjects = await getDskpSubjects();
  const params = await searchParams;

  const activeSubject =
    subjects.find((subject) => subject.id === params.subject) ?? subjects[0] ?? null;

  const activeTextbook =
    activeSubject?.textbooks.find((book) => book.id === params.textbook) ??
    activeSubject?.textbooks[0] ??
    null;

  return (
    <DashboardShell
      activePath="/dashboard/dskp"
      title="DSKP ikut buku teks"
      subtitle="Guru boleh pilih subjek, tahun dan unit buku teks untuk melihat standard kandungan dan standard pembelajaran yang sudah dipadankan."
      user={user}
      actions={
        <>
          {activeTextbook?.topics[0] ? (
            <Link
              href={`/dashboard/rph?topic=${activeTextbook.topics[0].id}`}
              className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-strong)]"
            >
              Guna dalam RPH
            </Link>
          ) : (
            <button className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-strong)]">
              Guna dalam RPH
            </button>
          )}
          <form action={logoutAction}>
            <button className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-black/4">
              Keluar
            </button>
          </form>
        </>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[28px] border border-black/6 bg-[var(--panel-alt)] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">
            Subjek tersedia
          </p>
          <div className="mt-5 space-y-3">
            {subjects.map((subject) => {
              const isActive = subject.id === activeSubject?.id;

              return (
                <Link
                  key={subject.id}
                  href={`/dashboard/dskp?subject=${subject.id}`}
                  className={`block rounded-2xl border p-4 transition ${
                    isActive
                      ? "border-[var(--accent)]/30 bg-white"
                      : "border-black/6 bg-white/70 hover:bg-white"
                  }`}
                >
                  <p className="text-lg font-medium text-[var(--ink)]">{subject.name}</p>
                  <p className="mt-1 text-sm text-[var(--ink-muted)]">
                    {subject.stream} | {subject.yearLevels} | {subject.syllabus}
                  </p>
                  <p className="mt-2 text-sm text-[var(--ink-muted)]">
                    Bahasa: {subject.language}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-black/10 bg-white/60 p-4 text-sm leading-6 text-[var(--ink-muted)]">
            Data yang dimasukkan sekarang ialah set permulaan untuk SJKC.
            Struktur sudah sedia untuk diperluas ke lebih banyak subjek, tahun
            dan unit buku teks.
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-[28px] border border-black/6 bg-[var(--panel-alt)] p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">
                  Buku teks
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)]">
                  {activeSubject?.name ?? "Belum ada subjek"}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {activeSubject?.textbooks.map((book) => {
                  const isActive = book.id === activeTextbook?.id;

                  return (
                    <Link
                      key={book.id}
                      href={`/dashboard/dskp?subject=${activeSubject.id}&textbook=${book.id}`}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        isActive
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                          : "border-black/10 bg-white text-[var(--ink)] hover:bg-black/4"
                      }`}
                    >
                      Tahun {book.yearLevel} | {book.volumeLabel}
                    </Link>
                  );
                })}
              </div>
            </div>

            {activeTextbook ? (
              <div className="mt-5 rounded-2xl border border-black/6 bg-white p-4">
                <p className="text-lg font-medium text-[var(--ink)]">{activeTextbook.title}</p>
                <p className="mt-2 text-sm text-[var(--ink-muted)]">
                  {activeTextbook.publisher}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
                  {activeTextbook.notes}
                </p>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-black/6 bg-white p-4 text-sm text-[var(--ink-muted)]">
                Belum ada buku teks untuk subjek ini.
              </div>
            )}
          </article>

          <article className="rounded-[28px] border border-black/6 bg-[var(--panel-alt)] p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">
              Unit dan DSKP
            </p>
            <div className="mt-5 space-y-4">
              {activeTextbook?.topics.map((topic) => (
                <div key={topic.id} className="rounded-2xl border border-black/6 bg-white p-5">
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-lg font-medium text-[var(--ink)]">
                        {topic.unitCode} | {topic.title}
                      </p>
                      <p className="mt-1 text-sm text-[var(--ink-muted)]">
                        Fokus: {topic.focus}
                      </p>
                    </div>
                    <span className="rounded-full bg-[var(--panel-alt)] px-3 py-1 text-xs font-medium text-[var(--ink)]">
                      {topic.mappings.length} standard
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {topic.mappings.map((mapping) => (
                      <div
                        key={mapping.id}
                        className="rounded-2xl border border-black/6 bg-[var(--panel-alt)] p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--accent)]">
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
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                          Catatan: {mapping.standard.notes}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Link
                      href={`/dashboard/rph?topic=${topic.id}`}
                      className="inline-flex rounded-full border border-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
                    >
                      Pilih unit ini untuk RPH
                    </Link>
                  </div>
                </div>
              )) ?? (
                <div className="rounded-2xl border border-black/6 bg-white p-4 text-sm text-[var(--ink-muted)]">
                  Tiada unit dipadankan lagi untuk buku teks ini.
                </div>
              )}
            </div>
          </article>
        </div>
      </section>
    </DashboardShell>
  );
}
