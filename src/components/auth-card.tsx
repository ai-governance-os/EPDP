import type { ReactNode } from "react";

type AuthCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthCard({
  eyebrow,
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <div className="rounded-[32px] border border-black/6 bg-[var(--panel)] p-6 shadow-[0_24px_80px_rgba(11,20,18,0.08)] sm:p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--ink)]">
        {title}
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--ink-muted)]">
        {description}
      </p>
      <div className="mt-8">{children}</div>
    </div>
  );
}
