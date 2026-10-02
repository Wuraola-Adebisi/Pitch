import { useEffect } from 'react'
import { Copy, RotateCcw, X } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  onCopy?: () => void
  hasDraft?: boolean
}

export default function ConfirmResetDialog({ open, onClose, onConfirm, onCopy, hasDraft }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-smoky/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="reset-title">
      <button type="button" aria-label="Close dialog" onClick={onClose} className="absolute inset-0 h-full w-full cursor-default rounded-none" />
      <div className="relative w-full max-w-md rounded-2xl border border-line bg-card p-6 shadow-2xl">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-2 text-muted hover:bg-line hover:text-ink"><X size={16} /></button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/10 text-coral"><RotateCcw size={17} /></div>
        <h2 id="reset-title" className="mt-5 font-display text-2xl font-semibold">Start a new idea?</h2>
        <p className="mt-2 text-sm leading-6 text-ink/60">Your current idea and its analysis will be cleared. If you want to keep the draft, copy it before starting over.</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          {hasDraft && onCopy && <button type="button" onClick={onCopy} className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-muted hover:border-coral hover:text-ink"><Copy size={14} />Copy draft</button>}
          <button type="button" onClick={onClose} className="rounded-full px-4 py-2.5 text-sm font-medium text-muted hover:text-ink">Keep it</button>
          <button type="button" onClick={onConfirm} className="rounded-full bg-coral px-4 py-2.5 text-sm font-semibold text-ink hover:bg-coral-dark">Start over</button>
        </div>
      </div>
    </div>
  )
}