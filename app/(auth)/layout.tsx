import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="flex flex-col">
        <main className="min-h-[calc(100vh-75px)]">{children}</main>
      </div>
    </>
  )
}

export default AuthLayout
