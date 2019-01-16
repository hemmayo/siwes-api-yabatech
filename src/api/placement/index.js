import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Placement, { schema } from './model'

const router = new Router()
const { supervisor, companyName, companyEmail, companyPhone, companyAddress, placementDepartment, periodOfAttachmentFrom, periodOfAttachmentTo, noOfWeeks, industrySupervisorName, industrySupervisorEmail, industrySupervisorPhone, totalAllowance } = schema.tree

/**
 * @api {post} /placements Create placement
 * @apiName CreatePlacement
 * @apiGroup Placement
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam supervisor Placement's supervisor.
 * @apiParam companyName Placement's companyName.
 * @apiParam companyEmail Placement's companyEmail.
 * @apiParam companyPhone Placement's companyPhone.
 * @apiParam companyAddress Placement's companyAddress.
 * @apiParam placementDepartment Placement's placementDepartment.
 * @apiParam periodOfAttachmentFrom Placement's periodOfAttachmentFrom.
 * @apiParam periodOfAttachmentTo Placement's periodOfAttachmentTo.
 * @apiParam noOfWeeks Placement's noOfWeeks.
 * @apiParam industrySupervisorName Placement's industrySupervisorName.
 * @apiParam industrySupervisorEmail Placement's industrySupervisorEmail.
 * @apiParam industrySupervisorPhone Placement's industrySupervisorPhone.
 * @apiParam totalAllowance Placement's totalAllowance.
 * @apiSuccess {Object} placement Placement's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Placement not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ supervisor, companyName, companyEmail, companyPhone, companyAddress, placementDepartment, periodOfAttachmentFrom, periodOfAttachmentTo, noOfWeeks, industrySupervisorName, industrySupervisorEmail, industrySupervisorPhone, totalAllowance }),
  create)

/**
 * @api {get} /placements Retrieve placements
 * @apiName RetrievePlacements
 * @apiGroup Placement
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} placements List of placements.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /placements/:id Retrieve placement
 * @apiName RetrievePlacement
 * @apiGroup Placement
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} placement Placement's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Placement not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /placements/:id Update placement
 * @apiName UpdatePlacement
 * @apiGroup Placement
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam supervisor Placement's supervisor.
 * @apiParam companyName Placement's companyName.
 * @apiParam companyEmail Placement's companyEmail.
 * @apiParam companyPhone Placement's companyPhone.
 * @apiParam companyAddress Placement's companyAddress.
 * @apiParam placementDepartment Placement's placementDepartment.
 * @apiParam periodOfAttachmentFrom Placement's periodOfAttachmentFrom.
 * @apiParam periodOfAttachmentTo Placement's periodOfAttachmentTo.
 * @apiParam noOfWeeks Placement's noOfWeeks.
 * @apiParam industrySupervisorName Placement's industrySupervisorName.
 * @apiParam industrySupervisorEmail Placement's industrySupervisorEmail.
 * @apiParam industrySupervisorPhone Placement's industrySupervisorPhone.
 * @apiParam totalAllowance Placement's totalAllowance.
 * @apiSuccess {Object} placement Placement's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Placement not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ supervisor, companyName, companyEmail, companyPhone, companyAddress, placementDepartment, periodOfAttachmentFrom, periodOfAttachmentTo, noOfWeeks, industrySupervisorName, industrySupervisorEmail, industrySupervisorPhone, totalAllowance }),
  update)

/**
 * @api {delete} /placements/:id Delete placement
 * @apiName DeletePlacement
 * @apiGroup Placement
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Placement not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
