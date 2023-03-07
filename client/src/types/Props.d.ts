export interface ParentComponent{
  children?: React.ReactNode,
  className?: string
}

export interface ModalComponent extends ParentComponent{
  isOpen: boolean,
  onClose: () => void
}





