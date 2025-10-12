import { UIInput, UIButton } from '../components/ui'
import { useState, useEffect } from 'react'
import UserTable from '../components/users/UserTable'
import type { User } from '../components/users/UserTable'
import { useFetchRecord } from '../api/apiClient'
import assignRandomRoles from '../utils/assignRandomRoles'

const mockUsers = [
  { id: '1', name: 'Alice Rossi', position: 'Frontend Developer', role: 'Admin', email: 'alice.rossi@example.com', phone: '345-123-4567', avatar: 'https://i.pravatar.cc/80?img=1', notes: 'Lavora sul team principale di UI/UX.' },
  { id: '2', name: 'Bruno Bianchi', position: 'Product Manager', role: 'Editor', email: 'bruno.bianchi@example.com', phone: '345-987-6543', avatar: 'https://i.pravatar.cc/80?img=2', notes: 'Focus su roadmap e comunicazione con stakeholders.' },
  { id: '3', name: 'Carla Verdi', position: 'Designer', role: 'Viewer', email: 'carla.verdi@example.com', avatar: 'https://i.pravatar.cc/80?img=3', notes: 'Specializzata in brand identity e illustrazione.' },
]

export default function Dashboard() {
  const [activeRole, setActiveRole] = useState<string | null>(null)
  const toggleRole = (role: string) => setActiveRole((cur) => (cur === role ? null : role))
  const RECORD_ID = '329ea9fe-6f08-4f58-9220-ad9cbe86fe64'
  const { data: apiData } = useFetchRecord(RECORD_ID)
  const [users, setUsers] = useState<User[]>(() => mockUsers)

  function mapApiDataToUsers(apiData: any): User[] {
    if (!apiData) return []
    let items: any[] = []
    if (Array.isArray(apiData)) items = apiData
    else if (apiData.data && Array.isArray(apiData.data)) items = apiData.data
    else if (apiData.records && Array.isArray(apiData.records)) items = apiData.records
    else if (apiData.items && Array.isArray(apiData.items)) items = apiData.items
    else items = [apiData]

    return items.map((r: any, idx: number) => {
      const id = String(r.id ?? r.uuid ?? r._id ?? r.recordId ?? `${idx}-${Date.now()}`)
      const first = r.first_name || r.firstname || r.firstName
      const last = r.last_name || r.lastname || r.lastName
      const name = (first || last) ? `${(first || '').trim()} ${(last || '').trim()}`.trim() : (r.name || r.fullName || r.title || r.username || 'API User')
      const position = r.job_title || r.jobTitle || r.position || r.job || r.title || '-'
      const role = r.role || r.userRole || undefined
      const email = r.email || r.contact?.email || ''
      const phone = r.telephone || r.phone || r.contact?.phone || ''
      const avatar = r.avatar || r.picture || r.image || ''
      const omitKeys = new Set([
        'id', 'uuid', '_id', 'recordId',
        'name', 'fullName', 'title', 'username',
        'position', 'job', 'job_title', 'jobTitle',
        'role', 'userRole',
        'email', 'phone', 'telephone',
        'avatar', 'picture', 'image',
        'notes', 'description', 'first_name', 'last_name', 'firstName', 'lastName', 'firstname', 'lastname',
        'gender', 'ip_address', 'ip'
      ])
      
      const remaining: Record<string, any> = {}
      Object.keys(r || {}).forEach((k) => {
        if (!omitKeys.has(k)) remaining[k] = r[k]
      })

      const aux: string[] = []
      if (r.gender) aux.push(`Gender: ${r.gender}`)
      if (r.ip_address) aux.push(`IP: ${r.ip_address}`)
      const remainingNotes = Object.keys(remaining).length ? JSON.stringify(remaining, null, 2) : ''
      const notes = r.notes || r.description || ([...aux, remainingNotes].filter(Boolean).join('\n'))

      return {
        id: String(id),
        name,
        position,
        role,
        email,
        phone,
        avatar,
        notes,
      } as User
    })
  }

  useEffect(() => {
    if (!apiData) return
    const mapped = mapApiDataToUsers(apiData)
    if (mapped.length) setUsers(assignRandomRoles(mapped))
  }, [apiData])

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="searchbox mb-3 mb-lg-0">
              <UIInput
                placeholder="Search user"
                variant="search"
                name="search"
                type="search"
                aria-label="Search users"
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


              <UserTable
                users={users}
                onEdit={(id) => alert(`Edit ${id}`)}
                onDelete={(id) => alert(`Delete ${id}`)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
