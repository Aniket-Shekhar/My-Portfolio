import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, default: 'Present' },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Experience = mongoose.model('Experience', experienceSchema)
