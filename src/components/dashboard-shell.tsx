import Link from "next/link";
import type { ReactNode } from "react";

import type { SessionUser } from "@/lib/auth";

const navigation = [
  { href: "/dashboard", label: "Ringkasan", description: "Dashboard utama" },
  {
    href: "/dashboard/teachers",
    label: "Guru",
    description: "Staf, peranan dan beban tugas",
  },
  {
    href: "/dashboard/students",
    label: "Murid",
    description: "Pendaftaran dan import data",
  },
  {
    href: "/dashboard/rph",
    label: "RPH",
    description: "Rancangan pengajaran mingguan",
  },
  {
    href: "/dashboard/dskp",
    label: "DSKP",
    description: "Pilih standard ikut buku teks",
  },
];

type DashboardShellProps = {
  activePath: string;
  title: string;
  subtitle: string;
  user: SessionUser;
  actions: ReactNode;
  children: ReactNode;
};

export function DashboardShell({
  activePath,
  title,
  subtitle,
  user,
  actions,
  children,
}: DashboardShellProps) {
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
                School Operations Suite
              </h1>
              <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--ink-muted)]">
                Sistem asas untuk guru, pentadbir dan penyemak dengan modul
                operasi sekolah yang tersusun.
              </p>
            </div>

            <nav className="mt-10 space-y-3 text-sm">
              {navigation.map((item) => {
                const active = activePath === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-2xl border px-4 py-3 transition ${
                      active
                        ? "border-white/20 bg-white/12 text-white"
                        : "border-white/8 bg-white/4 text-[var(--ink-soft)] hover:bg-white/8"
                    }`}
                  >
                    <p className="font-medium">{item.label}</p>
                    <p className="mt-1 text-xs text-inherit/80">
                      {item.description}
                    </p>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto rounded-[28px] border border-white/12 bg-white/6 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--ink-soft)]">
                Sesi aktif
              </p>
              <p className="mt-3 text-lg font-medium text-white">{user.name}</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{user.email}</p>
              <p className="mt-1 text-sm capitalize text-[var(--ink-soft)]">
                Peranan: {user.role}
              </p>
              <p className="mt-4 text-sm text-[var(--ink-muted)]">{user.school}</p>
            </div>
          </div>
        </aside>

        <section className="px-5 py-5 sm:px-8 lg:px-10 lg:py-8">
          <div className="rounded-[30px] border border-black/6 bg-[var(--panel)] p-6 shadow-[0_24px_80px_rgba(11,20,18,0.08)]">
            <header className="flex flex-col gap-5 border-b border-black/6 pb-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
                  {user.school}
                </p>
                <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight">
                  {title}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--ink-muted)]">
                  {subtitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">{actions}</div>
            </header>

            <div className="mt-6">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
