// Level 1: Simple role-based permissions
export const MOCK_ROLES_LEVEL_1 = {
  CLIENT: 'client',
  MODERATOR: 'moderator',
  ADMIN: 'admin'
}

export const MOCK_USER_LEVEL_1 = {
  ID: 'trander-sample-id-12345678',
  EMAIL: 'trander@gmail.com',
  PASSWORD: 'trander@123',
  ROLE: MOCK_ROLES_LEVEL_1.MODERATOR // Single role assignment
}