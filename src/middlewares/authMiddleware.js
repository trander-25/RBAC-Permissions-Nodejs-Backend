import { StatusCodes } from 'http-status-codes'
import {
  JwtProvider,
  ACCESS_TOKEN_SECRET_SIGNATURE,
  REFRESH_TOKEN_SECRET_SIGNATURE
} from '~/providers/JwtProvider'

// JWT authentication middleware - supports both localStorage and Cookie methods
const isAuthorized = async (req, res, next) => {
  // Method 1: Get token from cookies
  const accessTokenFromCookie = req.cookies.accessToken
  // console.log('🚀 ~ isAuthorized ~ accessTokenFromCookie:', accessTokenFromCookie)
  if (!accessTokenFromCookie) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' })
    return
  }

  // Method 2: Get token from authorization header
  const accessTokenFromHeader = req.headers.authorization
  // console.log('🚀 ~ isAuthorized ~ accessTokenFromHeader:', accessTokenFromHeader)
  if (!accessTokenFromHeader) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' })
    return
  }

  try {
    // Step 1: Verify token validity
    const accessTokenDecoded = await JwtProvider.verifyToken(
      accessTokenFromCookie, // Use method 1
      // accessTokenFromHeader.substring('Bearer '.length), // Use method 2
      ACCESS_TOKEN_SECRET_SIGNATURE
    )

    // Step 2: Store decoded token for downstream middleware
    req.jwtDecoded = accessTokenDecoded

    // Step 3: Continue to next middleware
    next()
  } catch (error) {
    // Error case 1: Token expired - return 410 to trigger refresh
    if (error.message?.includes('jwt expired')) {
      res.status(StatusCodes.GONE).json({ message: 'Need to refresh' })
      return
    }

    // Error case 2: Invalid token - return 401 for logout
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Please login' })
  }
}

export const authMiddleware = {
  isAuthorized
}