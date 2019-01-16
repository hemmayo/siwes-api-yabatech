import { Placement } from '.'
import { User } from '../user'

let user, placement

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  placement = await Placement.create({ user, supervisor: 'test', companyName: 'test', companyEmail: 'test', companyPhone: 'test', companyAddress: 'test', placementDepartment: 'test', periodOfAttachmentFrom: 'test', periodOfAttachmentTo: 'test', noOfWeeks: 'test', industrySupervisorName: 'test', industrySupervisorEmail: 'test', industrySupervisorPhone: 'test', totalAllowance: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = placement.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(placement.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.supervisor).toBe(placement.supervisor)
    expect(view.companyName).toBe(placement.companyName)
    expect(view.companyEmail).toBe(placement.companyEmail)
    expect(view.companyPhone).toBe(placement.companyPhone)
    expect(view.companyAddress).toBe(placement.companyAddress)
    expect(view.placementDepartment).toBe(placement.placementDepartment)
    expect(view.periodOfAttachmentFrom).toBe(placement.periodOfAttachmentFrom)
    expect(view.periodOfAttachmentTo).toBe(placement.periodOfAttachmentTo)
    expect(view.noOfWeeks).toBe(placement.noOfWeeks)
    expect(view.industrySupervisorName).toBe(placement.industrySupervisorName)
    expect(view.industrySupervisorEmail).toBe(placement.industrySupervisorEmail)
    expect(view.industrySupervisorPhone).toBe(placement.industrySupervisorPhone)
    expect(view.totalAllowance).toBe(placement.totalAllowance)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = placement.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(placement.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.supervisor).toBe(placement.supervisor)
    expect(view.companyName).toBe(placement.companyName)
    expect(view.companyEmail).toBe(placement.companyEmail)
    expect(view.companyPhone).toBe(placement.companyPhone)
    expect(view.companyAddress).toBe(placement.companyAddress)
    expect(view.placementDepartment).toBe(placement.placementDepartment)
    expect(view.periodOfAttachmentFrom).toBe(placement.periodOfAttachmentFrom)
    expect(view.periodOfAttachmentTo).toBe(placement.periodOfAttachmentTo)
    expect(view.noOfWeeks).toBe(placement.noOfWeeks)
    expect(view.industrySupervisorName).toBe(placement.industrySupervisorName)
    expect(view.industrySupervisorEmail).toBe(placement.industrySupervisorEmail)
    expect(view.industrySupervisorPhone).toBe(placement.industrySupervisorPhone)
    expect(view.totalAllowance).toBe(placement.totalAllowance)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
