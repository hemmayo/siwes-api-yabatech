import mongoose, { Schema } from 'mongoose'

const placementSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  supervisor: {
    type: Schema.ObjectId,
    ref: 'User',
    default: null
  },
  companyName: {
    type: String,
    default: null
  },
  companyEmail: {
    type: String,
    default: null
  },
  companyPhone: {
    type: String,
    default: null
  },
  companyAddress: {
    type: String,
    default: null
  },
  placementDepartment: {
    type: String,
    default: null
  },
  periodOfAttachmentFrom: {
    type: Date,
    default: null
  },
  periodOfAttachmentTo: {
    type: Date,
    default: null
  },
  noOfWeeks: {
    type: Number,
    default: null
  },
  industrySupervisorName: {
    type: String,
    default: null
  },
  industrySupervisorEmail: {
    type: String,
    default: null
  },
  industrySupervisorPhone: {
    type: String,
    default: null
  },
  totalAllowance: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

placementSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      supervisor: this.supervisor,
      companyName: this.companyName,
      companyEmail: this.companyEmail,
      companyPhone: this.companyPhone,
      companyAddress: this.companyAddress,
      placementDepartment: this.placementDepartment,
      periodOfAttachmentFrom: this.periodOfAttachmentFrom,
      periodOfAttachmentTo: this.periodOfAttachmentTo,
      noOfWeeks: this.noOfWeeks,
      industrySupervisorName: this.industrySupervisorName,
      industrySupervisorEmail: this.industrySupervisorEmail,
      industrySupervisorPhone: this.industrySupervisorPhone,
      totalAllowance: this.totalAllowance,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Placement', placementSchema)

export const schema = model.schema
export default model
