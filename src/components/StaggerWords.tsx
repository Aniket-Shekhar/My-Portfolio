import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../lib/motion'

type Props = {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'p' | 'span'
  delay?: number
}

export function StaggerWords({ text, className = '', as = 'span', delay = 0 }: Props) {
  const words = text.split(/\s+/)
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      transition={{ delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={staggerItem}
          className="inline-block mr-[0.22em] last:mr-0"
          aria-hidden
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
