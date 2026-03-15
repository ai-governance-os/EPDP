"use server";

import { redirect } from "next/navigation";

import { createSession, type UserRole } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const role = String(formData.get("role") || "teacher") as UserRole;

  if (!email) {
    redirect("/login?error=missing-email");
  }

  await createSession(role, email);
  redirect("/dashboard");
}
