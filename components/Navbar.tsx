/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React from 'react'
import logo from '@/public/images/favicon.ico'
import UserBar from './UserBar'

import { useStore } from 'zustand'
import { useSessionStore } from '@/stores/useSessionStore'
import AuthButton from './AuthButton'
import Link from 'next/link'
const Navbar = () => {
  const { login, auth } = useStore(useSessionStore)
  React.useEffect(() => {
    console.log('login')
    login()
  }, [login])

  return (
    <nav className="z-10 sticky top-0 bg-white flex items-center justify-evenly navbar border-b-2  border-base-300 h-[75px]">
      <Link href="/">
        <div className="flex items-center gap-4 cursor-pointer">
          <img className="scale-90" src={logo.src} alt="logo" />
          <p className="text-4xl font-bold">FoodHub</p>
        </div>
      </Link>
      {auth && (
        <>
          <div className="hidden lg:block">
            <Link href="/food">
              <p className="btn btn-ghost text-lg">Đồ ăn</p>
            </Link>
            <Link href="/shop">
              <p className="btn btn-ghost text-lg">Shop đồ ăn</p>
            </Link>
            <Link href="/order-history">
              <p className="btn btn-ghost text-lg">Lịch sử đơn hàng</p>
            </Link>
            <Link href="/support">
              <p className="btn btn-ghost text-lg">Hỗ trợ</p>
            </Link>
          </div>

          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn m-1">
              Menu
            </div>
            <ul tabIndex={0} className="w-60 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
              <li>
                <Link href="/food">Đồ ăn</Link>
              </li>
              <li>
                <Link href="/shop">Shop đồ ăn</Link>
              </li>
              <li>
                <Link href="/order-history">Lịch sử đơn hàng</Link>
              </li>
              <li>
                <Link href="/support">Hỗ trợ</Link>
              </li>
            </ul>
          </div>
        </>
      )}
      {auth ? <UserBar /> : <AuthButton />}
    </nav>
  )
}

export default Navbar
