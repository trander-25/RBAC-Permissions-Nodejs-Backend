import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { dashboardController } from '~/controllers/dashboardController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { MOCK_ROLES_LEVEL_1 } from '~/models/mockDatabase-Level-1'
import { MOCK_ROLES_LEVEL_2 } from '~/models/mockDatabase-Level-2'
import { rbacMiddleware_Level_1 } from '~/middlewares/rbacMiddleware-Level-1'
import { rbacMiddleware_Level_2 } from '~/middlewares/rbacMiddleware-Level-2'
import { rbacMiddleware_Level_3 } from '~/middlewares/rbacMiddleware-Level-3'

const Router = express.Router()

Router.route('/access')
  .get(authMiddleware.isAuthorized, dashboardController.access)

// Requires admin or moderator permission
Router.route('/messages')
  .get(
    authMiddleware.isAuthorized,

    // rbacMiddleware_Level_1.isValidPermission([
    //   MOCK_ROLES_LEVEL_1.ADMIN,
    //   MOCK_ROLES_LEVEL_1.MODERATOR
    // ]),

    // rbacMiddleware_Level_2.isValidPermission(['read_messages']), // read ung voi api get

    rbacMiddleware_Level_3.isValidPermission(['read_messages']), // Read permission for GET
    (req, res) => {
      res.status(StatusCodes.OK).json({ message: 'Get API /messages successully!' })
    }
  )
// Requires admin permission
Router.route('/admin-tools')
  .get(
    authMiddleware.isAuthorized,

    // rbacMiddleware_Level_1.isValidPermission([
    //   MOCK_ROLES_LEVEL_1.ADMIN
    // ]),

    // rbacMiddleware_Level_2.isValidPermission(['read_admin_tools']),

    rbacMiddleware_Level_3.isValidPermission(['read_admin_tools']),
    (req, res) => {
      res.status(StatusCodes.OK).json({ message: 'Get API /admin-tools successully!' })
    }
  )

export const dashboardRoute = Router
