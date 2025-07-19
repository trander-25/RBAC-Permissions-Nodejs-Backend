import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import {
  JwtProvider,
  ACCESS_TOKEN_SECRET_SIGNATURE,
  REFRESH_TOKEN_SECRET_SIGNATURE
} from '~/providers/JwtProvider'
import { MOCK_USER_LEVEL_1 } from '~/models/mockDatabase-Level-1'
import { MOCK_USER_LEVEL_2 } from '~/models/mockDatabase-Level-2'
import { MOCK_USER_LEVEL_3 } from '~/models/mockDatabase-Level-3'

const login = async (req, res) => {
  try {
    if (req.body.email !== MOCK_USER_LEVEL_3.EMAIL || req.body.password !== MOCK_USER_LEVEL_3.PASSWORD) {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'Your email or password is incorrect!' })
      return
    }

    // Create JWT tokens for authenticated user
    const userInfo = {
      id: MOCK_USER_LEVEL_3.ID,
      email: MOCK_USER_LEVEL_3.EMAIL,
      // role: MOCK_ROLES_LEVEL_1.ROLE,
      role: MOCK_USER_LEVEL_3.ROLES
    }

    // Generate access and refresh tokens
    const accessToken = await JwtProvider.generateToken(
      userInfo,
      ACCESS_TOKEN_SECRET_SIGNATURE,
      // 5
      '1h'
    )

    const refreshToken = await JwtProvider.generateToken(
      userInfo,
      REFRESH_TOKEN_SECRET_SIGNATURE,
      '14 days'
    )
    // Set HTTP-only cookies for browser security
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    // Return user info and tokens
    res.status(StatusCodes.OK).json({
      ...userInfo,
      accessToken,
      refreshToken
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const logout = async (req, res) => {
  try {
    // Clear authentication cookies
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')

    res.status(StatusCodes.OK).json({ message: 'Logout API success!' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const refreshToken = async (req, res) => {
  try {
    // Method 1: Get refresh token from cookies
    const refreshTokenFromCookie = req.cookies?.refreshToken

    // Method 2: Get refresh token from request body
    const refreshTokenFromBody = req.body?.refreshToken

    // Verify refresh token
    const refreshTokenDecoded = await JwtProvider.verifyToken(
      // refreshTokenFromCookie, // Use method 1
      refreshTokenFromBody, // Use method 2
      REFRESH_TOKEN_SECRET_SIGNATURE
    )

    // Extract user info from decoded token
    const userInfo = {
      id: refreshTokenDecoded.id,
      email: refreshTokenDecoded.email,
      role: refreshTokenDecoded.role
    }

    // Generate new access token
    const accessToken = await JwtProvider.generateToken(
      userInfo,
      ACCESS_TOKEN_SECRET_SIGNATURE,
      // 5
      '1h'
    )

    // Set new access token cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    // Return new access token
    res.status(StatusCodes.OK).json({ accessToken })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Refresh token error' })
  }
}

export const userController = {
  login,
  logout,
  refreshToken
}
