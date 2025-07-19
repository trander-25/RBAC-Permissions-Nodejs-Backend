// Level 3: Multiple roles with hierarchical inheritance
export const MOCK_ROLES_LEVEL_3 = [
  // Client role
  {
    _id: 'role-client-sample-id-12345678',
    name: 'client',
    permissions: [
      'create_support',
      'read_support',
      'update_support',
      'delete_support'
    ],
    inherits: [] // No inheritance
  },
  // Moderator role
  {
    _id: 'role-moderator-sample-id-12345678',
    name: 'moderator',
    permissions: [
      // messages
      'create_messages',
      'read_messages',
      'update_messages',
      'delete_messages'
    ],
    inherits: ['client'] // Inherits from client
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
    ],
    inherits: ['client', 'moderator'] // Inherits from client and moderator
  }
]

export const MOCK_USER_LEVEL_3 = {
  ID: 'trander-sample-id-12345678',
  EMAIL: 'trander@gmail.com',
  PASSWORD: 'trander@123',
  // User can have multiple roles (requires frontend updates for Level 3)
  // ROLES: ['client']
  // ROLES: ['moderator'],
  ROLES: ['admin']
  // ROLES: ['client', 'moderator', 'admin']
}