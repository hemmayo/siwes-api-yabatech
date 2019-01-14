import { School } from '.'

let school

beforeEach(async () => {
  school = await School.create({ title: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = school.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(school.id)
    expect(view.title).toBe(school.title)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = school.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(school.id)
    expect(view.title).toBe(school.title)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
