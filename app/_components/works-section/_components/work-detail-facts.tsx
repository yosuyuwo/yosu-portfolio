import type { WorkFacts } from "../_lib/work-item"

const CONTEXT_LABELS: Record<WorkFacts["context"], string> = {
  freelance: "Freelance",
  agency: "Agency",
  competition: "Competition",
  personal: "Personal",
}

function Fact({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-border/60 pt-3">
      <dt className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-foreground/90">
        {children}
      </dd>
    </div>
  )
}

export function WorkDetailFacts({ facts }: { facts: WorkFacts }) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
      <Fact label="Client">{facts.client}</Fact>
      <Fact label="Engagement">{CONTEXT_LABELS[facts.context]}</Fact>
      <Fact label="Team">{facts.teamSize}</Fact>
      <Fact label="Duration">{facts.duration}</Fact>
      <div className="col-span-2 border-t border-border/60 pt-3 md:col-span-4">
        <dt className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
          My scope
        </dt>
        <dd className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1.5 text-sm text-foreground/90">
          {facts.myScope.map((item, i) => (
            <span key={item} className="inline-flex items-center gap-2">
              {i > 0 ? (
                <span aria-hidden className="text-muted-foreground/50">
                  ·
                </span>
              ) : null}
              {item}
            </span>
          ))}
        </dd>
      </div>
    </dl>
  )
}
