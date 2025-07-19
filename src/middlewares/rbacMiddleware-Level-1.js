import { StatusCodes } from 'http-status-codes'

// Level 1 RBAC: Single role per user
const isValidPermission = (allowedRoles) => async (req, res, next) => {
  try {
    // Step 1: JWT token already validated by authMiddleware

    // Step 2: Get user role from decoded JWT token
    const userRole = req.jwtDecoded.role

    // Step 3: Check if user role is allowed
    if (!userRole || !allowedRoles.includes(userRole)) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'You are not allowed to access this API!'
      })
      return
    }

    // Step 4: Allow request to continue
    next()
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong!' })
  }
}

export const rbacMiddleware_Level_1 = {
  isValidPermission
}