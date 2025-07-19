import { StatusCodes } from 'http-status-codes'
import { MOCK_ROLES_LEVEL_3 } from '~/models/mockDatabase-Level-3'
import { getPermissionsFromRole } from '~/utils/rbacUtils'

// Level 3 RBAC: Multiple roles with hierarchical inheritance
const isValidPermission = (requiredPermissions) => async (req, res, next) => {
  try {
    // Step 1: JWT token already validated by authMiddleware

    // Step 2: Get user roles (Level 3 supports multiple roles)
    const userRoles = req.jwtDecoded.role

    // Step 3: Validate user has at least one role
    if (!Array.isArray(userRoles) || userRoles.length === 0) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'Your role have some problems!'
      })
      return
    }

    // Step 4: Collect all permissions from user roles (including inherited)
    let userPermissions = new Set()
    for (const roleName of userRoles) {
      const rolePermissions = await getPermissionsFromRole(roleName)
      rolePermissions.forEach(i => userPermissions.add(i))
    }

    // Step 5: Check if user has all required permissions
    const hasPermission = requiredPermissions?.every(i => userPermissions.has(i))
    if (!hasPermission) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'You do not have permission for this API!'
      })
      return
    }
    // Step 6: Allow request to continue
    next()
  } catch (error) {
    // console.log('Error from rbacMiddleware_Level_3: ', error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong!' })
  }
}

export const rbacMiddleware_Level_3 = {
  isValidPermission
}