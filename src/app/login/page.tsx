import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthCard } from "@/components/auth-card";
import { getSessionUser } from "@/lib/auth";

import { loginAction } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; redirected?: string }>;
};

const roleOptions = [
  {
    value: "teacher",
    label: "Guru",
    hint: "Masuk untuk menulis RPH, jana latihan dan kemas kini kelas.",
  },
  {
    value: "reviewer",
    label: "Penyemak",
    hint: "Semak penghantaran guru dan lihat status pematuhan mingguan.",
  },
  {
    value: "admin",
    label: "Pentadbir",
    hint: "Urus pengguna, tetapan sekolah dan laporan keseluruhan.",
  },
];

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getSessionUser();

  if (user) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const showError = params.error === "missing-email";
  const showRedirectNotice = params.redirected === "1";

  return (
    <main className="min-h-screen bg-[var(--canvas)] px-5 py-8 text-[var(--ink)] sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-6 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[32px] bg-[linear-gradient(145deg,#153f36,#20584d)] p-8 text-white shadow-[0_24px_80px_rgba(11,20,18,0.18)] sm:p-10">
          <p className="text-sm uppercase tracking-[0.32em] text-white/70">
            EPDP
          </p>
          <h2 className="mt-4 max-w-2xl text-5xl font-semibold tracking-tight">
            Bina sistem sekolah yang kemas, cepat dan jelas untuk semua peranan.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/76">
            Fasa ini sudah mempunyai aliran log masuk, peranan pengguna, modul
            dashboard dan halaman asas untuk guru, murid serta RPH.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["RPH Mingguan", "Simpan draf, hantar dan semak status."],
              ["Pengurusan Murid", "Lihat enrolmen, import dan status kelas."],
              ["Analitik Sekolah", "Jejak penggunaan, semakan dan tindakan."],
            ].map(([title, detail]) => (
              <div
                key={title}
                className="rounded-[24px] border border-white/10 bg-white/8 p-4"
              >
                <p className="text-lg font-medium">{title}</p>
                <p className="mt-2 text-sm leading-6 text-white/74">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] border border-white/10 bg-black/10 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/65">
              Demo log masuk
            </p>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Masukkan sebarang e-mel yang sah dan pilih peranan untuk masuk ke
              sistem demo. Ini memudahkan kita bina aliran sebenar dahulu
              sebelum sambung ke pangkalan data.
            </p>
          </div>
        </section>

        <section className="flex items-center">
          <AuthCard
            eyebrow="Log masuk"
            title="Masuk ke portal EPDP"
            description="Gunakan borang ini untuk masuk sebagai guru, penyemak atau pentadbir. Nanti kita akan tukar kepada sambungan pengguna sebenar."
          >
            {showRedirectNotice ? (
              <div className="mb-5 rounded-2xl border border-[var(--accent)]/20 bg-[var(--panel-alt)] px-4 py-3 text-sm leading-6 text-[var(--ink)]">
                Sila log masuk dahulu untuk membuka halaman dashboard.
              </div>
            ) : null}

            <form action={loginAction} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--ink)]" htmlFor="email">
                  E-mel
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contoh@delima.edu.my"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10"
                  required
                />
                {showError ? (
                  <p className="text-sm text-[var(--danger)]">
                    E-mel diperlukan sebelum log masuk.
                  </p>
                ) : null}
              </div>

              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-[var(--ink)]">
                  Pilih peranan
                </legend>
                <div className="space-y-3">
                  {roleOptions.map((role, index) => (
                    <label
                      key={role.value}
                      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/8 bg-white p-4 transition hover:border-[var(--accent)]/40 hover:bg-[var(--panel-alt)]"
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        defaultChecked={index === 0}
                        className="mt-1 accent-[var(--accent)]"
                      />
                      <span>
                        <span className="block text-sm font-medium text-[var(--ink)]">
                          {role.label}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-[var(--ink-muted)]">
                          {role.hint}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button className="w-full rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-strong)]">
                Masuk ke dashboard
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-[var(--ink-muted)]">
              <Link href="/" className="underline underline-offset-4">
                Halaman utama
              </Link>
              <span>Versi demo tanpa database lagi</span>
            </div>
          </AuthCard>
        </section>
      </div>
    </main>
  );
}
