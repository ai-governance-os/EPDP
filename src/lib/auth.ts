import { cookies } from "next/headers";

export type UserRole = "admin" | "teacher" | "reviewer";

export type SessionUser = {
  name: string;
  email: string;
  role: UserRole;
  school: string;
};

const SESSION_COOKIE = "epdp_session";

const roleDirectory: Record<UserRole, Omit<SessionUser, "email">> = {
  admin: {
    name: "Puan Aisyah",
    role: "admin",
    school: "SK Taman Harmoni",
  },
  teacher: {
    name: "Cikgu Farid",
    role: "teacher",
    school: "SK Taman Harmoni",
  },
  reviewer: {
    name: "PK Noraini",
    role: "reviewer",
    school: "SK Taman Harmoni",
  },
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export async function createSession(role: UserRole, email: string) {
  const store = await cookies();
  const profile = roleDirectory[role];

  const user: SessionUser = {
    ...profile,
    email,
  };

  store.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
