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
  const { auth } = useStore(useSessionStore)

  return (
    <nav className="z-10 sticky top-0 bg-white flex items-center justify-evenly navbar border-b-2  border-base-300 h-[75px]">
      <Link href="/">
        <img className="scale-90" src={logo.src} alt="logo" />
        <p className="text-4xl font-bold">FoodHub</p>
      </Link>
      <Link href="/food">
        <p className="btn btn-ghost text-lg">Đồ ăn</p>
      </Link>
      <Link href="/shop">
        <p className="btn btn-ghost text-lg">Shop đồ ăn</p>
      </Link>
      <Link href="/support">
        <p className="btn btn-ghost text-lg">Hỗ trợ</p>
      </Link>
      {auth ? <UserBar /> : <AuthButton />}
    </nav>
  )
}

export default Navbar
