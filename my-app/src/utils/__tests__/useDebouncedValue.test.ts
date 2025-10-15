import { renderHook, act } from '@testing-library/react'
import useDebouncedValue from '../useDebouncedValue'

describe('useDebouncedValue', () => {
  it('debounces value changes', async () => {
    jest.useFakeTimers()
    const { result, rerender } = renderHook((props: { value: string }) => useDebouncedValue(props.value, 200), {
      initialProps: { value: 'a' }
    })

    expect(result.current).toBe('a')

    // change to b, should not update immediately
    rerender({ value: 'b' })
    expect(result.current).toBe('a')

    // advance timers
    act(() => {
      jest.advanceTimersByTime(210)
    })

    expect(result.current).toBe('b')

    jest.useRealTimers()
  })
})
