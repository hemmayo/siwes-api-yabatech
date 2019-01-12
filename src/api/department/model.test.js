import { Department } from '.'

let department

beforeEach(async () => {
  department = await Department.create({ title: 'test', school: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = department.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(department.id)
    expect(view.title).toBe(department.title)
    expect(view.school).toBe(department.school)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = department.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(department.id)
    expect(view.title).toBe(department.title)
    expect(view.school).toBe(department.school)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
