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

export interface Diagnosis {
  raw: string
  coreIdea: string
  audience: string | null
  problem: string | null
  promise: string | null
  differentiation: string | null
  proof: string | null
  outcome: string | null
  cta: string | null
  missing: string[]
}

export interface PitchResult {
  title: string
  sections: { heading: string; body: string; status?: 'draft' | 'grounded' }[]
}

export interface ChallengeQuestion {
  question: string
  targets: SectionKey
  severity: 'critical' | 'moderate'
}

const AUDIENCE_PATTERNS = [
  /for ([a-z][a-z\s,-]{2,50}?)(?:\.|,| who| that| without| to | so | –|—|$)/i,
  /helps? ([a-z][a-z\s,-]{2,50}?)(?:\.|,| without| to | so |$)/i,
  /built for ([a-z][a-z\s,-]{2,50}?)(?:\.|,| who| that|$)/i,
]

const PROBLEM_MARKERS = [
  'without', 'instead of', 'struggle', 'struggling', 'hard to', 'difficult to',
  'manual', 'manually', 'spreadsheet', 'no way', "can't", 'cannot', 'painful',
  'frustrat', 'wasting', 'lose track', 'losing track', 'time-consuming',
  'expensive', 'slow', 'broken', 'problem', 'challenge',
]

const SOLUTION_MARKERS = [
  'app that', 'platform that', 'tool that', 'product that', 'service that',
  'system that', 'app for', 'platform for', 'software that', 'marketplace that',
]

const DIFFERENTIATION_MARKERS = [
  'unlike', 'instead of other', 'different because', 'the only', "we're the first",
  'we are the first', 'no one else', 'nobody else', 'unlike existing', 'vs.', 'versus',
  'rather than', 'built around',
]

const PROOF_MARKERS = [
  '%', 'percent', 'users', 'customers', 'pilot', 'beta', 'waitlist', 'tested with',
  'revenue', 'paying', 'signed up', 'case stud', 'mrr', 'arr', 'retention',
  'conversion', 'gmv', 'downloads', 'booked',
]

const OUTCOME_MARKERS = [
  'so that', 'which means', 'resulting in', 'save time', 'save money', 'grow',
  'growth', 'faster', 'reduce', 'increase', 'more time', 'less time', 'revenue',
  'cost', 'profit', 'conversion',
]

const CTA_MARKERS = [
  'book a call', 'sign up', 'invest', 'join', 'demo', 'try it', 'get started',
  'schedule', 'reach out', 'contact us', 'pre-order', 'waitlist', 'buy', 'subscribe',
]

function findFirst(text: string, patterns: RegExp[]): string | null {
  for (const p of patterns) {
    const m = text.match(p)
    if (m?.[1]) return m[1].trim().replace(/[.,]$/, '')
  }
  return null
}

function hasAny(text: string, markers: string[]): boolean {
  const lower = text.toLowerCase()
  return markers.some((m) => lower.includes(m))
}

function splitSentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter(Boolean)
}

function firstMatchingSentence(sentences: string[], markers: string[]): string | null {
  return sentences.find((s) => hasAny(s, markers)) ?? null
}

export function diagnose(raw: string): Diagnosis {
  const text = raw.trim()
  const sentences = splitSentences(text)
  const audience = findFirst(text, AUDIENCE_PATTERNS)
  const problem = firstMatchingSentence(sentences, PROBLEM_MARKERS)
  const promise =
    firstMatchingSentence(sentences, SOLUTION_MARKERS) ??
    sentences.find((s) => /\b(we|our|my)\b.*\b(build|offer|provide|help)\b/i.test(s)) ??
    sentences[0] ?? null
  const differentiation = firstMatchingSentence(sentences, DIFFERENTIATION_MARKERS)
  const proof = firstMatchingSentence(sentences, PROOF_MARKERS)
  const outcome = firstMatchingSentence(sentences, OUTCOME_MARKERS)
  const cta = firstMatchingSentence(sentences, CTA_MARKERS)

  const missing: string[] = []
  if (!audience) missing.push('audience')
  if (!problem) missing.push('problem')
  if (!differentiation) missing.push('differentiation')
  if (!proof) missing.push('proof')
  if (!outcome) missing.push('outcome')
  if (!cta) missing.push('call to action')

  return {
    raw: text,
    coreIdea: sentences[0] ?? text,
    audience,
    problem,
    promise,
    differentiation,
    proof,
    outcome,
    cta,
    missing,
  }
}

export function buildArgumentMap(d: Diagnosis): ArgumentSection[] {
  const strengthOf = (have: string | null): ArgumentSection['strength'] => have ? 'strong' : 'weak'

  return [
    {
      key: 'problem',
      label: 'Problem',
      have: d.problem ?? '',
      missing: d.problem ? '' : 'No concrete problem statement detected. Name the recurring pain before introducing the product.',
      evidence: 'A specific moment where the pain happens, ideally with frequency, cost, or consequence.',
      connection: 'The audience needs to feel the problem before the solution earns attention.',
      strength: strengthOf(d.problem),
    },
    {
      key: 'whyItMatters',
      label: 'Why it matters',
      have: d.audience ? 'The pitch identifies ' + d.audience + ' as the audience.' : '',
      missing: d.audience ? '' : 'No specific audience detected. A broad category makes the stakes difficult to prove.',
      evidence: 'A cost figure, missed opportunity, or consequence tied directly to the audience.',
      connection: 'Stakes explain why solving the problem is worth prioritising.',
      strength: strengthOf(d.audience),
    },
    {
      key: 'insight',
      label: 'Insight',
      have: d.differentiation ?? '',
      missing: d.differentiation ? '' : 'No non-obvious insight detected. State what existing approaches misunderstand or leave unresolved.',
      evidence: 'One sentence explaining what others get wrong and what you see differently.',
      connection: 'A strong insight makes the proposed solution feel specific rather than interchangeable.',
      strength: strengthOf(d.differentiation),
    },
    {
      key: 'solution',
      label: 'Solution',
      have: d.promise ?? '',
      missing: d.promise ? '' : 'No clear solution sentence detected yet.',
      evidence: 'One concrete example of the product doing the thing, not a list of features.',
      connection: 'The solution should answer the problem directly.',
      strength: strengthOf(d.promise),
    },
    {
      key: 'whyNow',
      label: 'Why now',
      have: '',
      missing: 'No timing signal detected. Explain what changed in technology, behaviour, cost, regulation, or the market.',
      evidence: 'A dated trend, market shift, new capability, or behavioural change that makes this timely.',
      connection: 'Timing turns a reasonable idea into a timely opportunity.',
      strength: 'weak',
    },
    {
      key: 'proof',
      label: 'Proof',
      have: d.proof ?? '',
      missing: d.proof ? '' : 'No evidence detected. Claims need something observable behind them.',
      evidence: 'Users, revenue, pilots, retention, conversion, interviews, waitlist numbers, or another concrete signal.',
      connection: 'Proof reduces the amount of trust the audience has to supply themselves.',
      strength: strengthOf(d.proof),
    },
    {
      key: 'ask',
      label: 'Ask',
      have: d.cta ?? '',
      missing: d.cta ? '' : 'No explicit next step detected. Tell the audience exactly what you want from them.',
      evidence: 'A single next step sized to the stage of the business: pilot, introduction, sign-up, investment, or purchase.',
      connection: 'The ask converts understanding into action.',
      strength: strengthOf(d.cta),
    },
  ]
}

export function generateChallenges(d: Diagnosis, _map: ArgumentSection[]): ChallengeQuestion[] {
  const qs: ChallengeQuestion[] = []

  if (!d.audience) qs.push({
    question: 'Who exactly is this for, and what makes this group the first group to care?',
    targets: 'whyItMatters',
    severity: 'critical',
  })

  if (!d.problem) qs.push({
    question: 'What painful, recurring problem exists before your product does?',
    targets: 'problem',
    severity: 'critical',
  })

  if (!d.differentiation) qs.push({
    question: 'Why this instead of doing nothing or using the alternatives people already have?',
    targets: 'insight',
    severity: 'critical',
  })

  if (!d.proof) qs.push({
    question: 'What evidence supports the biggest claim in this pitch?',
    targets: 'proof',
    severity: 'critical',
  })

  if (!d.outcome) qs.push({
    question: 'What changes for the customer after they use this? Give the outcome, not another feature.',
    targets: 'whyItMatters',
    severity: 'moderate',
  })

  qs.push({
    question: 'Why does this need to exist now? What changed that makes the timing matter?',
    targets: 'whyNow',
    severity: 'moderate',
  })

  if (!d.cta) qs.push({
    question: 'What do you want the listener to do next, specifically?',
    targets: 'ask',
    severity: 'moderate',
  })

  return qs
}

export function generatePitch(d: Diagnosis, _map: ArgumentSection[]): PitchResult {
  const sections: PitchResult['sections'] = [
    {
      heading: 'The Problem',
      body: d.problem ?? 'Add a specific, recurring problem here.',
      status: d.problem ? 'grounded' : 'draft',
    },
    {
      heading: 'Why It Matters',
      body: d.outcome ?? (d.audience
        ? 'For ' + d.audience + ', explain the measurable cost of leaving this problem unresolved.'
        : 'Name the audience and explain the cost of leaving the problem unresolved.'),
      status: d.outcome ? 'grounded' : 'draft',
    },
    {
      heading: 'The Insight',
      body: d.differentiation ?? 'State the non-obvious insight that separates this approach from existing alternatives.',
      status: d.differentiation ? 'grounded' : 'draft',
    },
    {
      heading: 'The Solution',
      body: d.promise ?? d.coreIdea,
      status: d.promise ? 'grounded' : 'draft',
    },
    {
      heading: 'Why Now',
      body: 'Add the market, technology, behaviour, cost, or regulatory shift that makes this timely.',
      status: 'draft',
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

  return {
    title: d.coreIdea.length > 72 ? d.coreIdea.slice(0, 72).trim() + '…' : d.coreIdea,
    sections,
  }
}
