import { Router } from 'express'
import { Experience } from '../models/Experience.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const entries = await Experience.find().sort({ order: 1, createdAt: -1 }).lean()
    res.json(entries)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch experience' })
  }
})

export default router
