/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useCallback } from 'react'
import logo from '@/public/images/favicon.ico'
import UserBar from './UserBar'
import AuthButton from './AuthButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useStore } from 'zustand'
import { useSessionStore } from '@/stores/useSessionStore'

// Define your routes and roles as constants
const ROUTES = {
  FOOD: '/food',
  SHOP: '/shop',
  OWNER: '/owner',
  ADMIN: '/admin',
  ORDER_HISTORY: '/order-history',
  SUPPORT: '/support',
}

const ROLES = {
  CUSTOMER: 'ROLE_CUSTOMER',
  OWNER: 'ROLE_OWNER',
}

const Navbar = () => {
  const router = useRouter()
  const { auth, user } = useStore(useSessionStore)

  const handleRedirect = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router],
  )

  return (
    <nav className="z-10 sticky top-0 bg-white flex items-center justify-evenly navbar border-b-2  border-base-300 h-[75px]">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleRedirect('/')}>
        <img className="scale-90" src={logo.src} alt="logo" />
        <p className="text-4xl font-bold">FoodHub</p>
      </div>
      {/* Display all nav links when the screen width is at least 1024px */}
      <div className="hidden lg:block">
        <Link href={ROUTES.FOOD}>
          <p className="btn btn-ghost text-lg">Đồ ăn</p>
        </Link>
        {/* <Link href={ROUTES.SHOP}>
          <p className="btn btn-ghost text-lg">Shop đồ ăn</p>
        </Link> */}
        {auth && (
          <>
            {user.role === ROLES.CUSTOMER && (
              <>
                <Link href={ROUTES.ORDER_HISTORY}>
                  <p className="btn btn-ghost text-lg">Lịch sử đơn hàng</p>
                </Link>
                <Link href={ROUTES.SUPPORT}>
                  <p className="btn btn-ghost text-lg">Hỗ trợ</p>
                </Link>
              </>
            )}
            {user.role === ROLES.OWNER && (
              <>
                <Link href={ROUTES.OWNER}>
                  <p className="btn btn-ghost text-lg">Quản lý quán</p>
                </Link>
              </>
            )}
          </>
        )}
      </div>
      {/* Display menu button when the screen width is smaller than 1024px */}
      <div className="dropdown dropdown-end lg:hidden">
        <div tabIndex={0} role="button" className="btn m-1">
          Menu
        </div>
        <ul tabIndex={0} className="w-60 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
          <li>
            <Link href={ROUTES.FOOD}>
              <p className="btn btn-ghost text-lg">Đồ ăn</p>
            </Link>
          </li>
          <li>
            <Link href={ROUTES.SHOP}>
              <p className="btn btn-ghost text-lg">Shop đồ ăn</p>
            </Link>
          </li>
          {auth && (
            <>
              {user.role === ROLES.CUSTOMER && (
                <>
                  <li>
                    <Link href={ROUTES.ORDER_HISTORY}>
                      <p className="btn btn-ghost text-lg">Lịch sử đơn hàng</p>
                    </Link>
                  </li>
                  <li>
                    <Link href={ROUTES.SUPPORT}>
                      <p className="btn btn-ghost text-lg">Hỗ trợ</p>
                    </Link>
                  </li>
                </>
              )}
              {user.role === ROLES.OWNER && (
                <>
                  <li>
                    <Link href={ROUTES.OWNER}>
                      <p className="btn btn-ghost text-lg">Quản lý quán</p>
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
      {auth ? <UserBar /> : <AuthButton />}
    </nav>
  )
}

export default Navbar
