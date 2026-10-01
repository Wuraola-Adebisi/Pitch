import { Navigate, useNavigate } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'
import { usePitch } from '../lib/store'

export default function Challenge() {
  const { challenges, reset } = usePitch()
  const navigate = useNavigate()
  if (challenges.length === 0) return <Navigate to="/app" replace />

  const critical = challenges.filter((c) => c.severity === 'critical')
  const moderate = challenges.filter((c) => c.severity === 'moderate')

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="uppercase tracking-[0.2em] text-xs text-ember font-medium mb-3">
        Challenge
      </p>
      <h1 className="font-display text-3xl sm:text-4xl mb-2">
        Before anyone else attacks this, we did.
      </h1>
      <p className="text-ink/50 mb-10">
        {critical.length} critical, {moderate.length} worth tightening.
      </p>

      {critical.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display text-lg text-ember mb-4">Critical</h2>
          <div className="space-y-4">
            {critical.map((c, i) => (
              <blockquote
                key={i}
                className="border-l-2 border-ember pl-5 py-1 font-display text-xl leading-snug"
              >
                "{c.question}"
              </blockquote>
            ))}
          </div>
        </div>
      )}

      {moderate.length > 0 && (
        <div>
          <h2 className="font-display text-lg text-ink/60 mb-4">Worth tightening</h2>
          <div className="space-y-4">
            {moderate.map((c, i) => (
              <blockquote
                key={i}
                className="border-l-2 border-line pl-5 py-1 text-ink/80 leading-snug"
              >
                "{c.question}"
              </blockquote>
            ))}
          </div>
        </div>
      )}

      <div className="mt-14 flex justify-between items-center">
        <button
          onClick={() => {
            reset()
            navigate('/app')
          }}
          className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-ink transition-colors"
        >
          <RotateCcw size={14} />
          Start a new pitch
        </button>
      </div>
    </div>
  )
}
