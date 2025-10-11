import React from 'react'
import { ArrowIcon } from '../svg'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isOpen?: boolean
}

export default function UIAccordionToggle({ isOpen = false, className = '', children, ...rest }: Props) {
  const cls = `accordion-toggle ${className}`.trim()
  return (
    <button className={cls} {...rest}>
      <ArrowIcon className={`accordion-icon ${isOpen ? 'is-open' : ''}`} />
      {children}
    </button>
  )
}
