import React from 'react'
import '../../../assets/styles/ui/Button.scss'
import { EditIcon, TrashIcon, ThemeIcon } from '../svg'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'edit'
    | 'delete'
    | 'theme'
  iconTheme?: 'light' | 'dark'
}

export default function Button({ variant = 'primary', className = '', children, iconTheme, ...rest }: ButtonProps) {
  let cls = ''
  if (variant === 'edit') {
    cls = `btn btn-secondary btn-secondary--edit ${className}`.trim()
  } else if (variant === 'delete') {
    cls = `btn btn-secondary btn-secondary--delete ${className}`.trim()
  } else if (variant === 'theme') {
    cls = `btn btn-theme ${className}`.trim()
  } else {
    cls = `btn btn-${variant} ${className}`.trim()
  }

  const renderIcon = () => {
    if (variant === 'edit') return <EditIcon />
    if (variant === 'delete') return <TrashIcon />
    if (variant === 'theme') return <ThemeIcon theme={iconTheme || 'light'} />
    return null
  }

  return (
    <button className={cls} {...rest}>
      {renderIcon()}
      {children}
    </button>
  )
}
