import React from 'react'
import '../../../assets/styles/ui/Button.scss'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'default';
}

export default function Button({ variant = 'default', className = '', children, ...rest }: ButtonProps) {
  const cls = `btn btn--${variant} ${className}`.trim()
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
