"use client";

import { signOut } from "next-auth/react";

interface Props {
  className?: string;
}

/**
 * Client-side sign-out trigger. Avoids the inline server action that would
 * otherwise live in the admin layout — server actions consume a `useId` slot
 * whose position differs between SSR and hydration under React 19, shifting
 * every downstream `useId` and breaking hydration for Radix Popover triggers
 * (and anything else relying on stable ids) further down the tree.
 */
export function SignOutButton({ className }: Props) {
  return (
    <button
      type="button"
      onClick={() => void signOut({ callbackUrl: "/" })}
      className={className}
    >
      Sign out
    </button>
  );
}
