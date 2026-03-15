import type { ReactNode } from "react";

import { getSessionUser } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await getSessionUser();
  return <>{children}</>;
}
