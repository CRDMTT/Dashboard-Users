import type { User } from '../types/user'

const ROLES = ['Admin', 'Editor', 'Viewer'] as const

export function getRandomRole(): typeof ROLES[number] {
  return ROLES[Math.floor(Math.random() * ROLES.length)]
}

export function assignRandomRoles(users: User[]): User[] {
  return users.map((u) => ({
    ...u,
    role: getRandomRole(),
  }))
}

export default assignRandomRoles
