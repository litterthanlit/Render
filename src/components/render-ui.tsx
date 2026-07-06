import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Box,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  FileCode2,
  Flag,
  Layers3,
  Monitor,
  Play,
  RefreshCcw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TerminalSquare
} from "lucide-react";

import { cn } from "@/lib/cn";

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const classes = cn(
    "inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-blue)]",
    variant === "primary" &&
      "border border-[color:var(--foreground)] bg-[color:var(--foreground)] text-white shadow-[0_8px_18px_rgba(17,17,17,0.12)] hover:-translate-y-px",
    variant === "secondary" &&
      "border border-[color:var(--line)] bg-white text-[color:var(--foreground)] hover:border-[color:var(--line-strong)] hover:bg-[color:var(--surface-subtle)]",
    variant === "ghost" &&
      "border border-transparent bg-transparent text-[color:var(--muted)] hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--foreground)]",
    disabled && "pointer-events-none opacity-50",
    className
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export function Card({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-[color:var(--line)] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.045)]", className)}>
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className
}: {
  children: React.ReactNode;
  tone?: "neutral" | "blue" | "purple" | "success" | "warning" | "danger";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium",
        tone === "neutral" && "border-[color:var(--line)] bg-[color:var(--surface-subtle)] text-[color:var(--muted)]",
        tone === "blue" && "border-blue-200 bg-blue-50 text-blue-700",
        tone === "purple" && "border-purple-200 bg-purple-50 text-purple-700",
        tone === "success" && "border-green-200 bg-green-50 text-green-700",
        tone === "warning" && "border-amber-200 bg-amber-50 text-amber-700",
        tone === "danger" && "border-red-200 bg-red-50 text-red-700",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-1.5 overflow-hidden rounded-full bg-[color:var(--surface-subtle)]", className)}>
      <div className="h-full rounded-full bg-[color:var(--accent-blue)]" style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
    </div>
  );
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex size-6 items-center justify-center", className)} aria-hidden="true">
      <span className="absolute left-0 top-1 size-3 -skew-x-12 rounded-[3px] bg-[color:var(--foreground)]" />
      <span className="absolute right-0 top-0 size-3 -skew-x-12 rounded-[3px] border border-[color:var(--foreground)] bg-white" />
      <span className="absolute bottom-0 left-2.5 size-3 -skew-x-12 rounded-[3px] bg-[color:var(--foreground)]" />
    </span>
  );
}

export function ProductMockup({ compact = false }: { compact?: boolean }) {
  return (
    <Card className={cn("overflow-hidden rounded-lg", compact ? "shadow-none" : "shadow-[0_22px_60px_rgba(17,17,17,0.08)]")}>
      <div className="border-b border-[color:var(--line)] bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <FileCode2 className="size-4 shrink-0 text-[color:var(--muted)]" />
            <span className="truncate text-sm font-medium">DashboardCard.tsx</span>
          </div>
          <Badge tone="success">
            <Check className="size-3" />
            Valid
          </Badge>
        </div>
      </div>
      <div className="grid min-h-[360px] lg:grid-cols-[1.02fr_0.98fr]">
        <CodeEditorPanel />
        <PreviewPanel />
      </div>
      <ValidationPanel />
    </Card>
  );
}

export function CodeEditorPanel() {
  const code = [
    "type CardProps = {",
    "  title: string;",
    "  value: string;",
    "  change: string;",
    "};",
    "",
    "export function DashboardCard(props: CardProps) {",
    "  return (",
    "    <article className=\"metric-card\">",
    "      <p>{props.title}</p>",
    "      <strong>{props.value}</strong>",
    "      <span>{props.change}</span>",
    "    </article>",
    "  );",
    "}"
  ];

  return (
    <div className="min-w-0 overflow-hidden border-b border-[color:var(--line)] bg-[#111316] text-white lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-white/48">TSX</span>
      </div>
      <pre className="overflow-hidden whitespace-pre-wrap break-words p-4 font-mono text-[12px] leading-6 text-white/72">
        {code.map((line, index) => (
          <span key={`${line}-${index}`} className="block">
            <span className="mr-4 inline-block w-5 text-right text-white/26">{index + 1}</span>
            {line}
          </span>
        ))}
      </pre>
    </div>
  );
}

export function PreviewPanel() {
  return (
    <div className="min-w-0 overflow-hidden bg-white">
      <div className="flex items-center justify-between border-b border-[color:var(--line)] px-4 py-3">
        <span className="text-sm font-medium">Live preview</span>
        <span className="text-xs text-[color:var(--muted)]">1024px</span>
      </div>
      <div className="flex min-h-[300px] items-center justify-center p-5">
        <div className="min-w-0 w-full max-w-sm rounded-lg border border-[color:var(--line)] bg-white p-5 shadow-[0_18px_45px_rgba(17,17,17,0.07)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-[color:var(--muted)]">Design system coverage</p>
              <p className="mt-3 text-3xl font-semibold tabular-nums">84%</p>
            </div>
            <Badge tone="blue">Live</Badge>
          </div>
          <div className="mt-6 grid grid-cols-5 items-end gap-2">
            {[36, 50, 44, 68, 82].map((height, index) => (
              <span
                key={height}
                className={cn("rounded-sm bg-[color:var(--surface-subtle)]", index === 4 && "bg-[color:var(--accent-blue)]")}
                style={{ height }}
              />
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-[color:var(--line)] pt-4 text-sm">
            <span className="text-[color:var(--muted)]">Components</span>
            <span className="shrink-0 font-medium tabular-nums">28 shipped</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ValidationPanel() {
  return (
    <div className="border-t border-[color:var(--line)] bg-white p-4">
      <div className="flex flex-col gap-3 rounded-lg border border-green-200 bg-green-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-[color:var(--success)] text-white">
            <Check className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium">All checks passed</p>
            <p className="mt-0.5 text-xs text-[color:var(--muted)]">Layout, tokens, and accessible labels match the requirements.</p>
          </div>
        </div>
        <ChevronRight className="hidden size-4 text-[color:var(--muted)] sm:block" />
      </div>
    </div>
  );
}

export const stats = [
  { icon: Layers3, value: "14", label: "phases" },
  { icon: Code2, value: "100+", label: "hands-on labs" },
  { icon: Box, value: "20+", label: "real projects" },
  { icon: Flag, value: "1", label: "capstone" }
];

export function StatRow() {
  return (
    <div className="grid rounded-lg border border-[color:var(--line)] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.035)] sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ icon: Icon, value, label }, index) => (
        <div
          key={label}
          className={cn(
            "flex items-center gap-4 border-b border-[color:var(--line)] p-5 lg:border-b-0",
            index === stats.length - 1 && "border-b-0",
            index % 2 === 1 && "sm:border-l",
            index > 0 && "lg:border-l"
          )}
        >
          <Icon className="size-5 text-[color:var(--muted)]" />
          <div>
            <p className="text-2xl font-semibold tabular-nums">{value}</p>
            <p className="text-xs text-[color:var(--muted)]">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function RoadmapTimeline({ items }: { items: { order: number; title: string; slug: string; type: string }[] }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="grid min-w-[980px] gap-3" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/tracks/${item.slug}`}
            className="group relative rounded-lg border border-[color:var(--line)] bg-white p-3 transition hover:border-[color:var(--line-strong)] hover:shadow-[0_10px_28px_rgba(17,17,17,0.05)]"
          >
            <span className={cn("mb-3 block size-2 rounded-full", item.order < 4 ? "bg-[color:var(--success)]" : item.order === 4 ? "bg-[color:var(--accent-blue)]" : "bg-[color:var(--line-strong)]")} />
            <p className="text-xs text-[color:var(--muted)]">Phase {item.order}</p>
            <p className="mt-1 line-clamp-2 min-h-10 text-sm font-medium leading-5 text-[color:var(--foreground)]">{item.title}</p>
            <p className="mt-3 text-xs capitalize text-[color:var(--muted-soft)]">{item.type}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex size-9 items-center justify-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-subtle)] text-[color:var(--foreground)]">
      {children}
    </span>
  );
}

export function FeatureCard({ title, copy, icon }: { title: string; copy: string; icon: React.ReactNode }) {
  return (
    <Card className="rounded-lg p-5">
      <FeatureIcon>{icon}</FeatureIcon>
      <h3 className="mt-6 text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-pretty text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
    </Card>
  );
}

export function EmptyProductPanel() {
  return (
    <Card className="rounded-lg p-5">
      <div className="flex items-start gap-3">
        <FeatureIcon>
          <Target className="size-4" />
        </FeatureIcon>
        <div>
          <h3 className="text-base font-semibold">Continue where you left off</h3>
          <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">Open the next lab, ship the current phase, and keep the project evidence moving.</p>
        </div>
      </div>
    </Card>
  );
}

export function WorkbenchShell({
  children,
  toolbar
}: {
  children: React.ReactNode;
  toolbar: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden rounded-lg">
      <div className="flex flex-col gap-3 border-b border-[color:var(--line)] bg-white px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <TerminalSquare className="size-4 text-[color:var(--muted)]" />
          Lab workbench
        </div>
        <div className="flex flex-wrap gap-2">{toolbar}</div>
      </div>
      {children}
    </Card>
  );
}

export function CapstoneMilestones() {
  const items = [
    "Product brief",
    "State model",
    "Component system",
    "Build sprint",
    "Deploy & release",
    "Case study"
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <Card key={item} className="rounded-lg p-4">
          <div className="flex items-center justify-between gap-3">
            <Badge tone={index < 2 ? "success" : index === 2 ? "blue" : "neutral"}>Milestone {index + 1}</Badge>
            {index < 2 ? <CheckCircle2 className="size-4 text-[color:var(--success)]" /> : <Clock3 className="size-4 text-[color:var(--muted)]" />}
          </div>
          <h3 className="mt-4 text-base font-semibold">{item}</h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">Submit evidence, decisions, and review notes before moving on.</p>
        </Card>
      ))}
    </div>
  );
}

export function CareerChecklist() {
  const items = [
    "Portfolio checklist",
    "Case study builder",
    "Repo readiness",
    "Positioning prep",
    "Interview stories",
    "Hireability audit"
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <Card key={item} className="rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className={cn("flex size-7 items-center justify-center rounded-md border", index < 2 ? "border-green-200 bg-green-50 text-green-700" : "border-[color:var(--line)] bg-[color:var(--surface-subtle)] text-[color:var(--muted)]")}>
              {index < 2 ? <Check className="size-4" /> : index + 1}
            </span>
            <h3 className="text-sm font-semibold">{item}</h3>
          </div>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">Prepare evidence without promising outcomes you cannot control.</p>
        </Card>
      ))}
    </div>
  );
}

export const landingFeatures = [
  {
    title: "Learn by building",
    copy: "Each concept turns into a concrete interface, component, or workflow.",
    icon: <BookOpen className="size-4" />
  },
  {
    title: "Real-world projects",
    copy: "Practice the product surfaces designers actually hand off, review, and ship.",
    icon: <Monitor className="size-4" />
  },
  {
    title: "Ship with confidence",
    copy: "Use code, validation, deployment, and documentation as one product habit.",
    icon: <Rocket className="size-4" />
  },
  {
    title: "Career ready",
    copy: "Package the work honestly with case studies, repos, and interview stories.",
    icon: <ShieldCheck className="size-4" />
  }
];

export function AccentRule() {
  return <div className="h-px w-full bg-[color:var(--line)]" />;
}

export function SectionHeading({ title, copy }: { title: string; copy?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-balance text-2xl font-semibold md:text-3xl">{title}</h2>
      {copy ? <p className="mt-3 text-pretty text-sm leading-6 text-[color:var(--muted)] md:text-base md:leading-7">{copy}</p> : null}
    </div>
  );
}

export function SmallMetric({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="rounded-lg p-4">
      <div className="flex items-center gap-3">
        <FeatureIcon>{icon}</FeatureIcon>
        <div>
          <p className="text-xl font-semibold tabular-nums">{value}</p>
          <p className="text-xs text-[color:var(--muted)]">{label}</p>
        </div>
      </div>
    </Card>
  );
}

export function SeriousPanel({ title, copy, children }: { title: string; copy: string; children: React.ReactNode }) {
  return (
    <Card className="rounded-lg p-5">
      <div className="flex items-start gap-3">
        <FeatureIcon>
          <Sparkles className="size-4" />
        </FeatureIcon>
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </Card>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm font-medium text-[color:var(--muted)]", className)}>
      {children}
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  copy
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h1 className={cn("text-balance text-3xl font-semibold md:text-4xl", eyebrow && "mt-2")}>
        {title}
      </h1>
      {copy ? (
        <p className="mt-4 text-pretty text-base leading-7 text-[color:var(--muted)]">{copy}</p>
      ) : null}
    </div>
  );
}

const fieldClassName =
  "w-full rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-3.5 py-2.5 text-sm outline-none transition placeholder:text-[color:var(--muted-soft)] focus:border-[color:var(--line-strong)] focus:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-blue)]";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClassName, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldClassName, "min-h-28 leading-6", className)} {...props} />;
}

export function FormField({
  label,
  children,
  error
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[color:var(--foreground)]">
      {label}
      {children}
      {error ? <span className="text-xs font-normal text-[color:var(--danger)]">{error}</span> : null}
    </label>
  );
}

export function Breadcrumb({
  items
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--muted)]">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
          {index > 0 ? <ChevronRight className="size-4 shrink-0" /> : null}
          {item.href ? (
            <Link className="transition hover:text-[color:var(--foreground)]" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span className="text-[color:var(--foreground)]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
