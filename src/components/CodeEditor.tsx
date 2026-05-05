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
    <label className="flex min-h-[260px] flex-col overflow-hidden rounded-[28px] border border-[color:var(--line)] bg-white shadow-[0_12px_34px_rgba(17,17,17,0.035)]">
      <div className="flex items-center justify-between border-b border-[color:var(--line)] px-5 py-4">
        <span className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
          {label}
        </span>
        <span className="rounded-full border border-[color:var(--line)] px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
          {language}
        </span>
      </div>
      <div className="grid flex-1 grid-cols-[auto_1fr]">
        <pre className="m-0 border-r border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-4 py-5 text-right font-mono text-xs leading-7 text-[color:var(--muted)]">
          {lineNumbers}
        </pre>
        <textarea
          aria-label={label}
          className="min-h-[260px] resize-none bg-transparent px-5 py-5 font-mono text-sm leading-7 text-[color:var(--foreground)] outline-none"
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
