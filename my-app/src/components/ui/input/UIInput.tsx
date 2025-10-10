import React from 'react'
import '../../../assets/styles/ui/Input.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string | null
}

export default function UIInput({ label, error = null, className = '', ...rest }: InputProps) {
  return (
    <div className={`input ${className}`.trim()}>
      {label && <label className="input__label">{label}</label>}
      <input className="input__control" {...rest} />
      {error && <div className="input__error">{error}</div>}
    </div>
  )
}
