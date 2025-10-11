import React from 'react'

type Props = React.SVGProps<SVGSVGElement> & {
  className?: string
}

export default function ArrowIcon({ className = '', ...rest }: Props) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M6 9l6 6 6-6" stroke="var(--svg-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
