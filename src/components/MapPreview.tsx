const stages = [
  { label: 'Problem', state: 'strong' as const, note: 'clear' },
  { label: 'Audience', state: 'strong' as const, note: 'clear' },
  { label: 'Insight', state: 'weak' as const, note: 'missing' },
  { label: 'Solution', state: 'strong' as const, note: 'clear' },
  { label: 'Why now', state: 'weak' as const, note: 'missing' },
  { label: 'Proof', state: 'partial' as const, note: 'partial' },
  { label: 'Ask', state: 'strong' as const, note: 'clear' },
]

const dot: Record<string, string> = {
  strong: 'bg-[#f5f3ee]',
  partial: 'bg-[#eb4604]',
  weak: 'bg-[#eb4604]/35',
}

export default function MapPreview() {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] bg-[#171614] p-5 text-[#f5f3ee] sm:p-8">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#eb4604]/[0.06] blur-3xl" />
      <div className="relative mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#282723] pb-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#eb4604]">Live argument map</p>
          <p className="mt-2 text-sm text-[#99a57d]">Click a node in the real workspace to inspect it.</p>
        </div>
        <span className="rounded-full bg-[#1c1b17] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.12em] text-[#99a57d]">7 links</span>
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[1fr_220px]">
        <div className="relative pl-1 sm:pl-5">
          <div className="absolute bottom-5 left-[10px] top-5 w-px bg-[#282723] sm:left-[24px]" />
          <div className="space-y-2.5">
            {stages.map((stage, index) => (
              <div key={stage.label} className="relative grid grid-cols-[20px_1fr] items-center gap-4 sm:grid-cols-[20px_1fr_90px] sm:gap-5">
                <span className={'relative z-10 h-2.5 w-2.5 rounded-full border-2 border-[#171614] ' + dot[stage.state]} />
                <div className={'flex min-h-12 items-center justify-between gap-4 rounded-xl border px-4 py-3 ' + (
                  stage.state === 'strong' ? 'border-[#282723] bg-[#1c1b17]' :
                  stage.state === 'partial' ? 'border-[#eb4604]/70 bg-[#eb4604]/[0.08]' :
                  'border-dashed border-[#282723] bg-[#100c0b]'
                )}>
                  <span className="text-sm font-semibold">{stage.label}</span>
                  <span className="text-[10px] uppercase tracking-[.12em] text-[#99a57d]">{stage.note}</span>
                </div>
                {index < stages.length - 1 && <span className="hidden text-right text-[10px] uppercase tracking-[.12em] text-[#99a57d] sm:block">next</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#282723] bg-[#1c1b17] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#eb4604]">Weak link</p>
          <p className="mt-3 text-sm leading-6">The insight is not stated, so the solution has no clear reason to exist yet.</p>
          <div className="mt-5 border-t border-[#282723] pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#99a57d]">Look for</p>
            <p className="mt-2 text-sm leading-6 text-[#99a57d]">A concrete observation, behaviour, constraint or piece of evidence.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
