import { UIInput, UIButton } from '../components/ui'
import { useState } from 'react'
import UserTable from '../components/users/UserTable'

const mockUsers = [
  { id: '1', name: 'Alice Rossi', position: 'Frontend Developer', role: 'Admin', email: 'alice.rossi@example.com', phone: '345-123-4567', avatar: 'https://i.pravatar.cc/80?img=1', notes: 'Lavora sul team principale di UI/UX.' },
  { id: '2', name: 'Bruno Bianchi', position: 'Product Manager', role: 'Editor', email: 'bruno.bianchi@example.com', phone: '345-987-6543', avatar: 'https://i.pravatar.cc/80?img=2', notes: 'Focus su roadmap e comunicazione con stakeholders.' },
  { id: '3', name: 'Carla Verdi', position: 'Designer', role: 'Viewer', email: 'carla.verdi@example.com', avatar: 'https://i.pravatar.cc/80?img=3', notes: 'Specializzata in brand identity e illustrazione.' },
]

export default function Dashboard() {
  const [activeRole, setActiveRole] = useState<string | null>(null)
  const toggleRole = (role: string) => setActiveRole((cur) => (cur === role ? null : role))
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
            <div className="inline-buttons d-flex align-items-center" style={{ gap: '8px' }}>
              <div className='pr-2' style={{ width: 'fit-content' }}>
                <p className="mb-0">Filter by role:</p>
              </div>
              <div className='d-flex' role="toolbar" aria-label="Filter by role" style={{ gap: '5px', overflowX: 'auto' }}>
                <UIButton variant="secondary" aria-pressed={activeRole === 'Admin'} onClick={() => toggleRole('Admin')}>Admin</UIButton>
                <UIButton variant="secondary" aria-pressed={activeRole === 'Editor'} onClick={() => toggleRole('Editor')}>Editor</UIButton>
                <UIButton variant="secondary" aria-pressed={activeRole === 'Viewer'} onClick={() => toggleRole('Viewer')}>Viewer</UIButton>
              </div>
            </div>
          </div>

          <div className="col-12 mt-4">
            <div className="grid-container">
              <UserTable
                users={mockUsers}
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
