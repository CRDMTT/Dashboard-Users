type Props = { theme: 'light' | 'dark' }

export default function ThemeIcon({ theme }: Props) {
  return (
    <svg
      className={`theme-icon ${theme === 'dark' ? 'is-dark' : 'is-light'}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Sun */}
      <g className="icon-sun" stroke="#fff" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" fill="#fff" />
        <g>
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </g>

      {/* Moon */}
      <g className="icon-moon" fill="#121212" transform="translate(0,0)">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </g>
    </svg>
  )
}
