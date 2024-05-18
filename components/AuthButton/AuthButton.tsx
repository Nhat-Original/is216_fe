'use client'
import { usePathname } from 'next/navigation'
import { SignUpIcon } from './SignUpIcon'
import { SignInIcon } from './SignInIcon'
const AuthButton = () => {
  const pathname = usePathname()
  if (pathname === '/signin') {
    return <SignInIcon />
  }
  if (pathname === '/signup') {
    return <SignUpIcon />
  }
  return (
    <div>
      <div className="">
        <a className="btn btn-ghost text-lg" href="/signin">
          Đăng nhập
        </a>
      </div>
      <div className="">
        <a className="btn btn-ghost text-lg" href="/signup">
          Đăng ký
        </a>
      </div>
    </div>
  )
}
export default AuthButton
