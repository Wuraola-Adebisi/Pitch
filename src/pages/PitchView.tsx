import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, Swords } from 'lucide-react'
import { usePitch } from '../lib/store'

export default function PitchView() {
  const { pitch } = usePitch()
  const navigate = useNavigate()
  if (!pitch) return <Navigate to="/app" replace />

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="uppercase tracking-[0.2em] text-xs text-ember font-medium mb-3">
        The Pitch
      </p>
      <h1 className="font-display text-3xl sm:text-4xl mb-10 leading-tight">
        {pitch.title}
      </h1>

      <div className="space-y-10">
        {pitch.sections.map((s, i) => (
          <div key={s.heading} className="border-l-2 border-line pl-6">
            <p className="text-xs text-ink/40 mb-1">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h2 className="font-display text-xl mb-2">{s.heading}</h2>
            <p className="text-ink/80 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 flex justify-end">
        <button
          onClick={() => navigate('/app/challenge')}
          className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-ember transition-colors"
        >
          <Swords size={16} />
          Challenge my pitch
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
