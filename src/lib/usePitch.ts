import { useContext } from 'react'
import { Ctx } from './pitch-context'

export function usePitch() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('usePitch must be used within PitchProvider')
  return ctx
}
