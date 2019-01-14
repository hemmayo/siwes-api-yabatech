import { success, notFound } from '../../services/response/'
import { School } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  School.create(body)
    .then((school) => school.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  School.find(query, select, cursor)
    .then((schools) => schools.map((school) => school.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  School.findById(params.id)
    .then(notFound(res))
    .then((school) => school ? school.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  School.findById(params.id)
    .then(notFound(res))
    .then((school) => school ? Object.assign(school, body).save() : null)
    .then((school) => school ? school.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  School.findById(params.id)
    .then(notFound(res))
    .then((school) => school ? school.remove() : null)
    .then(success(res, 204))
    .catch(next)
