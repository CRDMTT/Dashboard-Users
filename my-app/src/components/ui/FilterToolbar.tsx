import { UIButton } from './index'

type Props = {
  activeRole: string | null
  toggleRole: (role: string) => void
  roles?: string[]
  className?: string
}

export default function FilterToolbar({ activeRole, toggleRole, roles = ['Admin', 'Editor', 'Viewer'], className }: Props) {
  return (
    <div className={className} role="toolbar" aria-label="Filter by role" style={{ gap: '5px', display: 'flex' }}>
      {roles.map((r) => (
        <UIButton key={r} variant="secondary" aria-pressed={activeRole === r} onClick={() => toggleRole(r)}>{r}</UIButton>
      ))}
    </div>
  )
}
