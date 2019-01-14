import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { School } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, school

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  school = await School.create({})
})

test('POST /schools 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, title: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
})

test('POST /schools 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /schools 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /schools 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /schools/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${school.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(school.id)
})

test('GET /schools/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /schools/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${school.id}`)
    .send({ access_token: adminSession, title: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(school.id)
  expect(body.title).toEqual('test')
})

test('PUT /schools/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${school.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /schools/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${school.id}`)
  expect(status).toBe(401)
})

test('PUT /schools/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, title: 'test' })
  expect(status).toBe(404)
})

test('DELETE /schools/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${school.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /schools/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${school.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /schools/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${school.id}`)
  expect(status).toBe(401)
})

test('DELETE /schools/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
