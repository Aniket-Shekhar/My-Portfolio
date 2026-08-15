import { useRef } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { SmoothScroll } from './components/SmoothScroll'
import { PageLoadIntro } from './components/PageLoadIntro'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Contact } from './components/sections/Contact'

export default function App() {
  const introProgressRef = useRef(0)

  return (
    <SmoothScroll>
      <PageLoadIntro />
      <div className="min-h-[100dvh] bg-[var(--color-canvas)]">
        <Navbar />
        <main>
          <Hero introProgressRef={introProgressRef} />
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
