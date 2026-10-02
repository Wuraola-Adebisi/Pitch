export type PitchExample = {
  title: string
  quality: 'Stronger' | 'Weaker'
  text: string
}

export const PITCH_EXAMPLES: PitchExample[] = [
  {
    title: 'A stronger case',
    quality: 'Stronger',
    text: "Independent retailers often make inventory decisions using sales history, intuition, and spreadsheets. That makes it easy to overstock slow-moving products or run out of products customers actually want. We're building a tool that uses a store's sales data to forecast near-term demand and recommend what to reorder, when, and roughly how much. It is designed for small retailers who need a practical recommendation without having to become data analysts.",
  },
  {
    title: 'A weaker case',
    quality: 'Weaker',
    text: "We're building an AI-powered productivity platform that helps people work smarter, save time, and achieve their goals. It brings everything into one place and uses intelligent automation to make users more efficient. Unlike other productivity tools, our platform is designed for the modern way people work.",
  },
  {
    title: 'Almost there',
    quality: 'Weaker',
    text: "Small clinics lose time following up with patients after appointments because reminders are often handled manually. We're building a follow-up tool that lets clinics schedule personalised reminders and see which patients have responded. It will help clinics save time and improve patient follow-up. We think independent clinics would be a good place to start.",
  },
]
