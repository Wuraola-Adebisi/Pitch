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
  strong: 'bg-moss',
  partial: 'bg-ember',
  weak: 'bg-ink/20',
}

const border: Record<string, string> = {
  strong: 'border-moss/40 bg-moss/5',
  partial: 'border-ember/30 bg-ember/5',
  weak: 'border-dashed border-ink/25',
}

export default function MapPreview() {
  return (
    <div className="rounded-2xl border border-line bg-white/50 p-6 sm:p-8 shadow-[0_8px_30px_-12px_rgba(23,20,16,0.15)]">
      <div className="grid sm:grid-cols-[220px_1fr] gap-6 sm:gap-10">
        <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible">
          {stages.map((s) => (
            <div
              key={s.label}
              className={
                'shrink-0 rounded-lg border px-3 py-2 text-sm flex items-center gap-2 ' +
                border[s.state]
              }
            >
              <span className={'h-1.5 w-1.5 rounded-full ' + dot[s.state]} />
              {s.label}
            </div>
          ))}
        </div>
        <div className="border-t sm:border-t-0 sm:border-l border-line pt-6 sm:pt-0 sm:pl-10">
          <p className="uppercase tracking-[0.15em] text-xs text-ink/40 mb-2">
            Insight
          </p>
          <h3 className="font-display text-xl mb-4">What's missing</h3>
          <p className="text-ink/70 mb-6">
            Not stated: the non-obvious reason this problem has stayed
            unsolved until now. Without it, the solution feels arbitrary
            instead of inevitable.
          </p>
          <p className="uppercase tracking-[0.15em] text-xs text-ink/40 mb-2">
            Evidence that would help
          </p>
          <p className="text-ink/70">
            One sentence on what everyone else gets wrong about this problem.
          </p>
        </div>
      </div>
    </div>
  )
}
