import { renderHook, act } from '@testing-library/react'
import { useUsersList } from '../useUsersList'

type MinimalUser = {
  id: string
  name: string
  email?: string
  role?: string
}

const makeUsers = (n: number): MinimalUser[] => Array.from({ length: n }, (_, i) => ({ id: String(i + 1), name: `User ${i + 1}`, email: `${i + 1}@example.test`, role: 'Viewer' }))

describe('useUsersList', () => {
  it('paginates items and respects pageSize', () => {
    const users = makeUsers(25)
  const { result } = renderHook(() => (useUsersList as any)({ items: users, pageSize: 10, loading: false, hasApiData: true }))

    expect(result.current.totalPages).toBe(3)
    expect(result.current.currentItems.length).toBe(10)
    expect(result.current.startIndex).toBe(0)
    expect(result.current.endIndex).toBe(10)

    act(() => result.current.goNext())
    expect(result.current.page).toBe(2)
    expect(result.current.currentItems[0].id).toBe('11')
  })

  it('shows spinner when loading and enforces min display time', async () => {
  jest.useFakeTimers()
  const users: MinimalUser[] = []
  const { result, rerender } = renderHook((props: { loading: boolean }) => (useUsersList as any)({ items: users, pageSize: 10, loading: props.loading, hasApiData: true }), { initialProps: { loading: true } })

    // result.current is the hook return value; assert spinner is showing initially
    expect((result.current as any).isDisplayingSpinner).toBe(true)

    // stop loading, but spinner should remain for min duration (480ms)
    rerender({ loading: false })
    act(() => jest.advanceTimersByTime(100))
    expect((result.current as any).isDisplayingSpinner).toBe(true)
    act(() => jest.advanceTimersByTime(400))
    // allow effects to run
    expect((result.current as any).isDisplayingSpinner).toBe(false)

    jest.useRealTimers()
  })
})
