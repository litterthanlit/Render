"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandMark, Button } from "@/components/render-ui";
import { cn } from "@/lib/cn";

const links = [
  { href: "/tracks", label: "Curriculum" },
  { href: "/capstone", label: "Projects" },
  { href: "/career-prep", label: "Career" },
  { href: "/playground", label: "Playground" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--background)]/95">
      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <BrandMark />
          <span className="text-xl font-semibold">Render</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]",
                  active && "font-medium text-[color:var(--foreground)]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link className="text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]" href="/tracks">
            Log in
          </Link>
          <Button href="/tracks">Start learning</Button>
        </div>

        <button
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-[color:var(--line)] bg-white text-[color:var(--foreground)] md:hidden"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[color:var(--line)] bg-[color:var(--background)] px-4 py-3 md:hidden">
          <div className="grid gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Button className="mt-3 w-full" href="/tracks">
            Start learning
          </Button>
        </div>
      ) : null}
    </header>
  );
}
