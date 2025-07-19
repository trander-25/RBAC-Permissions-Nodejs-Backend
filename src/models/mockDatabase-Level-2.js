// Level 2: Role-based permissions with CRUD operations
export const MOCK_ROLES_LEVEL_2 = [
  // Client role
  {
    _id: 'role-client-sample-id-12345678',
    name: 'client',
    permissions: [
      'create_support',
      'read_support',
      'update_support',
      'delete_support'
    ]
  },
  // Moderator role
  {
    _id: 'role-moderator-sample-id-12345678',
    name: 'moderator',
    permissions: [
      // Support permissions
      'create_support',
      'read_support',
      'update_support',
      'delete_support',
      // Message permissions
      'create_messages',
      'read_messages',
      'update_messages',
      'delete_messages'
    ]
  },
  // Admin role
  {
    _id: 'role-admin-sample-id-12345678',
    name: 'admin',
    permissions: [
      // Support permissions
      'create_support',
      'read_support',
      'update_support',
      'delete_support',
      // Message permissions
      'create_messages',
      'read_messages',
      'update_messages',
      'delete_messages',
      // Admin tool permissions
      'create_admin_tools',
      'read_admin_tools',
      'update_admin_tools',
      'delete_admin_tools'
    ]
  }
]

export const MOCK_USER_LEVEL_2 = {
  ID: 'trander-sample-id-12345678',
  EMAIL: 'trander@gmail.com',
  PASSWORD: 'trander@123',
  ROLE: 'client' // Must match role name in database
}