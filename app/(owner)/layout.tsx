import { ReactNode } from 'react'
type LayoutProps = {
  children: ReactNode
}
const BaseLayout = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}
export default BaseLayout
