import { Router } from 'express'
import { Project } from '../models/Project.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean()
    res.json(projects)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

export default router
