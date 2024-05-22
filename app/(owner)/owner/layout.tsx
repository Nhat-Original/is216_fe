import { ReactNode } from 'react'
type LayoutProps = {
  children: ReactNode
}

const OwnerLayout = ({ children }: LayoutProps) => {
  return children
}
export default OwnerLayout
