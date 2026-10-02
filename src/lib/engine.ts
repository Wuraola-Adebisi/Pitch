// Local mock reasoning engine.
// No external AI call is made in this MVP. A future model can replace these
// heuristics without changing the product flow.

export type SectionKey = 'problem' | 'whyItMatters' | 'insight' | 'solution' | 'whyNow' | 'proof' | 'ask'

export interface ArgumentSection {
  key: SectionKey
  label: string
  have: string
  missing: string
  evidence: string
  connection: string
  strength: 'strong' | 'partial' | 'weak'
}

export type FieldKey =
  | 'audience'
  | 'problem'
  | 'promise'
  | 'differentiation'
  | 'proof'
  | 'outcome'
  | 'whyNow'
  | 'cta'

export interface Diagnosis {
  raw: string
  coreIdea: string
  audience: string | null
  problem: string | null
  promise: string | null
  differentiation: string | null
  proof: string | null
  outcome: string | null
  whyNow: string | null
  cta: string | null
  // Labels of fields that were not found at all.
  missing: string[]
  // Fields that were found but are too vague to count as established.
  weak: FieldKey[]
}

export interface PitchResult {
  title: string
  sections: { heading: string; body: string; status?: 'draft' | 'grounded' }[]
}

export interface ChallengeQuestion {
  question: string
  targets: SectionKey
  severity: 'critical' | 'moderate'
  strengthen: string
}

/* ---------- Marker patterns (word-boundary aware) ---------- */

const PROBLEM_MARKERS: RegExp[] = [
  /\bwithout\b/i, /\binstead of\b/i, /\bstruggl/i, /\bhard to\b/i, /\bdifficult to\b/i,
  /\bmanual(ly)?\b/i, /\bspreadsheets?\b/i, /\bno way\b/i, /\bcan'?t\b/i, /\bcannot\b/i,
  /\bpain(ful)?\b/i, /\bfrustrat/i, /\bwast(e|es|ing)\b/i, /\blos(e|es|ing) track\b/i,
  /\btime-consuming\b/i, /\bexpensive\b/i, /\bslow\b/i, /\bbroken\b/i, /\bproblem\b/i,
  /\bchallenge\b/i, /\bfragmented\b/i, /\bunreliable\b/i,
]

const SOLUTION_MARKERS: RegExp[] = [
  /\b(app|platform|tool|product|service|system|software|marketplace|website|assistant|agency) (that|for|which)\b/i,
  /\b(we|our|my)\b.*\b(build|offer|provide|help|sell|serve|make|create)\b/i,
  /\b(i'?m|i am|we'?re|we are) (building|making|creating|launching)\b/i,
  /\bhelps? \w+/i,
]

const DIFFERENTIATION_MARKERS: RegExp[] = [
  /\bunlike\b/i, /\binstead of other\b/i, /\bdifferent because\b/i, /\bthe only\b/i,
  /\bwe'?re the first\b/i, /\bwe are the first\b/i, /\bno one else\b/i, /\bnobody else\b/i,
  /\bvs\.?\b/i, /\bversus\b/i, /\brather than\b/i, /\bbuilt around\b/i, /\bunlike existing\b/i,
]

const PROOF_MARKERS: RegExp[] = [
  /%/, /\bpercent\b/i, /\busers\b/i, /\bcustomers\b/i, /\bpilots?\b/i, /\bbeta\b/i,
  /\bwaitlist\b/i, /\btested with\b/i, /\brevenue\b/i, /\bpaying\b/i, /\bsigned up\b/i,
  /\bcase stud/i, /\bmrr\b/i, /\barr\b/i, /\bretention\b/i, /\bconversion\b/i, /\bgmv\b/i,
  /\bdownloads\b/i, /\bbooked\b/i, /\binterviews?\b/i,
]

const OUTCOME_MARKERS: RegExp[] = [
  /\bso that\b/i, /\bwhich means\b/i, /\bresulting in\b/i, /\bsave (time|money)\b/i,
  /\bgrow(th)?\b/i, /\bfaster\b/i, /\breduces?\b/i, /\bincreases?\b/i, /\bmore time\b/i,
  /\bless time\b/i, /\bprofit\b/i, /\bcut(s|ting)? (costs?|time)\b/i, /\bearn\b/i,
]

// Generic timing words only count as weak signals.
const WHY_NOW_WEAK: RegExp[] = [/\bright now\b/i, /\btoday\b/i, /\bcurrently\b/i]
const WHY_NOW_STRONG: RegExp[] = [
  /\brecently\b/i, /\bthis year\b/i, /\blast year\b/i, /\bnew (technology|regulation|market)\b/i,
  /\brecent change\b/i, /\bchanged\b/i, /\bshift\b/i, /\btrend\b/i, /\bgrowing demand\b/i,
  /\bincreasing demand\b/i, /\bregulation\b/i, /\bhas grown\b/i, /\bnow that\b/i, /\b20\d\d\b/,
]

const CTA_MARKERS: RegExp[] = [
  /\bbook a (call|demo)\b/i, /\bsign up\b/i, /\binvest(ing|ment)?\b/i, /\bjoin\b/i, /\bdemo\b/i,
  /\btry it\b/i, /\bget started\b/i, /\bschedule\b/i, /\breach out\b/i, /\bcontact us\b/i,
  /\bpre-?order\b/i, /\bwaitlist\b/i, /\bbuy\b/i, /\bsubscribe\b/i, /\bintro(duction)?\b/i,
]

const BROAD_AUDIENCES = new Set([
  'people', 'everyone', 'anyone', 'everybody', 'users', 'customers', 'businesses',
  'companies', 'consumers', 'teams', 'organisations', 'organizations', 'individuals',
])

/* ---------- Helpers ---------- */

const matches = (text: string, markers: RegExp[]): number =>
  markers.reduce((n, m) => n + (m.test(text) ? 1 : 0), 0)

const hasDigit = (s: string): boolean => /\d/.test(s)

const wordCount = (s: string): number => (s.match(/\b[\w'-]+\b/g) ?? []).length

const stripEnd = (s: string): string => s.trim().replace(/[.!?,;:]+$/, '')

const capitalise = (s: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

const quote = (s: string, max = 90): string => {
  const t = stripEnd(s)
  return '"' + (t.length > max ? t.slice(0, max).trim() + '...' : t) + '"'
}

// "I'm building an app that..." becomes "An app that..."
const LEAD_IN = /^(i'?m|i am|we'?re|we are|i'?ve been|we'?ve been)\s+(building|making|creating|working on|launching|developing)\s+/i
function cleanLead(s: string): string {
  const t = s.trim()
  return LEAD_IN.test(t) ? capitalise(t.replace(LEAD_IN, '')) : t
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/* ---------- Audience ---------- */

const AUDIENCE_LEAD = /\b(?:built for|designed for|made for|helps?|helping|serves?|serving|(?:app|platform|tool|product|service|software|system|marketplace|website|solution|agency|studio) (?:is |are )?for)\s+([^.;:!?\n]+)/i
const AUDIENCE_STOP = new Set([
  'to', 'who', 'that', 'which', 'without', 'so', 'get', 'gets', 'getting', 'manage', 'sell',
  'plan', 'turn', 'build', 'book', 'buy', 'use', 'save', 'find', 'predict', 'track', 'run',
  'make', 'create', 'stop', 'spend', 'with', 'in', 'when', 'by', 'from', 'on', 'at', 'while',
  'because', 'needing', 'need', 'needs', 'want', 'wants', 'looking', 'trying', 'try',
])
const AUDIENCE_BAD_FIRST = new Set([
  'example', 'free', 'a', 'an', 'the', 'now', 'more', 'every', 'each', 'any', 'you', 'me', 'us',
  'it', 'this', 'that', 'over', 'less', 'all', 'one', 'them', 'him', 'her', 'my', 'our',
])

function findAudience(text: string): string | null {
  const m = text.match(AUDIENCE_LEAD)
  if (!m?.[1]) return null
  const words = m[1].replace(/,/g, ' ,').split(/\s+/)
  const kept: string[] = []
  for (const w of words) {
    const lw = w.toLowerCase()
    if (lw === ',' || AUDIENCE_STOP.has(lw)) break
    kept.push(w)
    if (kept.length >= 6) break
  }
  if (kept.length === 0 || AUDIENCE_BAD_FIRST.has(kept[0].toLowerCase())) return null
  return kept.join(' ')
}

/* ---------- Field assignment ---------- */

interface Unit { text: string; claimedBy: FieldKey | null }

// Assign each sentence to at most one field, strongest signal first.
function pickUnit(units: Unit[], markers: RegExp[], field: FieldKey, extra?: (u: string) => number): Unit | null {
  let best: Unit | null = null
  let bestScore = 0
  for (const u of units) {
    if (u.claimedBy) continue
    const score = matches(u.text, markers) + (extra ? extra(u.text) : 0)
    if (score > bestScore) { best = u; bestScore = score }
  }
  if (best) best.claimedBy = field
  return best
}

// When every matching sentence is already claimed, pull only the relevant clause
// out of a claimed sentence so the same text is not shown twice.
function spanFrom(units: Unit[], markers: RegExp[], from: FieldKey): string | null {
  for (const u of units) {
    if (u.claimedBy !== from) continue
    for (const m of markers) {
      const hit = u.text.match(m)
      if (hit?.index === undefined) continue
      const before = u.text.slice(0, hit.index).trim().split(/\s+/).filter(Boolean)
      const span = stripEnd([...before.slice(-3), u.text.slice(hit.index)].join(' '))
      if (span.length > 0 && span.length < stripEnd(u.text).length) return span
    }
  }
  return null
}

/* ---------- Public API ---------- */

export function diagnose(raw: string): Diagnosis {
  const text = raw.trim()
  const units: Unit[] = splitSentences(text).map((t) => ({ text: t, claimedBy: null }))

  const audience = findAudience(text)

  // Priority order: most distinctive signals first, so they are not swallowed by vaguer ones.
  const cta = pickUnit(units, CTA_MARKERS, 'cta')?.text ?? null
  const proof = pickUnit(units, PROOF_MARKERS, 'proof', (s) => (hasDigit(s) ? 2 : 0))?.text ?? null
  const whyNow = pickUnit(units, [...WHY_NOW_STRONG, ...WHY_NOW_WEAK], 'whyNow')?.text ?? null
  const differentiation = pickUnit(units, DIFFERENTIATION_MARKERS, 'differentiation')?.text ?? null
  const promise = pickUnit(units, SOLUTION_MARKERS, 'promise')?.text ?? null
  const problemUnit = pickUnit(units, PROBLEM_MARKERS, 'problem')
  const problemSpan = spanFrom(units, PROBLEM_MARKERS, 'promise')
  const problem = problemUnit?.text ?? (problemSpan ? capitalise(problemSpan) : null)
  const outcomeUnit = pickUnit(units, OUTCOME_MARKERS, 'outcome')
  const outcomeSpan = spanFrom(units, OUTCOME_MARKERS, 'promise')
  const outcome = outcomeUnit?.text ?? (outcomeSpan ? capitalise(outcomeSpan) : null)

  const found: Record<FieldKey, string | null> = {
    audience, problem, promise, differentiation, proof, outcome, whyNow, cta,
  }

  const labels: Record<FieldKey, string> = {
    audience: 'audience', problem: 'problem', promise: 'promise', differentiation: 'differentiation',
    proof: 'proof', outcome: 'outcome', whyNow: 'why now', cta: 'call to action',
  }
  const order: FieldKey[] = ['audience', 'problem', 'promise', 'differentiation', 'proof', 'outcome', 'whyNow', 'cta']
  const missing = order.filter((k) => !found[k]).map((k) => labels[k])

  const weak: FieldKey[] = []
  if (audience && (audience.split(/\s+/).length === 1 && BROAD_AUDIENCES.has(audience.toLowerCase()))) weak.push('audience')
  if (proof && !hasDigit(proof)) weak.push('proof')
  if (whyNow && matches(whyNow, WHY_NOW_STRONG) === 0) weak.push('whyNow')

  return {
    raw: text,
    coreIdea: cleanLead(units[0]?.text ?? text),
    ...found,
    missing,
    weak,
  }
}

// Returns an error message when the input is too thin to analyse, otherwise null.
export function validateIdea(raw: string): string | null {
  const text = raw.trim()
  if (wordCount(text) < 8) {
    return 'Add a little more. A sentence or two about who it is for and what it does is enough.'
  }
  const d = diagnose(text)
  const signals = order8(d).filter(Boolean).length
  if (signals === 0) {
    return 'Nothing here reads as a pitch yet. Say who it is for, what problem it solves, or what you are offering.'
  }
  return null
}

function order8(d: Diagnosis): (string | null)[] {
  return [d.audience, d.problem, d.promise, d.differentiation, d.proof, d.outcome, d.whyNow, d.cta]
}

export function buildArgumentMap(d: Diagnosis): ArgumentSection[] {
  const isWeak = (k: FieldKey) => d.weak.includes(k)
  const strengthOf = (k: FieldKey): ArgumentSection['strength'] =>
    !d[k] ? 'weak' : isWeak(k) ? 'partial' : 'strong'
  const strengthOfPair = (a: FieldKey, b: FieldKey): ArgumentSection['strength'] => {
    const sa = strengthOf(a)
    const sb = strengthOf(b)
    if (sa === 'strong' && sb === 'strong') return 'strong'
    if (sa === 'weak' && sb === 'weak') return 'weak'
    return 'partial'
  }

  return [
    {
      key: 'problem',
      label: 'Problem',
      have: d.problem ?? '',
      missing: d.problem ? '' : 'No concrete problem statement detected. Name the recurring pain before introducing the product.',
      evidence: 'A specific moment where the pain happens, ideally with frequency, cost, or consequence.',
      connection: d.problem && d.promise
        ? 'The solution has something to answer. Check that it addresses this exact problem.'
        : 'The audience needs to feel the problem before the solution earns attention.',
      strength: strengthOf('problem'),
    },
    {
      key: 'whyItMatters',
      label: 'Audience',
      have: [d.audience ? 'Audience: ' + d.audience + '.' : '', d.outcome ? 'Outcome: ' + d.outcome : ''].filter(Boolean).join(' '),
      missing: !d.audience
        ? 'No specific audience detected. A broad category makes the stakes difficult to prove.'
        : isWeak('audience')
          ? 'The audience is named too broadly. Pick the first specific group that feels this problem most.'
          : !d.outcome
            ? 'The audience is present, but the consequence of solving the problem is not established yet.'
            : '',
      evidence: 'A cost figure, missed opportunity, or consequence tied directly to the audience.',
      connection: 'Stakes explain why solving the problem is worth prioritising.',
      strength: strengthOfPair('audience', 'outcome'),
    },
    {
      key: 'insight',
      label: 'Insight',
      have: d.differentiation ?? '',
      missing: d.differentiation ? '' : 'No non-obvious insight detected. State what existing approaches misunderstand or leave unresolved.',
      evidence: 'One sentence explaining what others get wrong and what you see differently.',
      connection: 'A strong insight makes the proposed solution feel specific rather than interchangeable.',
      strength: strengthOf('differentiation'),
    },
    {
      key: 'solution',
      label: 'Solution',
      have: d.promise ?? '',
      missing: d.promise ? '' : 'No clear solution sentence detected yet. Describe what the product, service, or approach actually does.',
      evidence: 'One concrete example of the product doing the thing, not a list of features.',
      connection: 'The solution should answer the problem directly.',
      strength: strengthOf('promise'),
    },
    {
      key: 'whyNow',
      label: 'Why now',
      have: d.whyNow ?? '',
      missing: !d.whyNow
        ? 'No timing signal detected. Explain what changed in technology, behaviour, cost, regulation, or the market.'
        : isWeak('whyNow')
          ? 'Timing is mentioned but nothing specific changed. Name what is different now.'
          : '',
      evidence: 'A dated trend, market shift, new capability, or behavioural change that makes this timely.',
      connection: 'Timing turns a reasonable idea into a timely opportunity.',
      strength: strengthOf('whyNow'),
    },
    {
      key: 'proof',
      label: 'Proof',
      have: d.proof ?? '',
      missing: !d.proof
        ? 'No evidence detected. Claims need something observable behind them.'
        : isWeak('proof')
          ? 'Evidence is mentioned without a number. Add a count, rate, or result.'
          : '',
      evidence: 'Users, revenue, pilots, retention, conversion, interviews, waitlist numbers, or another concrete signal.',
      connection: 'Proof reduces the amount of trust the audience has to supply themselves.',
      strength: strengthOf('proof'),
    },
    {
      key: 'ask',
      label: 'Ask',
      have: d.cta ?? '',
      missing: d.cta ? '' : 'No explicit next step detected. Tell the audience exactly what you want from them.',
      evidence: 'A single next step sized to the stage of the business: pilot, introduction, sign-up, investment, or purchase.',
      connection: 'The ask converts understanding into action.',
      strength: strengthOf('cta'),
    },
  ]
}

export function generateChallenges(d: Diagnosis, _map?: ArgumentSection[]): ChallengeQuestion[] {
  const qs: ChallengeQuestion[] = []
  const weak = (k: FieldKey) => d.weak.includes(k)

  // Gaps: nothing was found.
  if (!d.audience) qs.push({
    question: 'Who exactly is this for, and what makes this group the first group to care?',
    targets: 'whyItMatters',
    severity: 'critical',
    strengthen: 'Name the first specific audience, then connect the problem to a concrete cost, consequence, or unmet need for that group.',
  })
  if (!d.problem) qs.push({
    question: 'What painful, recurring problem exists before your product does?',
    targets: 'problem',
    severity: 'critical',
    strengthen: 'Describe the recurring situation, who experiences it, and what it costs them when it is left unresolved.',
  })
  if (!d.differentiation) qs.push({
    question: d.promise
      ? 'Someone could say ' + quote(cleanLead(d.promise)) + ' about a dozen products. Why this one instead of doing nothing or using what people already have?'
      : 'Why this instead of doing nothing or using the alternatives people already have?',
    targets: 'insight',
    severity: 'critical',
    strengthen: 'Give the strongest alternative and one reason this approach changes the outcome rather than simply adding another feature.',
  })
  if (!d.proof) qs.push({
    question: 'What evidence supports the biggest claim in this pitch?',
    targets: 'proof',
    severity: 'critical',
    strengthen: 'Add one observable signal: users, revenue, pilots, interviews, retention, conversion, or another concrete result.',
  })
  if (!d.outcome) qs.push({
    question: 'What changes for the customer after they use this? Give the outcome, not another feature.',
    targets: 'whyItMatters',
    severity: 'moderate',
    strengthen: 'State the measurable or observable change the audience gets after the solution works.',
  })
  if (!d.whyNow) qs.push({
    question: 'Why does this need to exist now? What changed that makes the timing matter?',
    targets: 'whyNow',
    severity: 'moderate',
    strengthen: 'Point to a dated market, technology, behaviour, cost, or regulatory change that makes the timing meaningful.',
  })
  if (!d.cta) qs.push({
    question: 'What do you want the listener to do next, specifically?',
    targets: 'ask',
    severity: 'moderate',
    strengthen: 'Choose one concrete next action and make it proportional to what you are asking the audience to commit.',
  })

  // Vague: found, but too thin to hold up.
  if (d.audience && weak('audience')) qs.push({
    question: 'You say this is for ' + quote(d.audience, 40) + '. Which specific slice of that group feels the problem most?',
    targets: 'whyItMatters',
    severity: 'critical',
    strengthen: 'Narrow to one group you could reach this month, and say why they would care first.',
  })
  if (d.proof && weak('proof')) qs.push({
    question: 'You mention ' + quote(d.proof) + '. What is the number behind that?',
    targets: 'proof',
    severity: 'critical',
    strengthen: 'Add a count, a rate, or a before and after result so the claim can be checked.',
  })
  if (d.whyNow && weak('whyNow')) qs.push({
    question: 'You point to timing with ' + quote(d.whyNow) + '. What specifically changed, and when?',
    targets: 'whyNow',
    severity: 'moderate',
    strengthen: 'Name the shift (technology, cost, behaviour, regulation) and roughly when it happened.',
  })

  // Found and not obviously vague: still press on the claims a skeptic would target.
  if (d.problem && !hasDigit(d.problem)) qs.push({
    question: 'You describe the problem as ' + quote(d.problem) + '. How often does it happen, and what does it cost?',
    targets: 'problem',
    severity: 'moderate',
    strengthen: 'Add a frequency, a cost, or a consequence so the problem feels measurable.',
  })
  if (d.promise && d.differentiation) qs.push({
    question: 'You claim ' + quote(d.differentiation) + '. What would a skeptic point to as the strongest alternative?',
    targets: 'insight',
    severity: 'moderate',
    strengthen: 'Name the closest alternative directly and say why people would still pick yours.',
  })
  if (d.outcome && !hasDigit(d.outcome)) qs.push({
    question: 'You promise ' + quote(d.outcome) + '. By how much, and how would the customer notice?',
    targets: 'whyItMatters',
    severity: 'moderate',
    strengthen: 'Put a number or an observable before and after on the outcome.',
  })

  return qs
}

export function generatePitch(d: Diagnosis, _map?: ArgumentSection[]): PitchResult {
  const sections: PitchResult['sections'] = [
    {
      heading: 'The Problem',
      body: d.problem ? d.problem : 'Add a specific, recurring problem here.',
      status: d.problem ? 'grounded' : 'draft',
    },
    {
      heading: 'Why It Matters',
      body: d.outcome
        ? d.outcome
        : d.audience
          ? 'For ' + d.audience + ', explain the measurable cost of leaving this problem unresolved.'
          : 'Name the audience and explain the cost of leaving the problem unresolved.',
      status: d.outcome ? 'grounded' : 'draft',
    },
    {
      heading: 'The Insight',
      body: d.differentiation ?? 'State the non-obvious insight that separates this approach from existing alternatives.',
      status: d.differentiation ? 'grounded' : 'draft',
    },
    {
      heading: 'The Solution',
      body: d.promise ? cleanLead(d.promise) : d.coreIdea,
      status: d.promise ? 'grounded' : 'draft',
    },
    {
      heading: 'Why Now',
      body: d.whyNow ?? 'Add the market, technology, behaviour, cost, or regulatory shift that makes this timely.',
      status: d.whyNow ? 'grounded' : 'draft',
    },
    {
      heading: 'Proof',
      body: d.proof ?? 'Add the strongest evidence you have: users, revenue, pilots, interviews, retention, or another concrete signal.',
      status: d.proof ? 'grounded' : 'draft',
    },
    {
      heading: 'The Ask',
      body: d.cta ?? 'State one clear next step: pilot, introduction, sign-up, investment, purchase, or another concrete action.',
      status: d.cta ? 'grounded' : 'draft',
    },
  ]

  const title = stripEnd(d.coreIdea)
  const short = title.length > 72 ? title.slice(0, 72).replace(/\s+\S*$/, '').trim() + '...' : title

  return { title: capitalise(short), sections }
}