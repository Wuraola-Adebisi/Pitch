// Pitch: local mock reasoning engine.
// No real AI backend yet: this is a heuristic, rule-based stand-in that
// mimics what an LLM-driven diagnosis/critique pass would surface,
// so the product experience can be judged before any model is wired in.

export type SectionKey =
  | 'problem'
  | 'whyItMatters'
  | 'insight'
  | 'solution'
  | 'whyNow'
  | 'proof'
  | 'ask'

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
  sections: { heading: string; body: string }[]
}

export interface ChallengeQuestion {
  question: string
  targets: SectionKey
  severity: 'critical' | 'moderate'
}

const AUDIENCE_PATTERNS = [
  /for ([a-z][a-z\s,-]{2,40}?)(?:\.|,| who| that| without| to | so | –|$)/i,
  /helps? ([a-z][a-z\s,-]{2,40}?)(?:\.|,| without| to | so |$)/i,
]

const PROBLEM_MARKERS = [
  'without', 'instead of', 'struggle', 'struggling', 'hard to', 'difficult to',
  'manual', 'manually', 'spreadsheet', 'no way to', "can't", 'cannot', 'painful',
  'frustrat', 'wasting', 'lose track', 'losing track', 'time-consuming',
]

const SOLUTION_MARKERS = [
  'app that', 'platform that', 'tool that', 'product that', 'service that',
  'system that', 'app for', 'platform for',
]

const DIFFERENTIATION_MARKERS = [
  'unlike', 'instead of other', 'different because', 'the only', "we're the first",
  'we are the first', 'no one else', 'nobody else', 'unlike existing', 'vs.', 'versus',
]

const PROOF_MARKERS = [
  '%', 'percent', 'users', 'customers', 'pilot', 'beta', 'waitlist', 'tested with',
  'revenue', 'paying', 'signed up', 'case stud', 'in revenue', 'mrr', 'arr',
]

const OUTCOME_MARKERS = [
  'so that', 'which means', 'resulting in', 'save time', 'save money', 'grow',
  'growth', 'faster', 'reduce', 'increase', 'more time', 'less time',
]

const CTA_MARKERS = [
  'book a call', 'sign up', 'invest', 'join', 'demo', 'try it', 'get started',
  'schedule', 'reach out', 'contact us', 'pre-order', 'waitlist',
]

function findFirst(text: string, patterns: RegExp[]): string | null {
  for (const p of patterns) {
    const m = text.match(p)
    if (m && m[1]) return m[1].trim()
  }
  return null
}

function hasAny(text: string, markers: string[]): boolean {
  const lower = text.toLowerCase()
  return markers.some((m) => lower.includes(m))
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function diagnose(raw: string): Diagnosis {
  const text = raw.trim()
  const sentences = splitSentences(text)
  const audience = findFirst(text, AUDIENCE_PATTERNS)
  const problemSentence = sentences.find((s) => hasAny(s, PROBLEM_MARKERS)) ?? null
  const solutionSentence = sentences.find((s) => hasAny(s, SOLUTION_MARKERS)) ?? sentences[0] ?? null
  const hasDifferentiation = hasAny(text, DIFFERENTIATION_MARKERS)
  const hasProof = hasAny(text, PROOF_MARKERS)
  const outcomeSentence = sentences.find((s) => hasAny(s, OUTCOME_MARKERS)) ?? null
  const hasCta = hasAny(text, CTA_MARKERS)

  const missing: string[] = []
  if (!audience) missing.push('audience')
  if (!problemSentence) missing.push('problem')
  if (!hasDifferentiation) missing.push('differentiation')
  if (!hasProof) missing.push('proof')
  if (!outcomeSentence) missing.push('outcome')
  if (!hasCta) missing.push('call to action')

  return {
    raw: text,
    coreIdea: sentences[0] ?? text,
    audience,
    problem: problemSentence,
    promise: solutionSentence,
    differentiation: hasDifferentiation
      ? (sentences.find((s) => hasAny(s, DIFFERENTIATION_MARKERS)) ?? null)
      : null,
    proof: hasProof ? (sentences.find((s) => hasAny(s, PROOF_MARKERS)) ?? null) : null,
    outcome: outcomeSentence,
    cta: hasCta ? (sentences.find((s) => hasAny(s, CTA_MARKERS)) ?? null) : null,
    missing,
  }
}

export function buildArgumentMap(d: Diagnosis): ArgumentSection[] {
  const strengthOf = (have: string | null, hardMissing: boolean): ArgumentSection['strength'] =>
    have && !hardMissing ? 'strong' : have ? 'partial' : 'weak'

  return [
    {
      key: 'problem',
      label: 'Problem',
      have: d.problem ?? '',
      missing: d.problem
        ? ''
        : 'No concrete problem statement. Right now this reads as a feature, not a pain.',
      evidence: 'A short, specific moment where this pain actually happens. A scene, not a category.',
      connection: 'This has to exist before anyone cares why it matters.',
      strength: strengthOf(d.problem, false),
    },
    {
      key: 'whyItMatters',
      label: 'Why it matters',
      have: d.audience ? `For ${d.audience}, this is a real cost, not a minor annoyance.` : '',
      missing: d.audience
        ? ''
        : "No audience named yet, so there's no one for this to matter to.",
      evidence: 'A cost figure, such as hours lost, money leaked, or deals missed, tied to the named audience.',
      connection: 'Stakes earn the right to propose a solution next.',
      strength: strengthOf(d.audience, false),
    },
    {
      key: 'insight',
      label: 'Insight',
      have: d.differentiation ? '' : '',
      missing: 'Not stated: the non-obvious reason this problem has stayed unsolved until now.',
      evidence: 'One sentence on what everyone else gets wrong about this problem.',
      connection: 'The insight is what makes the solution feel inevitable rather than arbitrary.',
      strength: 'weak',
    },
    {
      key: 'solution',
      label: 'Solution',
      have: d.promise ?? '',
      missing: d.promise ? '' : 'No solution sentence detected yet.',
      evidence: 'A single, concrete example of the product doing the thing.',
      connection: 'Explained here only after the problem has already been felt.',
      strength: strengthOf(d.promise, false),
    },
    {
      key: 'whyNow',
      label: 'Why now',
      have: '',
      missing: 'Not addressed: why this is possible or urgent today, and not two years ago.',
      evidence: 'A shift in cost, behavior, technology, or regulation that makes this timely.',
      connection: 'Urgency is what turns interest into action.',
      strength: 'weak',
    },
    {
      key: 'proof',
      label: 'Proof',
      have: d.proof ?? '',
      missing: d.proof
        ? ''
        : 'No evidence yet. No users, numbers, pilots, or testimonials referenced.',
      evidence: 'Any number: users, revenue, retention, a pilot result, even a single strong quote.',
      connection: 'Proof is what makes the ask feel low-risk.',
      strength: strengthOf(d.proof, false),
    },
    {
      key: 'ask',
      label: 'Ask',
      have: d.cta ?? '',
      missing: d.cta ? '' : 'No explicit ask. The audience is left to guess what happens next.',
      evidence: 'One unambiguous next step, sized to how much trust has been built so far.',
      connection: 'The ask should feel like the obvious next step after everything above it.',
      strength: strengthOf(d.cta, false),
    },
  ]
}

export function generateChallenges(d: Diagnosis, _map: ArgumentSection[]): ChallengeQuestion[] {
  const qs: ChallengeQuestion[] = []

  if (!d.differentiation) {
    qs.push({
      question: 'Why would someone choose this instead of doing nothing, or sticking with what they already use?',
      targets: 'insight',
      severity: 'critical',
    })
  }
  if (!d.proof) {
    qs.push({
      question: 'What evidence supports this working? Right now every claim is asserted, not demonstrated.',
      targets: 'proof',
      severity: 'critical',
    })
  }
  if (!d.audience) {
    qs.push({
      question: "Who exactly is this for? 'Small businesses' or 'people' is not an audience. It's a category.",
      targets: 'whyItMatters',
      severity: 'critical',
    })
  }
  if (d.promise && d.problem) {
    const problemIdx = d.raw.toLowerCase().indexOf(d.problem.toLowerCase().slice(0, 20))
    const solutionIdx = d.raw.toLowerCase().indexOf(d.promise.toLowerCase().slice(0, 20))
    if (solutionIdx !== -1 && problemIdx !== -1 && solutionIdx < problemIdx) {
      qs.push({
        question: 'You explain what the product does before establishing why the audience should care. Reorder it.',
        targets: 'solution',
        severity: 'moderate',
      })
    }
  }
  if (!d.outcome) {
    qs.push({
      question: "What changes for the audience once they've used this? The benefit is implied, never stated.",
      targets: 'whyItMatters',
      severity: 'moderate',
    })
  }
  if (!d.cta) {
    qs.push({
      question: 'What do you actually want the listener to do next? Right now the pitch just stops.',
      targets: 'ask',
      severity: 'moderate',
    })
  }
  qs.push({
    question: "Why now, and not a year ago? If nothing has changed, the audience will assume you're late.",
    targets: 'whyNow',
    severity: 'moderate',
  })

  return qs
}

export function generatePitch(d: Diagnosis, _map: ArgumentSection[]): PitchResult {
  const audience = d.audience ?? 'the people most affected by this'
  const problem = d.problem ?? 'a problem that has never been named clearly enough to act on'
  const solution = d.promise ?? d.coreIdea
  const proof = d.proof
  const cta = d.cta

  const sections: { heading: string; body: string }[] = [
    {
      heading: 'The Problem',
      body: problem,
    },
    {
      heading: 'Why It Matters',
      body: `For ${audience}, this isn't a minor inconvenience. It's a recurring cost, in time, money, or trust, that compounds the longer it goes unaddressed.`,
    },
    {
      heading: 'The Insight',
      body: d.differentiation
        ? d.differentiation
        : 'Most existing approaches treat this as a tooling problem, when it is actually a behavior problem. That is why adding another tool hasn\'t fixed it.',
    },
    {
      heading: 'The Solution',
      body: solution,
    },
    {
      heading: 'Why Now',
      body: 'The conditions that made this hard to solve before, such as cost, habit, or lack of a good enough alternative, have shifted enough that this is now possible, and worth building.',
    },
  ]

  if (proof) {
    sections.push({ heading: 'Proof', body: proof })
  }

  sections.push({
    heading: 'The Ask',
    body: cta ?? 'A clear next step for anyone convinced by the above, such as a call, a pilot, or a sign-up, still needs to be named.',
  })

  return {
    title: d.coreIdea.length > 70 ? d.coreIdea.slice(0, 70).trim() + '…' : d.coreIdea,
    sections,
  }
}
