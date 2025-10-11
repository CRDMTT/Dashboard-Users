import React, { useState } from 'react'
import '../../assets/styles/components/UserTable.scss'
import { UIAccordionToggle, UIButton } from '../ui'

export type User = {
  id: string
  name: string
  position: string
  role: string
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
            <th>Name</th>
            <th>Job Title</th>
            <th>Role</th>
            <th>Email</th>
            <th>Telephone</th>
            <th className='text-center'>Edit</th>
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
                    <UIAccordionToggle
                      isOpen={isOpen}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggle(u.id)
                      }}
                      aria-expanded={isOpen}
                      aria-controls={`detail-${u.id}`}
                    />
                  </td>
                  <td className="user-cell user-cell--name">
                    <div className="user-main">
                      <img
                        className="user-avatar user-avatar--inline"
                        src={u.avatar || `https://i.pravatar.cc/80?u=${u.email}`}
                        alt={`${u.name} avatar`}
                      />
                      <span className="user-name">{u.name}</span>
                    </div>
                  </td>
                  <td>{u.position}</td>
                  <td>{u.role}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || '—'}</td>
                  <td className="user-table__actions justify-content-center">
                    <div className="wrapper">
                      <UIButton
                        variant="edit"
                        onClick={(e) => {
                          e.stopPropagation()
                          onEdit(u.id)
                        }}
                      />
                      <UIButton
                        variant="delete"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(u.id)
                        }}
                      />
                    </div>
                  </td>
                </tr>

                <tr id={`detail-${u.id}`} className={`user-detail ${isOpen ? 'is-open' : ''}`}>
                  <td className='p-0' colSpan={7}>
                    <div className="container">
                      <div className="row user-detail__content">
                          <div className="col-3 offset-2 user-detail__row user-detail__row--info">
                          <p><strong>Posizione:</strong> {u.position}</p>
                          <p><strong>Role:</strong> {u.role}</p>
                          <p><strong>Email:</strong> {u.email}</p>
                          <p><strong>Telefono:</strong> {u.phone || 'Non disponibile'}</p>
                        </div>

                          <div className="col-3 user-detail__row user-detail__row--notes">
                          <p>{u.notes || '—'}</p>
                        </div>
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
