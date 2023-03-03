import React from 'react'
import { ParentComponent } from '../types/Props'



const Sidebar = ({children, className}:ParentComponent) => {
  return (
    <div className={['basis-80 flex-shrink',className].join(" ")}>
      {children}
    </div>
  )
}

export default Sidebar