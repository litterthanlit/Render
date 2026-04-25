"use client";

import Link from "next/link";
import { Menu, Settings2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/#path", label: "Curriculum" },
  { href: "/tracks", label: "Tracks" },
  { href: "/playground", label: "Playground" },
  { href: "/#about", label: "About" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--background)]/82 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 grid-cols-3 gap-1" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, index) => (
              <span
                key={index}
                className={`h-1.5 w-1.5 rounded-full ${
                  index % 4 === 0
                    ? "bg-[color:var(--accent-red)]"
                    : index % 3 === 0
                      ? "bg-[color:var(--accent)]"
                      : "bg-[color:var(--accent-blue)]"
                }`}
              />
            ))}
          </span>
          <span className="text-xl font-medium tracking-[-0.035em] text-[color:var(--foreground)]">
            Render
          </span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <nav className="flex items-center gap-8">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-normal transition ${
                    active
                      ? "text-[color:var(--foreground)]"
                      : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link className="button-primary inline-flex" href="/tracks">
            Start learning
          </Link>
          <button
            aria-label="Settings preview"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white text-[color:var(--foreground)] shadow-[0_1px_0_rgba(17,17,17,0.04)]"
            type="button"
          >
            <Settings2 className="h-4 w-4" />
          </button>
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
          <Link
            className="button-primary mt-3 flex items-center justify-center"
            href="/tracks"
            onClick={() => setOpen(false)}
          >
            Start learning
          </Link>
        </div>
      ) : null}
    </header>
  );
}
