export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] px-5 py-8 text-sm text-[color:var(--muted)] md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>
          Render v1 is device-local by design. Progress is stored in your browser for now.
        </p>
        <p className="uppercase tracking-[0.24em] text-[11px] text-[color:var(--foreground)]">
          HTML • CSS • JS only in v1
        </p>
      </div>
    </footer>
  );
}
