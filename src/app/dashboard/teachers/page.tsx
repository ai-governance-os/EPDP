import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard-shell";
import { getSessionUser } from "@/lib/auth";

import { logoutAction } from "../actions";

const teachers = [
  { name: "Cikgu Farid", role: "Guru Bahasa Melayu", status: "Aktif", workload: "26 waktu" },
  { name: "Cikgu Liyana", role: "Guru Matematik", status: "Aktif", workload: "24 waktu" },
  { name: "PK Noraini", role: "Penyemak RPH", status: "Semakan", workload: "12 waktu" },
];

export default async function TeachersPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell
      activePath="/dashboard/teachers"
      title="Pengurusan guru"
      subtitle="Halaman awal untuk melihat staf, peranan semasa dan pembahagian beban tugas sebelum kita sambung dengan CRUD sebenar."
      user={user}
      actions={
        <>
          <button className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-strong)]">
            Tambah guru
          </button>
          <form action={logoutAction}>
            <button className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-black/4">
              Keluar
            </button>
          </form>
        </>
      }
    >
      <div className="rounded-[28px] border border-black/6 bg-[var(--panel-alt)] p-4">
        <div className="grid grid-cols-[1.3fr_1.3fr_0.8fr_0.8fr] gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-[var(--ink)]">
          <div>Nama</div>
          <div>Peranan</div>
          <div>Status</div>
          <div>Beban tugas</div>
        </div>
        <div className="mt-3 space-y-3">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              className="grid grid-cols-[1.3fr_1.3fr_0.8fr_0.8fr] gap-3 rounded-2xl border border-black/6 bg-white px-4 py-4 text-sm text-[var(--ink-muted)]"
            >
              <div className="font-medium text-[var(--ink)]">{teacher.name}</div>
              <div>{teacher.role}</div>
              <div>{teacher.status}</div>
              <div>{teacher.workload}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
