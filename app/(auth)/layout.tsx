import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

const AuthLayout = ({ children }: LayoutProps) => {
  return <main className="min-h-[calc(100vh-301px)]">{children}</main>
}

export default AuthLayout
