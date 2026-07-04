import type { Metadata } from "next";
import { auth } from "@/auth";
import Link from "next/link";
import { SignOutButton } from "@/components/admin/SignOutButton";

export const metadata: Metadata = {
  title: "Admin — matv.io",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const login = session?.user?.login ?? "";

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EBD9]">
      <header className="border-b border-[rgba(59,35,20,0.1)] bg-[#E0CBA8] px-6 py-3 flex items-center gap-6">
        <Link
          href="/admin"
          className="font-serif text-[16px] font-extrabold text-[#3B2314] hover:text-[#D4581A] transition-colors"
        >
          Admin
        </Link>
        <nav className="flex gap-4 text-[13px] font-medium text-[#7A5C42]">
          <Link href="/admin" className="hover:text-[#D4581A] transition-colors">
            Places
          </Link>
          <Link href="/admin/lists" className="hover:text-[#D4581A] transition-colors">
            Lists
          </Link>
          <Link href="/admin/photography" className="hover:text-[#D4581A] transition-colors">
            Photography
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          {login && (
            <span className="text-[12px] text-[#7A5C42] font-mono">{login}</span>
          )}
          <SignOutButton className="text-[12px] text-[#7A5C42] hover:text-[#D4581A] cursor-pointer transition-colors" />
          {/* Inline `<form action={...} "use server">` removed: the server-action useId
              shifted under React 19 between SSR and hydration, breaking downstream
              Radix Popover IDs in the Pickers. */}
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
