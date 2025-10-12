import { UIInput, UIButton } from '../components/ui'
import { useState, useEffect, useMemo, useRef } from 'react'
import UserTable from '../components/users/UserTable'
import type { User } from '../types/user'
import mapApiDataToUsers from '../utils/mapApiDataToUsers'
import filterUsers from '../utils/filterUsers'
import { useFetchRecord } from '../api/apiClient'
import { DEFAULT_RECORD_ID } from '../api/config'
import assignRandomRoles from '../utils/assignRandomRoles'

type Props = {
  recordId?: string | null
}

export default function Dashboard({ recordId }: Props) {
  const [activeRole, setActiveRole] = useState<string | null>(null)
  const toggleRole = (role: string) => setActiveRole((cur) => (cur === role ? null : role))
  const { data: apiData, loading: apiLoading, error: apiError, lastUrl } = useFetchRecord(recordId)
  const [users, setUsers] = useState<User[]>([])
  const [query, setQuery] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')
  const debounceRef = useRef<number | null>(null)

  useEffect(() => {
    if (!apiData) return
    const mapped = mapApiDataToUsers(apiData)
    setUsers(assignRandomRoles(mapped))
  }, [apiData])

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => setDebouncedQuery(query.trim()), 250)
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
    }
  }, [query])

  const filteredUsers = useMemo(() => filterUsers(users, { query: debouncedQuery, activeRole }), [users, debouncedQuery, activeRole])
  const hasApiUsers = users.length > 0
  const resetFilters = () => {
    setQuery('')
    setDebouncedQuery('')
    setActiveRole(null)
  }

  return (
    <div className="section">
      <div className="container-fluid container-lg">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="searchbox mb-3 mb-lg-0">
              <UIInput
                placeholder="Search user"
                variant="search"
                name="search"
                type="search"
                aria-label="Search users"
                value={query}
                onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-7">
            <div className="inline-buttons d-flex align-items-center" style={{ gap: '10px' }}>
              <div className='pr-2' style={{ width: 'fit-content' }}>
                <p className="mb-0">Filter by role:</p>
              </div>
              <div className='d-flex' role="toolbar" aria-label="Filter by role" style={{ gap: '5px' }}>
                <UIButton variant="secondary" aria-pressed={activeRole === 'Admin'} onClick={() => toggleRole('Admin')}>Admin</UIButton>
                <UIButton variant="secondary" aria-pressed={activeRole === 'Editor'} onClick={() => toggleRole('Editor')}>Editor</UIButton>
                <UIButton variant="secondary" aria-pressed={activeRole === 'Viewer'} onClick={() => toggleRole('Viewer')}>Viewer</UIButton>
              </div>
            </div>
          </div>

          <div className="col-12 mt-4">
            <div className="grid-container">
              {apiLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border" role="status" aria-hidden="true"></div>
                  <div className="mt-2">Loading users…</div>
                </div>
              ) : (
                <>
                  {filteredUsers.length === 0 ? (
                    <div className="pb-4">
                      <div className="alert alert-info" role="status">
                        {apiError ? (
                          <div>
                            <strong>API Error:</strong> {apiError.message} (status: {apiError.status ?? 'unknown'})
                          </div>
                        ) : hasApiUsers ? (
                          <div>
                            <strong>Invalid search</strong>
                            <div className="mt-2 small text-muted">No results found for the applied search or filters.</div>
                            {debouncedQuery ? <div className="mt-1 small text-muted">Query: <code>{debouncedQuery}</code></div> : null}
                            {activeRole ? <div className="mt-1 small text-muted">Role filter: <code>{activeRole}</code></div> : null}
                            <div className="mt-3">
                              <UIButton variant="secondary" onClick={resetFilters}>Reset filters</UIButton>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <strong>No users returned by the API.</strong>
                            <div className="mt-2 small text-muted">Requested URL: <code>{lastUrl}</code></div>
                            <div className="mt-1 small text-muted">Resolved record id: <code>{recordId ?? DEFAULT_RECORD_ID ?? 'none'}</code></div>
                            <div className="mt-2 small text-muted">Response preview:</div>
                            <pre style={{ maxHeight: 200, overflow: 'auto' }}>{JSON.stringify(apiData, null, 2)}</pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <UserTable
                      users={filteredUsers}
                      onEdit={(id) => alert(`Edit ${id}`)}
                      onDelete={(id) => alert(`Delete ${id}`)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
