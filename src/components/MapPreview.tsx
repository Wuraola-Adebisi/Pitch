const stages = [
  { label: 'Problem', state: 'strong' as const },
  { label: 'Audience', state: 'strong' as const },
  { label: 'Insight', state: 'weak' as const },
  { label: 'Solution', state: 'strong' as const },
  { label: 'Why now', state: 'weak' as const },
  { label: 'Proof', state: 'partial' as const },
  { label: 'Ask', state: 'strong' as const },
]

const dot: Record<string, string> = {
  strong: 'bg-ink',
  partial: 'bg-coral',
  weak: 'bg-coral/35',
}

export default function MapPreview() {
  return (
    <div className="relative overflow-hidden bg-card p-5 text-ink sm:p-8">
      <div className="absolute left-0 top-0 h-full w-1 bg-coral" />
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-coral">The argument</p>
          <p className="mt-2 text-sm text-muted">A chain, not a checklist.</p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[.12em] text-muted">7 claims</span>
      </div>

      <div className="relative pl-2 sm:pl-5">
        <div className="absolute bottom-5 left-[11px] top-5 w-px bg-line sm:left-[23px]" />
        <div className="space-y-2">
          {stages.map((stage, index) => (
            <div key={stage.label} className="relative grid grid-cols-[20px_1fr] items-center gap-4 sm:grid-cols-[20px_1fr_110px] sm:gap-5">
              <span className={'relative z-10 h-2.5 w-2.5 rounded-full border-2 border-card ' + dot[stage.state]} />
              <div className={'flex min-h-12 items-center justify-between gap-4 border px-4 py-3 ' + (
                stage.state === 'strong' ? 'border-ink bg-card' :
                stage.state === 'partial' ? 'border-coral bg-[#fff4ef]' :
                'border-dashed border-ink/25 bg-paper'
              )}>
                <span className="text-sm font-semibold">{stage.label}</span>
                <span className="text-[10px] uppercase tracking-[.12em] text-muted">
                  {stage.state === 'strong' ? 'established' : stage.state === 'partial' ? 'partial' : 'missing'}
                </span>
              </div>
              {index < stages.length - 1 && <span className="hidden text-right text-[10px] uppercase tracking-[.12em] text-muted sm:block">leads to →</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
        <div className="bg-paper p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-coral">Weak link</p>
          <p className="mt-2 text-sm leading-6">The insight is not stated, so the solution has no clear reason to exist.</p>
        </div>
        <div className="bg-paper p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-muted">Useful evidence</p>
          <p className="mt-2 text-sm leading-6">What changed that makes this problem worth solving now?</p>
        </div>
      </div>
    </div>
  )
}
