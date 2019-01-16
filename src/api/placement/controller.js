import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Placement } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Placement.create({ ...body, user })
    .then((placement) => placement.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Placement.find(query, select, cursor)
    .populate('user')
    .then((placements) => placements.map((placement) => placement.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Placement.find({ user: params.id })
    .populate('user')
    .then(notFound(res))
    .then((placement) => placement ? placement.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Placement.find({ user: params.id })
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((placement) => placement ? Object.assign(placement, body).save() : null)
    .then((placement) => placement ? placement.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Placement.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((placement) => placement ? placement.remove() : null)
    .then(success(res, 204))
    .catch(next)
