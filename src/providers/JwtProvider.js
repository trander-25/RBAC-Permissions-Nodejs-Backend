import JWT from 'jsonwebtoken'

/**
 * Function to create a token - Requires 3 input parameters
 * userInfo: Information to be attached to the token
 * secretSignature: Secret signature (random string) on this document, this can be called privateKey
 * tokenLife: Token's lifespan
 */
const generateToken = async (userInfo, secretSignature, tokenLife) => {
  try {
    return JWT.sign(userInfo, secretSignature, { algorithm: 'HS256', expiresIn: tokenLife })
  } catch (error) { throw new Error(error) }
}

// Verify JWT token signature
const verifyToken = async (token, secretSignature) => {
  try {
    return JWT.verify(token, secretSignature)
  } catch (error) { throw new Error(error) }
}


// TODO: Move to environment variables for production security
export const ACCESS_TOKEN_SECRET_SIGNATURE = 'TRANDERit4HeVD05WaXXI9V3JnwKEY'
export const REFRESH_TOKEN_SECRET_SIGNATURE = 'TRANDERiopVn2Hg1jG75MUi6205KEY'

export const JwtProvider = {
  generateToken,
  verifyToken
}