import { createContext } from 'react'
import type {
  Diagnosis,
  ArgumentSection,
  ChallengeQuestion,
  PitchResult,
} from './engine'

export interface PitchState {
  raw: string
  diagnosis: Diagnosis | null
  map: ArgumentSection[]
  challenges: ChallengeQuestion[]
  pitch: PitchResult | null
  submit: (raw: string) => void
  reset: () => void
}

export const Ctx = createContext<PitchState | null>(null)
