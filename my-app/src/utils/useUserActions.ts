import { useCallback } from 'react'
import { patchRecord, updateRecord } from '../api/apiClient'
import { DEFAULT_RECORD_ID } from '../api/config'
import type { User } from '../types/user'

type UseUserActionsArgs = {
  usersRef: { current: User[] }
  setUsers: (u: User[]) => void
  recordId?: string | null
}

export default function useUserActions({ usersRef, setUsers, recordId }: UseUserActionsArgs) {
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
  }, [recordId, setUsers, usersRef])

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
  }, [recordId, setUsers, usersRef])

  return { handleEdit, handleDelete }
}
