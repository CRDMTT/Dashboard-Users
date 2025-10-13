import React, { useState, memo } from 'react'
import '../../assets/styles/components/UserTable.scss'
import { UIAccordionToggle, UIButton, UIHeading } from '../ui'
import type { User } from '../../types/user'

type Props = {
  users: User[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

function UserTable({ users, onEdit, onDelete }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id))

  return (
    <div className="user-table__wrap">
      <table className="user-table" role="table" aria-label="Users table">
        <caption className="visually-hidden">List of users</caption>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Job Title</th>
            <th scope="col">Role</th>
            <th scope="col">Email</th>
            <th scope="col">Telephone</th>
            <th scope="col" className='text-center'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const isOpen = openId === u.id
            return (
              <React.Fragment key={u.id}>
                <tr
                  className={`user-row ${isOpen ? 'is-open' : ''}`}
                  onClick={() => toggle(u.id)}
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
                      aria-label={isOpen ? `Collapse ${u.name}` : `Expand ${u.name}`}
                    />
                  </td>
                  <td className="user-cell user-cell--name">
                    <div className="user-main">
                      <img
                        className="user-avatar user-avatar--inline"
                        src={u.avatar || `https://i.pravatar.cc/80?u=${u.email}`}
                        alt={`${u.name} avatar`}
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="user-name">{u.name}</span>
                    </div>
                  </td>
                  <td><span className="user-jobTitle">{u.jobTitle}</span></td>
                  <td><span className="user-role">{u.role}</span></td>
                  <td><span className="user-email">{u.email}</span></td>
                  <td><span className="user-phone">{u.phone || '—'}</span></td>
                  <td className="user-row__actions justify-content-center">
                    <div className="wrapper">
                      <UIButton
                        variant="edit"
                        aria-label={`Edit ${u.name}`}
                        title={`Edit ${u.name}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onEdit(u.id)
                        }}
                      />
                      <UIButton
                        variant="delete"
                        aria-label={`Delete ${u.name}`}
                        title={`Delete ${u.name}`}
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
                    <div className="container-fluid">
                      <div className="row user-detail__content">
                        <div className="col-5 offset-1 user-detail__row user-detail__row--info">
                          <UIHeading level={3}>Personal Information</UIHeading>
                          <div className="row">
                            <div className="col-6">
                              <p><strong>Gender:</strong> <span className="user-gender">{u.gender}</span></p>
                              <p><strong>Country:</strong> <span className="user-country">{u.country}, {u.countryCode}</span></p>
                              <p><strong>City:</strong> <span className="user-city">{u.location}</span></p>
                              <p><strong>Address:</strong> <span className="user-address">{u.streetAddress}</span></p>
                              <p><strong>IBAN:</strong> <span className="user-iban">{u.iban}</span></p>
                            </div>

                            <div className="col-6">
                              <p><strong>Postal Code:</strong> <span className="user-ip">{u.postalCode}</span></p>
                              <p><strong>Time Zone:</strong> <span className="user-timezone">{u.timeZone}</span></p>
                              <p><strong>Language:</strong> <span className="user-language">{u.language}</span></p>
                            </div>
                          </div>
                        </div>

                        <div className="col-6 user-detail__row user-detail__row">
                          <UIHeading level={3}>Professional Information</UIHeading>
                          <div className='row'>
                            <div className="col-6">
                              <p><strong>Username:</strong> <span className="user-username">{u.username}</span></p>
                              <p><strong>Company:</strong> <span className="user-company">{u.companyName}</span></p>
                              <p><strong>Department:</strong> <span className="user-department">{u.department}</span></p>
                              <p><strong>Job Title:</strong> <span className="user-jobTitle">{u.jobTitle}</span></p>
                            </div>

                            <div className="col-6">
                              <p><strong>Role:</strong> <span className="user-role">{u.role}</span></p>
                              <p><strong>IP Address:</strong> <span className="user-ip">{u.ipAddress}</span></p>
                            </div>
                          </div>
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

export default memo(UserTable)
