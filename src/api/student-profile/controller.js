import { success, notFound, authorOrAdmin } from '../../services/response/'
import { StudentProfile } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  StudentProfile.create({ ...body, user })
    .then((studentProfile) => studentProfile.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  StudentProfile.find(query, select, cursor)
    .populate('user')
    .then((studentProfiles) => studentProfiles.map((studentProfile) => studentProfile.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  StudentProfile.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((studentProfile) => studentProfile ? studentProfile.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  StudentProfile.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((studentProfile) => studentProfile ? Object.assign(studentProfile, body).save() : null)
    .then((studentProfile) => studentProfile ? studentProfile.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  StudentProfile.findById(params.id)
    .then(notFound(res))
    .then((studentProfile) => studentProfile ? studentProfile.remove() : null)
    .then(success(res, 204))
    .catch(next)
