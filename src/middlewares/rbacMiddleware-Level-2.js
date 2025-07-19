import { StatusCodes } from 'http-status-codes'
import { MOCK_ROLES_LEVEL_2 } from '~/models/mockDatabase-Level-2'

// Level 2 RBAC: Permission-based access control
const isValidPermission = (requiredPermissions) => async (req, res, next) => {
  try {
    // Step 1: JWT token already validated by authMiddleware

    // Step 2: Get user role from decoded JWT token
    const userRole = req.jwtDecoded.role

    // Step 3: Validate role exists
    if (!userRole) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'Your role have some problems!'
      })
      return
    }

    // Step 4: Get full role data from database
    const fullUserRole = MOCK_ROLES_LEVEL_2.find(i => i.name === userRole)
    if (!fullUserRole) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'Your role not exists!'
      })
      return
    }

    // Step 5: Check if user has all required permissions
    const hasPermission = requiredPermissions?.every(i => fullUserRole.permissions.includes(i))
    if (!hasPermission) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'You do not have permission for this API!'
      })
      return
    }
    // Step 6: Allow request to continue
    next()
  } catch (error) {
    // console.log('Error from rbacMiddleware_Level_2: ', error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong!' })
  }
}

export const rbacMiddleware_Level_2 = {
  isValidPermission
}