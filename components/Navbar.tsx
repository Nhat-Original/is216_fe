/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React from 'react'
import logo from '@/public/images/favicon.ico'
import UserBar from './UserBar'

import { useStore } from 'zustand'
import { useSessionStore } from '@/stores/useSessionStore'
import AuthButton from './AuthButton'
import { redirect } from 'next/navigation'
const Navbar = () => {
  const { login, auth } = useStore(useSessionStore)
  React.useEffect(() => {
    console.log('login')
    login()
  }, [login])

  return (
    <nav className="z-10 sticky top-0 bg-white flex items-center justify-evenly navbar border-b-2  border-base-300 h-[75px]">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => {
          redirect('/')
        }}
      >
        <img className="scale-90" src={logo.src} alt="logo" />
        <p className="text-4xl font-bold">FoodHub</p>
      </div>
      <div className="">
        <a className="btn btn-ghost text-lg">Đồ ăn</a>
      </div>
      <div className="">
        <a className="btn btn-ghost text-lg">Shop đồ ăn</a>
      </div>
      <div className="">
        <a className="btn btn-ghost text-lg">Hỗ trợ</a>
      </div>
      {auth ? <UserBar /> : <AuthButton />}
    </nav>
  )
}

export default Navbar
