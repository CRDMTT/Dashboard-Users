import React from 'react'
import '../../../assets/styles/ui/Select.scss'

type Option = { value: string; label: string }
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  options: Option[]
}

export default function UISelect({ label, options, className = '', ...rest }: SelectProps) {
  return (
    <div className={`select ${className}`.trim()}>
      {label && <label className="select__label">{label}</label>}
      <select className="select__control" {...rest}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
