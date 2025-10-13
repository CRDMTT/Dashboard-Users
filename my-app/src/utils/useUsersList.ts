import { useEffect, useMemo, useRef, useState } from 'react'
import type { User } from '../types/user'

type UseUsersListOptions = {
  items: User[]
  pageSize?: number
  loading?: boolean
  hasApiData?: boolean
  // keys that when changed should reset the page (e.g., query, activeRole)
  resetKeys?: Array<string | number | null | undefined>
}

export function useUsersList({ items, pageSize = 10, loading = false, hasApiData = true, resetKeys = [] }: UseUsersListOptions) {
  const [page, setPage] = useState(1)

  // Spinner management
  const [showSpinner, setShowSpinner] = useState(false)
  const spinnerStartRef = useRef<number | null>(null)
  const spinnerShouldBeVisible = loading || (!hasApiData && items.length === 0)

  useEffect(() => {
    const MIN_SPINNER_MS = 480
    let timeoutId: number | undefined
    if (spinnerShouldBeVisible) {
      spinnerStartRef.current = Date.now()
      setShowSpinner(true)
    } else {
      const start = spinnerStartRef.current
      if (!start) {
        setShowSpinner(false)
      } else {
        const elapsed = Date.now() - start
        const remaining = Math.max(0, MIN_SPINNER_MS - elapsed)
        if (remaining > 0) {
          timeoutId = window.setTimeout(() => setShowSpinner(false), remaining)
        } else {
          setShowSpinner(false)
        }
        spinnerStartRef.current = null
      }
    }
    return () => { if (timeoutId) window.clearTimeout(timeoutId) }
  }, [spinnerShouldBeVisible])

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))

  // Reset page when relevant keys change
  useEffect(() => { setPage(1) }, [JSON.stringify(resetKeys)])

  useEffect(() => { if (page > totalPages) setPage(totalPages) }, [page, totalPages])

  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, items.length)

  const currentItems = useMemo(() => items.slice(startIndex, endIndex), [items, startIndex, endIndex])

  return {
    page,
    setPage,
    totalPages,
    startIndex,
    endIndex,
    currentItems,
    isDisplayingSpinner: showSpinner,
    goNext: () => setPage((p) => Math.min(totalPages, p + 1)),
    goPrev: () => setPage((p) => Math.max(1, p - 1)),
    resetPage: () => setPage(1),
  }
}

export type UseUsersListReturn = ReturnType<typeof useUsersList>
