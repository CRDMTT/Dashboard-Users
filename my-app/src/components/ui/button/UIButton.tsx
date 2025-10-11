import React from 'react'
import '../../../assets/styles/ui/Button.scss'
import EditIcon from '../svg/EditIcon'
import TrashIcon from '../svg/TrashIcon'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'success'
    | 'default'
    | 'edit'
    | 'delete'
}

export default function Button({ variant = 'default', className = '', children, ...rest }: ButtonProps) {
  let cls = ''
  if (variant === 'edit') {
    cls = `btn btn-secondary btn-secondary--edit ${className}`.trim()
  } else if (variant === 'delete') {
    cls = `btn btn-secondary btn-secondary--delete ${className}`.trim()
  } else {
    cls = `btn btn--${variant} ${className}`.trim()
  }

  const renderIcon = () => {
    if (variant === 'edit') return <EditIcon />
    if (variant === 'delete') return <TrashIcon />
    return null
  }

  return (
    <button className={cls} {...rest}>
      {renderIcon()}
      {children}
    </button>
  )
}
