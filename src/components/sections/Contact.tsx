import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from '../SectionHeader'
import { Button } from '../Button'
import { site } from '../../content'
import { fetchJson } from '../../lib/api'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setFeedback('')
    try {
      await fetchJson('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      setStatus('ok')
      setFeedback('Message sent — thank you.')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setFeedback(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const inputClass =
    'w-full rounded-[var(--radius-ui)] bg-transparent px-4 py-3 text-[var(--text-body)] font-extralight text-[var(--color-white)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-electric-iris)] placeholder:text-[var(--color-ash-gray)]'

  return (
    <section
      id="contact"
      className="py-[var(--spacing-section-y-mobile)] md:py-[var(--spacing-section-y)]"
    >
      <div className="mx-auto max-w-[var(--width-content)] px-6 md:px-8">
        <SectionHeader
          label={site.contact.label}
          headline={site.contact.headline}
          className="max-w-3xl"
          headlineClassName="text-[clamp(2.75rem,6vw,4.875rem)] font-normal leading-tight tracking-[var(--tracking-display)] text-[var(--color-white)]"
        />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-6 max-w-prose text-[var(--text-body)] font-extralight text-[var(--color-silver-mist)]"
        >
          {site.contact.subline}
        </motion.p>

        <motion.form
          onSubmit={onSubmit}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 max-w-xl space-y-4"
        >
          <motion.label variants={staggerItem} className="block">
            <span className="sr-only">Name</span>
            <input
              className={inputClass}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </motion.label>
          <motion.label variants={staggerItem} className="block">
            <span className="sr-only">Email</span>
            <input
              className={inputClass}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </motion.label>
          <motion.label variants={staggerItem} className="block">
            <span className="sr-only">Message</span>
            <textarea
              className={`${inputClass} min-h-[140px] resize-y`}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </motion.label>
          <motion.div variants={staggerItem}>
            <Button variant="primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : site.contact.cta}
            </Button>
          </motion.div>
          {feedback ? (
            <motion.p
              variants={staggerItem}
              className={`text-[var(--text-body)] font-extralight ${
                status === 'error' ? 'text-[var(--color-saffron-spark)]' : 'text-[var(--color-ash-gray)]'
              }`}
              role="status"
            >
              {feedback}
            </motion.p>
          ) : null}
        </motion.form>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-14 flex flex-col gap-4 sm:flex-row sm:gap-10"
        >
          <motion.li variants={staggerItem}>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 text-[var(--text-body)] font-extralight text-[var(--color-ash-gray)] hover:text-[var(--color-white)] transition-colors"
            >
              <span aria-hidden>✉</span> {site.contact.email}
            </a>
          </motion.li>
          <motion.li variants={staggerItem}>
            <a
              href={site.contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[var(--text-body)] font-extralight text-[var(--color-ash-gray)] hover:text-[var(--color-white)] transition-colors"
            >
              GitHub
            </a>
          </motion.li>
          <motion.li variants={staggerItem}>
            <a
              href={site.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[var(--text-body)] font-extralight text-[var(--color-ash-gray)] hover:text-[var(--color-white)] transition-colors"
            >
              LinkedIn
            </a>
          </motion.li>
        </motion.ul>
      </div>
    </section>
  )
}
