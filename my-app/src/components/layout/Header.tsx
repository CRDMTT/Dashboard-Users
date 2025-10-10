import { useEffect, useState } from 'react'
import '../../assets/styles/components/Header.scss'
import { UIHeading, UIButton, ThemeIcon } from '../ui'

export default function Header() {
   const [theme, setTheme] = useState<'light' | 'dark'>(() => {
      if (typeof window === 'undefined') return 'light'
      const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (stored) return stored
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
   })

   useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
   }, [theme])

   const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

   return (
      <header className="header">
         <div className="container">
            <div className="row">
               <div className="col-11">
                  <div className="header_content p-4">
                     <UIHeading className='header_title mb-0' level={1}>Users Dashboard</UIHeading>
                  </div>
               </div>
               <div className="col-1 d-flex align-items-center justify-content-center">
                  <UIButton
                     variant="primary"
                     className="theme-toggle"
                     aria-label="Toggle color theme"
                     onClick={toggle}
                     title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
                  >
                     <ThemeIcon theme={theme} />
                  </UIButton>
               </div>
            </div>
         </div>
      </header>

   )

}
