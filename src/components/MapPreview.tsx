const stages = [
  { label: 'Problem', state: 'strong' as const },
  { label: 'Why it matters', state: 'strong' as const },
  { label: 'Insight', state: 'weak' as const },
  { label: 'Solution', state: 'strong' as const },
  { label: 'Why now', state: 'weak' as const },
  { label: 'Proof', state: 'partial' as const },
  { label: 'Ask', state: 'strong' as const },
]

const dot: Record<string, string> = {
  strong: 'bg-mint',
  partial: 'bg-coral',
  weak: 'bg-white/25',
}

const border: Record<string, string> = {
  strong: 'border-mint/35 bg-mint/5',
  partial: 'border-coral/35 bg-coral/5',
  weak: 'border-dashed border-white/20',
}

export default function MapPreview() {
  return (
    <div className="border border-white/15 bg-white/[.03] p-5 text-white sm:p-7">
      <div className="grid gap-7 sm:grid-cols-[220px_1fr] sm:gap-10">
        <div className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible">
          {stages.map((s) => (
            <div key={s.label} className={'flex shrink-0 items-center gap-2 border px-3 py-2 text-sm ' + border[s.state]}>
              <span className={'h-1.5 w-1.5 ' + dot[s.state]} />
              {s.label}
            </div>
          ))}
        </div>
        <div className="border-t border-white/15 pt-6 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
          <p className="mb-2 text-xs uppercase tracking-[.15em] text-mint">Insight</p>
          <h3 className="mb-4 text-xl font-semibold">What's missing</h3>
          <p className="mb-6 leading-7 text-white/65">
            Not stated: the non-obvious reason this problem has stayed unsolved until now. Without it, the solution feels arbitrary instead of inevitable.
          </p>
          <p className="mb-2 text-xs uppercase tracking-[.15em] text-white/40">Evidence that would help</p>
          <p className="text-white/65">One sentence on what everyone else gets wrong about this problem.</p>
        </div>
      </div>
    </div>
  )
}
