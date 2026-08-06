export const site = {
  name: 'Aniket Shekhar',
  initials: 'AS',
  role: 'Web & Android Developer',
  heroLabel: 'AVAILABLE FOR WORK',
  heroSupporting:
    'I design and ship polished web experiences and native Android apps — from API to Play Store.',
  heroCta: 'View Projects',
  navCta: 'Get in touch',
  about: {
    label: 'ABOUT',
    headline: 'About',
    body:
      'I am a developer focused on both web and Android — building fast, accessible products with clear architecture and thoughtful motion. I enjoy owning features end to end: UI, APIs, and deployment.',
    skills: [
      'React',
      'TypeScript',
      'Node.js',
      'MongoDB',
      'Kotlin',
      'Android',
      'REST APIs',
      'Tailwind CSS',
    ],
  },
  projects: {
    label: 'WORK',
    headline: 'Projects',
  },
  experience: {
    label: 'CAREER',
    headline: 'Experience',
  },
  contact: {
    label: 'CONTACT',
    headline: "Let's build something",
    subline: 'Tell me about your product, team, or idea — I reply within a few days.',
    cta: 'Send a message',
    email: 'hello@aniketshekhar.dev',
    github: 'https://github.com/aniketshekhar',
    linkedin: 'https://linkedin.com/in/aniketshekhar',
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Aniket Shekhar`,
  },
} as const

export type ProjectFromApi = {
  _id: string
  name: string
  description: string
  stack: string[]
  link?: string
  image?: string
}

export type ExperienceFromApi = {
  _id: string
  role: string
  company: string
  startDate: string
  endDate: string
  description: string
}
