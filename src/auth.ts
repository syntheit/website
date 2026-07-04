/**
 * Auth.js v5 (next-auth@beta) configuration.
 *
 * GitHub OAuth restricted to usernames in $ADMIN_GITHUB_USERS (comma-separated).
 * Anyone else who completes OAuth is rejected at signIn — no session is created.
 *
 * Required env:
 *   AUTH_SECRET           — `openssl rand -base64 33`
 *   AUTH_GITHUB_ID        — OAuth app client id
 *   AUTH_GITHUB_SECRET    — OAuth app client secret
 *   ADMIN_GITHUB_USERS    — comma-separated GitHub username allowlist
 */

import NextAuth, { type DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & { login?: string };
  }
}

const ALLOWED = new Set(
  (process.env.ADMIN_GITHUB_USERS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    signIn({ profile }) {
      const login = profile?.login;
      return typeof login === "string" && ALLOWED.has(login.toLowerCase());
    },
    jwt({ token, profile }) {
      if (profile && typeof profile.login === "string") token.login = profile.login;
      return token;
    },
    session({ session, token }) {
      if (session.user && typeof token.login === "string") {
        session.user.login = token.login;
      }
      return session;
    },
  },
});
