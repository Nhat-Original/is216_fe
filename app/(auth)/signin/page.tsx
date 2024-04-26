import React from 'react'
import SigninForm from './components/SigninForm'
import Link from 'next/link'

const SigninPage = (): JSX.Element => {
  return (
    <div className="relative flex flex-col justify-center overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-primary">Đăng nhập</h1>
        <SigninForm />
        <span>
          Đăng ký ?&nbsp;
          <Link href={'/signup'} className="text-blue-600 hover:text-blue-800 hover:underline">
            Đăng ký
          </Link>
        </span>
      </div>
    </div>
  )
}

export default SigninPage
