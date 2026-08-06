import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { SmoothScroll } from './components/SmoothScroll'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Contact } from './components/sections/Contact'

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-[100dvh] bg-[var(--color-canvas)]">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
