import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

const roles = ['student', 'supervisor', 'admin']

const userSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  matriculationNumber: {
    type: String,
    unique: true,
    uppercase: true,
    default: null
  },
  phone: {
    type: Number,
    default: null
  },
  phoneVerification: {
    type: String,
    enum: ['none', 'verified'],
    default: 'none'
  },
  name: {
    type: String,
    index: true,
    trim: true,
    required: true
  },
  homeAddress: {
    type: String,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  state: {
    type: String,
    default: null
  },
  country: {
    type: String,
    default: 'nga'
  },
  department: {
    type: Schema.ObjectId,
    ref: 'Department',
    required: true
  },
  role: {
    type: String,
    enum: roles,
    default: 'student'
  },
  picture: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

userSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?d=retro&s=200`
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1')
  }

  return email
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  view (full) {
    let view = {}
    let fields = ['id', 'name', 'picture', 'matriculationNumber', 'state', 'country']

    if (full) {
      fields = [...fields, 'email', 'phone', 'homeAddress', 'city', 'phoneVerification', 'createdAt']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }
}

userSchema.statics = {
  roles
}

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name', 'phone', 'matriculationNumber'] })

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
