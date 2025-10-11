import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isOpen?: boolean
}

export default function UIAccordionToggle({ isOpen = false, className = '', children, ...rest }: Props) {
  const cls = `accordion-toggle ${className}`.trim()
  return (
    <button className={cls} {...rest}>
      <svg
        className={`accordion-icon ${isOpen ? 'is-open' : ''}`}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </button>
  )
}
