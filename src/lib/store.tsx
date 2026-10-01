import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
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

interface PitchState {
  raw: string
  diagnosis: Diagnosis | null
  map: ArgumentSection[]
  challenges: ChallengeQuestion[]
  pitch: PitchResult | null
  submit: (raw: string) => void
  reset: () => void
}

const Ctx = createContext<PitchState | null>(null)

export function PitchProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState('')
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null)

  const map = useMemo(() => (diagnosis ? buildArgumentMap(diagnosis) : []), [diagnosis])
  const challenges = useMemo(
    () => (diagnosis ? generateChallenges(diagnosis, map) : []),
    [diagnosis, map],
  )
  const pitch = useMemo(() => (diagnosis ? generatePitch(diagnosis, map) : null), [diagnosis, map])

  const submit = (text: string) => {
    setRaw(text)
    setDiagnosis(diagnose(text))
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

export function usePitch() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('usePitch must be used within PitchProvider')
  return ctx
}
