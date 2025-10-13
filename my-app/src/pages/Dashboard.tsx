import { UIInput, UIButton } from '../components/ui'
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useFetchRecord, patchRecord, updateRecord } from '../api/apiClient'
import { DEFAULT_RECORD_ID } from '../api/config'
import { assignRandomRoles, filterUsers, mapApiDataToUsers, useDebouncedValue } from '../utils'
import type { User } from '../types/user'
import UsersList from '../components/users/UsersList'

type Props = {
  recordId?: string | null
  pageSize?: number
}

export default function Dashboard({ recordId }: Props) {
  const [activeRole, setActiveRole] = useState<string | null>(null)
  const toggleRole = useCallback((role: string) => setActiveRole((cur) => (cur === role ? null : role)), [])
  const { data: apiData, loading: apiLoading, error: apiError } = useFetchRecord(recordId)
  const [users, setUsers] = useState<User[]>([])
  const usersRef = useRef<User[]>([])
  const [query, setQuery] = useState<string>('')
  const debouncedQuery = useDebouncedValue(query, 250)

  useEffect(() => {
    if (!apiData) return
    const mapped = mapApiDataToUsers(apiData)
    const assigned = assignRandomRoles(mapped)
    setUsers(assigned)
    usersRef.current = assigned
  }, [apiData])

  useEffect(() => { usersRef.current = users }, [users])

  const filteredUsers = useMemo(() => filterUsers(users, { query: debouncedQuery, activeRole }), [users, debouncedQuery, activeRole])

  const resetFilters = useCallback(() => {
    setQuery('')
    setActiveRole(null)
  }, [])

  const handleEdit = useCallback(async (id: string) => {
    const user = usersRef.current.find((u) => u.id === id)
    if (!user) return

    const newName = window.prompt('Edit user name', user.name)
    if (newName == null) return

    const prevUsers = usersRef.current
    const updatedUsers = prevUsers.map((u) => (u.id === id ? { ...u, name: newName } : u))
    setUsers(updatedUsers)
    usersRef.current = updatedUsers

    try {
      const rid = recordId ?? DEFAULT_RECORD_ID
      const payload = { data: { users: updatedUsers } }
      if (rid) {
        await patchRecord(rid, payload)
      } else {
        await updateRecord(DEFAULT_RECORD_ID, payload)
      }
    } catch (err) {
      console.error('Failed to update record', err)
      setUsers(prevUsers)
      usersRef.current = prevUsers
      alert('Update failed — changes reverted')
    }
  }, [recordId])

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Delete this user?')) return
    const prevUsers = usersRef.current
    const updatedUsers = prevUsers.filter((u) => u.id !== id)
    setUsers(updatedUsers)
    usersRef.current = updatedUsers

    try {
      const rid = recordId ?? DEFAULT_RECORD_ID
      const payload = { data: { users: updatedUsers } }
      if (rid) {
        await patchRecord(rid, payload)
      } else {
        await updateRecord(DEFAULT_RECORD_ID, payload)
      }
    } catch (err) {
      console.error('Failed to delete user', err)
      setUsers(prevUsers)
      usersRef.current = prevUsers
      alert('Delete failed — changes reverted')
    }
  }, [recordId])

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
              <UsersList
                filteredUsers={filteredUsers}
                apiLoading={apiLoading}
                apiError={apiError}
                apiData={apiData}
                debouncedQuery={debouncedQuery}
                activeRole={activeRole}
                resetFilters={resetFilters}
                onEdit={handleEdit}
                onDelete={handleDelete}
                pageSize={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
