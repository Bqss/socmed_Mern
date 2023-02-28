import React from 'react'
import { ParentComponent } from '../types/Props'

const MainContent = ({children, className}:ParentComponent) => {
  return (
    <div className={'flex-1 '+className}>
      {children}
    </div>
  )
}

export default MainContent