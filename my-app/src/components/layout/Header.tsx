import { useEffect, useState } from 'react'
import '../../assets/styles/components/Header.scss'
import { UIHeading, UIButton } from '../ui'

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
               <div className="col-12">
                  <div className="header-wrapper d-flex align-items-center justify-content-between">
                     <div className="header_content">
                        <UIHeading className='header_title mb-0' level={1}>Users Dashboard</UIHeading>
                     </div>

                     <UIButton
                        variant="theme"
                        className="theme-toggle"
                        aria-label="Toggle color theme"
                        role="switch"
                        aria-checked={theme === 'dark'}
                        onClick={toggle}
                        title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
                        iconTheme={theme}
                     />
                  </div>
               </div>
            </div>
         </div>
      </header>

   )

}
