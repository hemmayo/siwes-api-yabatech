import mongoose, { Schema } from 'mongoose'

const departmentSchema = new Schema({
  title: {
    type: String
  },
  school: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

departmentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      school: this.school,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Department', departmentSchema)

export const schema = model.schema
export default model
