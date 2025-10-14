import filterUsers from '../filterUsers'

type MinimalUser = {
  id: string
  name: string
  email?: string
  role?: string
}

const users: MinimalUser[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.test', role: 'Admin' },
  { id: '2', name: 'Bob Lee', email: 'bob@example.test', role: 'Viewer' },
  { id: '3', name: 'Charlie', email: 'charlie@company.test', role: 'Viewer' },
]

describe('filterUsers', () => {
  it('returns all users when no filters provided', () => {
    const out = filterUsers(users as any)
    expect(out.length).toBe(3)
  })

  it('filters by query matching name or email (case-insensitive)', () => {
    const out = filterUsers(users as any, { query: 'alice' })
    expect(out).toHaveLength(1)
    expect(out[0].id).toBe('1')

    const out2 = filterUsers(users as any, { query: 'COMPANY' })
    expect(out2).toHaveLength(1)
    expect(out2[0].id).toBe('3')
  })

  it('filters by activeRole', () => {
    const out = filterUsers(users as any, { activeRole: 'Viewer' })
    expect(out).toHaveLength(2)
    expect(out.map((u) => u.id).sort()).toEqual(['2', '3'])
  })

  it('returns empty array for empty input', () => {
    expect(filterUsers([], { query: 'x' })).toEqual([])
  })
})
