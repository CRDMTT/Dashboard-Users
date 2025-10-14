import { renderHook, act } from '@testing-library/react'
import useSearch from '../useSearch'

type MinimalUser = {
  id: string
  name: string
  email?: string
  role?: string
}

const makeUsers = (n: number): MinimalUser[] =>
  Array.from({ length: n }, (_, i) => ({ id: String(i + 1), name: `User ${i + 1}`, email: `${i + 1}@example.test`, role: i % 2 === 0 ? 'Admin' : 'Viewer' }))

describe('useSearch', () => {
  it('initial state and query updates', () => {
    const users = makeUsers(3)
  const { result } = renderHook(() => useSearch(users as unknown as any, { debounceMs: 10 }))

    expect(result.current.query).toBe('')
    expect(result.current.activeRole).toBeNull()
    act(() => result.current.setQuery('User 2'))
    expect(result.current.query).toBe('User 2')
  })

  it('debounces query and filters users', async () => {
    jest.useFakeTimers()
    const users = makeUsers(5)
  const { result } = renderHook(() => useSearch(users as unknown as any, { debounceMs: 200 }))

    act(() => result.current.setQuery('User 3'))
    // not yet debounced
    expect(result.current.debouncedQuery).toBe('')

    act(() => jest.advanceTimersByTime(200))
    expect(result.current.debouncedQuery).toBe('User 3')
    // filteredUsers should contain the matching user
    expect(result.current.filteredUsers.some((u) => u.name === 'User 3')).toBe(true)

    jest.useRealTimers()
  })

  it('toggles role filter and resetFilters works', () => {
    const users = makeUsers(4)
  const { result } = renderHook(() => useSearch(users as unknown as any))

    // toggle to Admin
    act(() => result.current.toggleRole('Admin'))
    expect(result.current.activeRole).toBe('Admin')
    // filteredUsers should only have admins
    expect(result.current.filteredUsers.every((u) => u.role === 'Admin')).toBe(true)

    act(() => result.current.resetFilters())
    expect(result.current.query).toBe('')
    expect(result.current.activeRole).toBeNull()
  })
})
