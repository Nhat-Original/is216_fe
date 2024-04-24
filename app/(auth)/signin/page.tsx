import React from 'react'
import CreateForm from '@/components/signin/create-form'
const SigninPage = (): JSX.Element => {
  return (
    <div className="relative flex flex-col justify-center overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-primary">Đăng nhập</h1>
        <CreateForm />
      </div>
    </div>
  )
}

export default SigninPage
