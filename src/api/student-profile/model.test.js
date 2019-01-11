import { StudentProfile } from '.'
import { User } from '../user'

let user, studentProfile

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  studentProfile = await StudentProfile.create({ user, matriculationNumber: 'test', department: 'test', sessionYear: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = studentProfile.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(studentProfile.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.matriculationNumber).toBe(studentProfile.matriculationNumber)
    expect(view.department).toBe(studentProfile.department)
    expect(view.sessionYear).toBe(studentProfile.sessionYear)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = studentProfile.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(studentProfile.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.matriculationNumber).toBe(studentProfile.matriculationNumber)
    expect(view.department).toBe(studentProfile.department)
    expect(view.sessionYear).toBe(studentProfile.sessionYear)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
