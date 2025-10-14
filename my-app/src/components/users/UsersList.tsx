import { UIButton, Pagination } from '../ui'
import UserTable from './UserTable'
import { useUsersList } from '../../utils/useUsersList'
import type { User } from '../../types/user'

type Props = {
  filteredUsers: User[]
  apiLoading: boolean
  apiError: any
  apiData: any
  debouncedQuery: string
  activeRole: string | null
  resetFilters: () => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  pageSize?: number
}

export default function UsersList({ filteredUsers, apiLoading, apiError, apiData, debouncedQuery, activeRole, resetFilters, onEdit, onDelete, pageSize }: Props) {
  const {
  page,
    totalPages,
    startIndex,
    endIndex,
    currentItems: pagedUsers,
    isDisplayingSpinner,
    goNext,
    goPrev,
  } = useUsersList({ items: filteredUsers, pageSize: pageSize ?? 10, loading: apiLoading, hasApiData: apiData != null, resetKeys: [debouncedQuery, activeRole, filteredUsers.length] })

  if (isDisplayingSpinner) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status" aria-hidden="true"></div>
        <div className="mt-2">Loading users…</div>
      </div>
    )
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="pb-4">
        <div className="alert alert-info" role="status">
          {apiError ? (
            <div>
              <strong>API Error:</strong> {apiError.message} (status: {apiError.status ?? 'unknown'})
            </div>
          ) : (
            <div>
              <strong>Invalid search</strong>
              <div className="mt-2 small text-muted">No results found for the applied search or filters.</div>
              {debouncedQuery ? <div className="mt-1 small text-muted">Query: <code>{debouncedQuery}</code></div> : null}
              {activeRole ? <div className="mt-1 small text-muted">Role filter: <code>{activeRole}</code></div> : null}
              <div className="mt-3">
                <UIButton variant="secondary" onClick={resetFilters}>Reset filters</UIButton>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
        <UserTable users={pagedUsers} onEdit={onEdit} onDelete={onDelete} />
        <Pagination page={page} totalPages={totalPages} startIndex={startIndex} endIndex={endIndex} total={filteredUsers.length} onNext={goNext} onPrev={goPrev} />
    </>
  )
}
