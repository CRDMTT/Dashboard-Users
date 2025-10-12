import type { User } from '../types/user'

export type FilterOptions = {
  query?: string
  activeRole?: string | null
}

export function filterUsers(users: User[], opts: FilterOptions = {}): User[] {
  const q = (opts.query || '').trim().toLowerCase()
  const role = opts.activeRole

  return users.filter((u) => {
    if (role && u.role !== role) return false

    if (!q) return true

    const fields = [u.name, u.email, u.phone || '', u.jobTitle || '', u.companyName || '', u.username || '', u.location || '', u.ipAddress || '']
    return fields.some((f) => (f || '').toLowerCase().includes(q))
  })
}

export default filterUsers
