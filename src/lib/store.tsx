import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Ctx, type PitchState } from './pitch-context'
import {
  diagnose,
  buildArgumentMap,
  generateChallenges,
  generatePitch,
  type Diagnosis,
  type ArgumentSection,
  type ChallengeQuestion,
  type PitchResult,
} from './engine'

const STORAGE_KEY = 'pitch-current-v1'

interface SavedState { raw: string }


function readSaved(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return ''
    const parsed = JSON.parse(saved) as SavedState
    return typeof parsed.raw === 'string' ? parsed.raw : ''
  } catch {
    return ''
  }
}

export function PitchProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState(readSaved)
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(() => {
    const saved = readSaved()
    return saved ? diagnose(saved) : null
  })

  const map = useMemo(() => (diagnosis ? buildArgumentMap(diagnosis) : []), [diagnosis])
  const challenges = useMemo(() => (diagnosis ? generateChallenges(diagnosis, map) : []), [diagnosis, map])
  const pitch = useMemo(() => (diagnosis ? generatePitch(diagnosis, map) : null), [diagnosis, map])

  useEffect(() => {
    try {
      if (raw) localStorage.setItem(STORAGE_KEY, JSON.stringify({ raw }))
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Persistence is a convenience, not a product dependency.
    }
  }, [raw])

  const submit = (text: string) => {
    const clean = text.trim()
    setRaw(clean)
    setDiagnosis(clean ? diagnose(clean) : null)
  }

  const reset = () => {
    setRaw('')
    setDiagnosis(null)
  }

  return (
    <Ctx.Provider value={{ raw, diagnosis, map, challenges, pitch, submit, reset }}>
      {children}
    </Ctx.Provider>
  )
}
