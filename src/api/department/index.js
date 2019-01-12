import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Department, { schema } from './model'

const router = new Router()
const { title, school } = schema.tree

/**
 * @api {post} /departments Create department
 * @apiName CreateDepartment
 * @apiGroup Department
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Department's title.
 * @apiParam school Department's school.
 * @apiSuccess {Object} department Department's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Department not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title, school }),
  create)

/**
 * @api {get} /departments Retrieve departments
 * @apiName RetrieveDepartments
 * @apiGroup Department
 * @apiUse listParams
 * @apiSuccess {Object[]} departments List of departments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /departments/:id Retrieve department
 * @apiName RetrieveDepartment
 * @apiGroup Department
 * @apiSuccess {Object} department Department's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Department not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /departments/:id Update department
 * @apiName UpdateDepartment
 * @apiGroup Department
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Department's title.
 * @apiParam school Department's school.
 * @apiSuccess {Object} department Department's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Department not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title, school }),
  update)

/**
 * @api {delete} /departments/:id Delete department
 * @apiName DeleteDepartment
 * @apiGroup Department
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Department not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
