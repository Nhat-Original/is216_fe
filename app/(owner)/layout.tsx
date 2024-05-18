import { ReactNode } from 'react'
type LayoutProps = {
  children: ReactNode
}

const BaseLayout = ({ children }: LayoutProps) => {
  return children
}
export default BaseLayout
