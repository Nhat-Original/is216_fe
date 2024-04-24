import React from 'react'
import CreateForm from '@/components/signup/create-form'
import Link from 'next/link'
const SignupPage = () => {
  return (
    <div className="relative flex flex-col justify-center overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-primary">Đăng ký</h1>
        <CreateForm />
        <span>
          Đã có tài khoản ?&nbsp;
          <Link href={'/signin'} className="text-blue-600 hover:text-blue-800 hover:underline">
            Đăng nhập
          </Link>
        </span>
      </div>
    </div>
  )
}

export default SignupPage
