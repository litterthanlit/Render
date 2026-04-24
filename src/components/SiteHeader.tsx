"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ProgressDock } from "@/components/ProgressDock";

const links = [
  { href: "/tracks", label: "Tracks" },
  { href: "/playground", label: "Playground" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--background)]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white text-sm font-semibold tracking-[-0.02em] text-[color:var(--foreground)] shadow-[0_1px_0_rgba(16,24,40,0.04)]">
            R
          </span>
          <div>
            <p className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
              Render
            </p>
            <p className="text-[11px] text-[color:var(--muted)]">
              Learn design engineering through real code
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <nav className="flex items-center rounded-full border border-[color:var(--line)] bg-white p-1 shadow-[0_1px_0_rgba(16,24,40,0.04)]">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-[color:var(--foreground)] text-white"
                      : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <ProgressDock />
        </div>

        <button
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white text-[color:var(--foreground)] shadow-[0_1px_0_rgba(16,24,40,0.04)] md:hidden"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[color:var(--line)] bg-[color:var(--background)] px-5 py-4 md:hidden">
          <div className="space-y-2">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "border-[color:var(--foreground)] bg-[color:var(--foreground)] text-white"
                      : "border-[color:var(--line)] bg-white text-[color:var(--foreground)]"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-4">
            <ProgressDock />
          </div>
        </div>
      ) : null}
    </header>
  );
}
