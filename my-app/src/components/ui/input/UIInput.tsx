import React from 'react'
import '../../../assets/styles/ui/Input.scss'
import { SearchIcon } from '../svg'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string | null
  variant?: 'default' | 'search'
}

export default function UIInput({ label, error = null, className = '', id, name, variant = 'default', ...rest }: InputProps) {
  // prefer provided id, otherwise generate one for accessibility
  const generatedId = React.useId()
  const inputId = (id as string) || (name as string) || generatedId

  return (
    <div className={`input-box ${className}`.trim()}>
      {label && (
        <label className="input__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={`input__wrapper ${variant === 'search' ? 'input--search' : ''}`.trim()}>
        {variant === 'search' && (
          <span className="input__icon">
            <SearchIcon className="icon-search" />
          </span>
        )}
        <input
          id={inputId}
          name={name}
          className={`input input__control ${variant === 'search' ? 'input__control--with-icon' : ''}`}
          {...(rest as any)}
        />
      </div>
      {error && <div className="input input__error">{error}</div>}
    </div>
  )
}
