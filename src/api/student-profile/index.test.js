import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { StudentProfile } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, adminSession, studentProfile

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  studentProfile = await StudentProfile.create({ user })
})

test('POST /student-profiles 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, matriculationNumber: 'test', department: 'test', sessionYear: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.matriculationNumber).toEqual('test')
  expect(body.department).toEqual('test')
  expect(body.sessionYear).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /student-profiles 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /student-profiles 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /student-profiles 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /student-profiles/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${studentProfile.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(studentProfile.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /student-profiles/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${studentProfile.id}`)
  expect(status).toBe(401)
})

test('GET /student-profiles/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /student-profiles/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${studentProfile.id}`)
    .send({ access_token: userSession, matriculationNumber: 'test', department: 'test', sessionYear: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(studentProfile.id)
  expect(body.matriculationNumber).toEqual('test')
  expect(body.department).toEqual('test')
  expect(body.sessionYear).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /student-profiles/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${studentProfile.id}`)
    .send({ access_token: anotherSession, matriculationNumber: 'test', department: 'test', sessionYear: 'test' })
  expect(status).toBe(401)
})

test('PUT /student-profiles/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${studentProfile.id}`)
  expect(status).toBe(401)
})

test('PUT /student-profiles/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, matriculationNumber: 'test', department: 'test', sessionYear: 'test' })
  expect(status).toBe(404)
})

test('DELETE /student-profiles/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${studentProfile.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /student-profiles/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${studentProfile.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /student-profiles/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${studentProfile.id}`)
  expect(status).toBe(401)
})

test('DELETE /student-profiles/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
