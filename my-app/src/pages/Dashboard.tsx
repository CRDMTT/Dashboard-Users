import { UIInput, UIButton } from '../components/ui'
import { useEffect, useRef, useState } from 'react'
import { useFetchRecord } from '../api/apiClient'
import { assignRandomRoles, mapApiDataToUsers, useSearch, useUserActions } from '../utils'
import type { User } from '../types/user'
import UsersList from '../components/users/UsersList'

type Props = { recordId?: string | null; pageSize?: number }

export default function Dashboard({ recordId }: Props) {
  const { data: apiData, loading: apiLoading, error: apiError } = useFetchRecord(recordId)
  const [users, setUsers] = useState<User[]>([])
  const usersRef = useRef<User[]>([])

  useEffect(() => {
    if (!apiData) return
    const mapped = mapApiDataToUsers(apiData)
    const assigned = assignRandomRoles(mapped)
    setUsers(assigned)
    usersRef.current = assigned
  }, [apiData])

  useEffect(() => { usersRef.current = users }, [users])
  const { query, setQuery, debouncedQuery, activeRole, toggleRole, resetFilters, filteredUsers } = useSearch(users)
  const { handleEdit, handleDelete } = useUserActions({ usersRef, setUsers, recordId })

  return (
    <div className="section">
      <div className="container-fluid container-lg">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="searchbox mb-3 mb-lg-0">
              <UIInput placeholder="Search user" variant="search" name="search" type="search" aria-label="Search users" value={query} onChange={(e) => setQuery((e.target as HTMLInputElement).value)} />
            </div>
          </div>
          <div className="col-12 col-md-7">
            <div className="inline-buttons d-flex align-items-center" style={{ gap: '10px' }}>
              <div className='pr-2' style={{ width: 'fit-content' }}><p className="mb-0">Filter by role:</p></div>
              <div className='d-flex' role="toolbar" aria-label="Filter by role" style={{ gap: '5px' }}>
                <UIButton variant="secondary" aria-pressed={activeRole === 'Admin'} onClick={() => toggleRole('Admin')}>Admin</UIButton>
                <UIButton variant="secondary" aria-pressed={activeRole === 'Editor'} onClick={() => toggleRole('Editor')}>Editor</UIButton>
                <UIButton variant="secondary" aria-pressed={activeRole === 'Viewer'} onClick={() => toggleRole('Viewer')}>Viewer</UIButton>
              </div>
            </div>
          </div>

          <div className="col-12 mt-4">
            <div className="grid-container">
              <UsersList filteredUsers={filteredUsers} apiLoading={apiLoading} apiError={apiError} apiData={apiData} debouncedQuery={debouncedQuery} activeRole={activeRole} resetFilters={resetFilters} onEdit={handleEdit} onDelete={handleDelete} pageSize={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
