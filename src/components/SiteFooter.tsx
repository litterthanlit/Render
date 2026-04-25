export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] px-5 py-8 text-sm text-[color:var(--muted)] md:px-8">
      <div className="mx-auto flex max-w-[1480px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>
          Render v1 is device-local by design. Progress is stored in your browser for now.
        </p>
        <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--foreground)]">
          Design • Code • Ship
        </p>
      </div>
    </footer>
  );
}
