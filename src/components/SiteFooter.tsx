export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] px-4 py-8 text-sm text-[color:var(--muted)] md:px-6">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>
          Render v1 is device-local by design. Progress is stored in your browser for now.
        </p>
        <p className="text-sm font-medium text-[color:var(--foreground)]">
          Design • Code • Ship
        </p>
      </div>
    </footer>
  );
}
