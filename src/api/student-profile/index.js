import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export StudentProfile, { schema } from './model'

const router = new Router()
const { matriculationNumber, department, sessionYear } = schema.tree

/**
 * @api {post} /student-profiles Create student profile
 * @apiName CreateStudentProfile
 * @apiGroup StudentProfile
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam matriculationNumber Student profile's matriculationNumber.
 * @apiParam department Student profile's department.
 * @apiParam sessionYear Student profile's sessionYear.
 * @apiSuccess {Object} studentProfile Student profile's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Student profile not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ matriculationNumber, department, sessionYear }),
  create)

/**
 * @api {get} /student-profiles Retrieve student profiles
 * @apiName RetrieveStudentProfiles
 * @apiGroup StudentProfile
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} studentProfiles List of student profiles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /student-profiles/:id Retrieve student profile
 * @apiName RetrieveStudentProfile
 * @apiGroup StudentProfile
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} studentProfile Student profile's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Student profile not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /student-profiles/:id Update student profile
 * @apiName UpdateStudentProfile
 * @apiGroup StudentProfile
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam matriculationNumber Student profile's matriculationNumber.
 * @apiParam department Student profile's department.
 * @apiParam sessionYear Student profile's sessionYear.
 * @apiSuccess {Object} studentProfile Student profile's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Student profile not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ matriculationNumber, department, sessionYear }),
  update)

/**
 * @api {delete} /student-profiles/:id Delete student profile
 * @apiName DeleteStudentProfile
 * @apiGroup StudentProfile
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Student profile not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
