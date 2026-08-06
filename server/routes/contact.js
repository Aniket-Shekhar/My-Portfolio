import { Router } from 'express'
import { Message } from '../models/Message.js'
import { sendContactNotification } from '../lib/mail.js'

const router = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

router.post('/', async (req, res) => {
  try {
    const name = String(req.body?.name ?? '').trim()
    const email = String(req.body?.email ?? '').trim().toLowerCase()
    const message = String(req.body?.message ?? '').trim()

    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Please enter your name.' })
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email.' })
    }
    if (!message || message.length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters.' })
    }

    const doc = await Message.create({ name, email, message })

    sendContactNotification({ name, email, message }).catch((err) => {
      console.error('Contact email failed:', err.message)
    })

    res.status(201).json({ ok: true, id: doc._id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

export default router
