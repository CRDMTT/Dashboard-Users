import React, { useState } from 'react'
import '../../assets/styles/components/UserTable.scss'

export type User = {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone?: string
  avatar?: string
  notes?: string
}

type Props = {
  users: User[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id))

  return (
    <div className="user-table__wrap">
      <table className="user-table">
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Posizione lavorativa</th>
            <th>Dipartimento</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const isOpen = openId === u.id
            return (
              <React.Fragment key={u.id}>
                <tr
                  className={`user-row ${isOpen ? 'is-open' : ''}`}
                  tabIndex={0}
                  onClick={() => toggle(u.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggle(u.id)
                    }
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`detail-${u.id}`}
                >
                  <td>
                    <button
                      className="accordion-toggle"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggle(u.id)
                      }}
                      aria-expanded={isOpen}
                      aria-controls={`detail-${u.id}`}
                    >
                      {isOpen ? '▾' : '▸'}
                    </button>
                  </td>
                  <td>{u.name}</td>
                  <td>{u.position}</td>
                  <td>{u.department}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || '—'}</td>
                  <td className="user-table__actions">
                    <button
                      className="btn btn-sm btn-edit"
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit(u.id)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-delete"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(u.id)
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                <tr id={`detail-${u.id}`} className={`user-detail ${isOpen ? 'is-open' : ''}`}>
                  <td className='p-0' colSpan={7}>
                    <div className="user-detail__content">
                      <div className="user-detail__row user-detail__row--avatar">
                        <img className="user-avatar" src={u.avatar || `https://i.pravatar.cc/80?u=${u.email}`} alt={`${u.name} avatar`} />
                      </div>

                      <div className="user-detail__row user-detail__row--info">
                        <p><strong>Posizione:</strong> {u.position}</p>
                        <p><strong>Dipartimento:</strong> {u.department}</p>
                        <p><strong>Email:</strong> {u.email}</p>
                        <p><strong>Telefono:</strong> {u.phone || 'Non disponibile'}</p>
                      </div>

                      <div className="user-detail__row user-detail__row--notes">
                        <p>{u.notes || '—'}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
