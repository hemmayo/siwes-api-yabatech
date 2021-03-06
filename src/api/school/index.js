import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export School, { schema } from './model'

const router = new Router()
const { title } = schema.tree

/**
 * @api {post} /schools Create school
 * @apiName CreateSchool
 * @apiGroup School
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title School's title.
 * @apiSuccess {Object} school School's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 School not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title }),
  create)

/**
 * @api {get} /schools Retrieve schools
 * @apiName RetrieveSchools
 * @apiGroup School
 * @apiUse listParams
 * @apiSuccess {Object[]} schools List of schools.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /schools/:id Retrieve school
 * @apiName RetrieveSchool
 * @apiGroup School
 * @apiSuccess {Object} school School's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 School not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /schools/:id Update school
 * @apiName UpdateSchool
 * @apiGroup School
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title School's title.
 * @apiSuccess {Object} school School's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 School not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title }),
  update)

/**
 * @api {delete} /schools/:id Delete school
 * @apiName DeleteSchool
 * @apiGroup School
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 School not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
