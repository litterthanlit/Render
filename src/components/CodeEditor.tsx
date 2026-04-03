"use client";

type CodeEditorProps = {
  label: string;
  language: string;
  value: string;
  onChange: (value: string) => void;
};

export function CodeEditor({ label, language, value, onChange }: CodeEditorProps) {
  const lineNumbers = Array.from({ length: Math.max(value.split("\n").length, 1) }, (_, index) =>
    String(index + 1)
  ).join("\n");

  return (
    <label className="flex min-h-[220px] flex-col overflow-hidden rounded-[24px] border border-white/8 bg-[rgba(6,9,10,0.95)]">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <span className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
          {label}
        </span>
        <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent)]">
          {language}
        </span>
      </div>
      <div className="grid flex-1 grid-cols-[auto_1fr]">
        <pre className="m-0 border-r border-white/8 bg-black/20 px-3 py-4 text-right font-mono text-xs leading-6 text-[color:var(--muted)]">
          {lineNumbers}
        </pre>
        <textarea
          aria-label={label}
          className="min-h-[220px] resize-none bg-transparent px-4 py-4 font-mono text-sm leading-6 text-[color:var(--paper)] outline-none"
          spellCheck={false}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Tab") {
              return;
            }

            event.preventDefault();
            const target = event.currentTarget;
            const start = target.selectionStart;
            const end = target.selectionEnd;
            const nextValue = `${value.slice(0, start)}  ${value.slice(end)}`;
            onChange(nextValue);

            requestAnimationFrame(() => {
              target.selectionStart = start + 2;
              target.selectionEnd = start + 2;
            });
          }}
        />
      </div>
    </label>
  );
}
