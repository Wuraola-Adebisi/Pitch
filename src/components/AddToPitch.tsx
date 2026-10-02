import { useState } from 'react'
import { Plus } from 'lucide-react'
import { usePitch } from '../lib/usePitch'

export default function AddToPitch({ prompt }: { prompt: string }) {
  const { raw, submit } = usePitch()
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  const add = () => {
    const clean = value.trim()
    if (!clean) return
    const current = raw.trim()
    const separator = current && /[.!?]$/.test(current) ? ' ' : '. '
    submit(current ? current + separator + clean : clean)
    setValue('')
    setOpen(false)
  }

  return (
    <div className="border-t border-line pt-4">
      {!open ? (
        <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink">
          <Plus size={13} /> Add this to the idea
        </button>
      ) : (
        <div>
          <p className="text-xs font-medium text-muted">{prompt}</p>
          <textarea autoFocus value={value} onChange={(e) => setValue(e.target.value)} rows={3} maxLength={500} placeholder="Write one sentence..." className="mt-3 w-full resize-none rounded-xl border border-line bg-line/40 p-3 text-sm leading-6 text-ink placeholder:text-ink/30 focus:border-coral focus:outline-none" />
          <div className="mt-2 flex items-center justify-end gap-2">
            <button type="button" onClick={() => { setValue(''); setOpen(false) }} className="px-3 py-2 text-xs text-muted hover:text-ink">Cancel</button>
            <button type="button" onClick={add} disabled={!value.trim()} className="rounded-full bg-coral px-3.5 py-2 text-xs font-semibold text-ink hover:bg-coral-dark disabled:opacity-30">Add</button>
          </div>
        </div>
      )}
    </div>
  )
}