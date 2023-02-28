import React from 'react'
import { ParentComponent } from '../../types/Props'


interface ButtonProps extends ParentComponent{
  onClick? : () => void,
  disabled?: boolean,
  type?: "submit"
}

const Button = ({className, children, onClick, disabled, type}:ButtonProps) => {
  return (
    <button className={["bg-gradient-to-r from-button-grad1 to-button-grad2  border border-transparent text-white rounded-lg hover:border-orange hover:from-transparent hover:to-transparent hover:text-black ",className].join(" ")} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  )
}

export default Button