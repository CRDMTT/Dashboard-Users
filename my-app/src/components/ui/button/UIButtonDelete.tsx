import React from 'react'
import '../../../assets/styles/ui/Button.scss'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string
}

export default function UIButtonDelete({ title = 'delete', className = '', children, ...rest }: Props) {
  const cls = `btn btn-secondary btn-secondary--delete ${className}`.trim()
  return (
    <button className={cls} {...rest} aria-label={title}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {children}
    </button>
  )
}
