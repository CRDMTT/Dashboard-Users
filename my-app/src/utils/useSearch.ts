import { useState, useCallback, useMemo } from 'react'
import type { User } from '../types/user'
import useDebouncedValue from './useDebouncedValue'
import filterUsers from './filterUsers'

type UseSearchOptions = {
  debounceMs?: number
}

export default function useSearch(users: User[], opts: UseSearchOptions = {}) {
  const { debounceMs = 250 } = opts
  const [query, setQuery] = useState<string>('')
  const [activeRole, setActiveRole] = useState<string | null>(null)

  const toggleRole = useCallback((role: string) => setActiveRole((cur) => (cur === role ? null : role)), [])

  const debouncedQuery = useDebouncedValue(query, debounceMs)

  const filteredUsers = useMemo(() => {
    return filterUsers(users, { query: debouncedQuery, activeRole })
  }, [users, debouncedQuery, activeRole])

  const resetFilters = useCallback(() => {
    setQuery('')
    setActiveRole(null)
  }, [])

  return {
    query,
    setQuery,
    debouncedQuery,
    activeRole,
    toggleRole,
    resetFilters,
    filteredUsers,
  }
}
