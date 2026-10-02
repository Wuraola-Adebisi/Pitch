export type PitchExample = {
  title: string
  quality: 'Stronger case' | 'Needs work'
  text: string
}

export const PITCH_EXAMPLES: PitchExample[] = [
  {
    title: 'Retail inventory',
    quality: 'Stronger case',
    text: "Independent retailers often make inventory decisions using sales history, intuition, and spreadsheets. That makes it easy to overstock slow-moving products or run out of products customers actually want. We're building a tool that uses a store's sales data to forecast near-term demand and recommend what to reorder, when, and roughly how much. It is designed for small retailers who need a practical recommendation without having to become data analysts.",
  },
  {
    title: 'Clinic follow-up',
    quality: 'Stronger case',
    text: "Small clinics lose time following up with patients after appointments because reminders are often handled manually. We're building a simple follow-up tool that lets clinics schedule personalised reminders and see which patients have responded. The first users would be independent clinics with small administrative teams, where missed follow-ups create avoidable work and lost appointments.",
  },
  {
    title: 'Freelancer cash flow',
    quality: 'Stronger case',
    text: "Freelancers can have strong monthly revenue and still struggle to know what they can safely spend because client payments arrive on different schedules. We're building a cash-flow planner that turns invoices and expected payment dates into a simple view of what is available now, what is committed, and what is likely to arrive next. It is aimed at freelancers who already invoice clients but do not want to maintain a financial spreadsheet.",
  },
  {
    title: 'AI productivity platform',
    quality: 'Needs work',
    text: "We're building an AI-powered productivity platform that helps people work smarter, save time, and achieve their goals. It brings everything into one place and uses intelligent automation to make users more efficient. Unlike other productivity tools, our platform is designed for the modern way people work.",
  },
  {
    title: 'Local marketplace',
    quality: 'Needs work',
    text: "We're creating a marketplace that connects local businesses with customers in their area. Businesses will be able to list their products and customers will be able to discover great options nearby. We think this can help local businesses get more visibility while giving customers a better way to shop.",
  },
  {
    title: 'Student learning app',
    quality: 'Needs work',
    text: "We're building an app for students that makes learning easier and more engaging. Students can use it to organise their notes, study with other people, and get help when they are stuck. The idea is to bring the best parts of different learning apps together in one experience.",
  },
]
