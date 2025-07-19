import { MOCK_ROLES_LEVEL_3 } from '~/models/mockDatabase-Level-3'

// Get all permissions for a role including inherited permissions
export const getPermissionsFromRole = async (roleName) => {
  // TODO: Replace with actual database query
  const role = MOCK_ROLES_LEVEL_3.find(i => i.name === roleName)
  // Return empty array if role not found
  if (!role) return []
  // Use Set for O(1) operations vs O(n) for arrays
  let permissions = new Set(role.permissions)

  // Process role inheritance
  if (Array.isArray(role.inherits) && role.inherits.length > 0) {
    for (const inheritedRoleName of role.inherits) {
      // Recursively get inherited permissions
      const inheritedPermissions = await getPermissionsFromRole(inheritedRoleName)
      inheritedPermissions.forEach(i => permissions.add(i))
    }
  }

  // Convert Set to Array
  return Array.from(permissions)
}