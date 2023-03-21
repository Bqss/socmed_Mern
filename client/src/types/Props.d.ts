import { ComponentType } from "react"

export interface ParentComponent{
  children?: React.ReactNode,
  className?: string
}

export interface ModalComponent extends ParentComponent{
  isOpen: boolean,
  onClose: () => void
}

export interface ButtonProps extends ParentComponent{
  onClick? : (ev: React.MouseEvent) => void,
  disabled?: boolean,
  classNames? : {
    disabled? : string,
    base? : string
  },  
  children? : React.ReactNode
  disableWhenLoading?: boolean,
  loading?: boolean ,
  LoadingIcon? : React.ReactElement,
  styleType? : "btn1"|"btn2"
  type?: "submit",
  [key: string]: any
}





