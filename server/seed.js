import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })
import { Project } from './models/Project.js'
import { Experience } from './models/Experience.js'

const projects = [
  {
    name: 'Orbit Commerce',
    description:
      'Cross-platform storefront with real-time inventory sync and a Kotlin Android companion app for vendor dashboards.',
    stack: ['React', 'Node.js', 'MongoDB', 'Kotlin'],
    link: 'https://github.com/example/orbit-commerce',
    order: 0,
  },
  {
    name: 'Pulse Health',
    description:
      'Patient-facing web portal and Android app for appointment booking, vitals tracking, and secure messaging.',
    stack: ['TypeScript', 'Express', 'React Native', 'Firebase'],
    link: 'https://github.com/example/pulse-health',
    order: 1,
  },
  {
    name: 'Studio Atlas',
    description:
      'Creative agency site with motion-led storytelling, headless CMS hooks, and sub-second LCP on mobile.',
    stack: ['Vite', 'Framer Motion', 'Tailwind CSS'],
    order: 2,
  },
]

const experience = [
  {
    role: 'Full Stack Developer',
    company: 'Northline Digital',
    startDate: '2023',
    endDate: 'Present',
    description:
      'Shipped MERN products and Android features for fintech and health clients; owned API design and release cadence.',
    order: 0,
  },
  {
    role: 'Android Developer',
    company: 'AppForge Studio',
    startDate: '2021',
    endDate: '2023',
    description:
      'Built Kotlin apps with offline-first sync, Material You theming, and Play Store releases for consumer brands.',
    order: 1,
  },
  {
    role: 'Web Developer Intern',
    company: 'Pixel & Code',
    startDate: '2020',
    endDate: '2021',
    description:
      'Implemented responsive marketing sites and internal tools in React; paired with designers on component libraries.',
    order: 2,
  },
]

async function seed() {
  await connectDB(process.env.MONGODB_URI)
  await Project.deleteMany({})
  await Experience.deleteMany({})
  await Project.insertMany(projects)
  await Experience.insertMany(experience)
  console.log('Seed complete:', projects.length, 'projects,', experience.length, 'experience entries')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
