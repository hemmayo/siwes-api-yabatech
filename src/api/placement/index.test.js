import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Placement } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, adminSession, placement

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  placement = await Placement.create({ user })
})

test('POST /placements 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, supervisor: 'test', companyName: 'test', companyEmail: 'test', companyPhone: 'test', companyAddress: 'test', placementDepartment: 'test', periodOfAttachmentFrom: 'test', periodOfAttachmentTo: 'test', noOfWeeks: 'test', industrySupervisorName: 'test', industrySupervisorEmail: 'test', industrySupervisorPhone: 'test', totalAllowance: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.supervisor).toEqual('test')
  expect(body.companyName).toEqual('test')
  expect(body.companyEmail).toEqual('test')
  expect(body.companyPhone).toEqual('test')
  expect(body.companyAddress).toEqual('test')
  expect(body.placementDepartment).toEqual('test')
  expect(body.periodOfAttachmentFrom).toEqual('test')
  expect(body.periodOfAttachmentTo).toEqual('test')
  expect(body.noOfWeeks).toEqual('test')
  expect(body.industrySupervisorName).toEqual('test')
  expect(body.industrySupervisorEmail).toEqual('test')
  expect(body.industrySupervisorPhone).toEqual('test')
  expect(body.totalAllowance).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /placements 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /placements 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /placements 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /placements 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /placements/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${placement.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(placement.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /placements/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${placement.id}`)
  expect(status).toBe(401)
})

test('GET /placements/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /placements/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${placement.id}`)
    .send({ access_token: userSession, supervisor: 'test', companyName: 'test', companyEmail: 'test', companyPhone: 'test', companyAddress: 'test', placementDepartment: 'test', periodOfAttachmentFrom: 'test', periodOfAttachmentTo: 'test', noOfWeeks: 'test', industrySupervisorName: 'test', industrySupervisorEmail: 'test', industrySupervisorPhone: 'test', totalAllowance: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(placement.id)
  expect(body.supervisor).toEqual('test')
  expect(body.companyName).toEqual('test')
  expect(body.companyEmail).toEqual('test')
  expect(body.companyPhone).toEqual('test')
  expect(body.companyAddress).toEqual('test')
  expect(body.placementDepartment).toEqual('test')
  expect(body.periodOfAttachmentFrom).toEqual('test')
  expect(body.periodOfAttachmentTo).toEqual('test')
  expect(body.noOfWeeks).toEqual('test')
  expect(body.industrySupervisorName).toEqual('test')
  expect(body.industrySupervisorEmail).toEqual('test')
  expect(body.industrySupervisorPhone).toEqual('test')
  expect(body.totalAllowance).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /placements/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${placement.id}`)
    .send({ access_token: anotherSession, supervisor: 'test', companyName: 'test', companyEmail: 'test', companyPhone: 'test', companyAddress: 'test', placementDepartment: 'test', periodOfAttachmentFrom: 'test', periodOfAttachmentTo: 'test', noOfWeeks: 'test', industrySupervisorName: 'test', industrySupervisorEmail: 'test', industrySupervisorPhone: 'test', totalAllowance: 'test' })
  expect(status).toBe(401)
})

test('PUT /placements/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${placement.id}`)
  expect(status).toBe(401)
})

test('PUT /placements/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, supervisor: 'test', companyName: 'test', companyEmail: 'test', companyPhone: 'test', companyAddress: 'test', placementDepartment: 'test', periodOfAttachmentFrom: 'test', periodOfAttachmentTo: 'test', noOfWeeks: 'test', industrySupervisorName: 'test', industrySupervisorEmail: 'test', industrySupervisorPhone: 'test', totalAllowance: 'test' })
  expect(status).toBe(404)
})

test('DELETE /placements/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${placement.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /placements/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${placement.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /placements/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${placement.id}`)
  expect(status).toBe(401)
})

test('DELETE /placements/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
