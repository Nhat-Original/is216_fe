import React from 'react'
import logo from '@/public/images/favicon.ico'

const Navbar = () => {
  return (
    <nav className="z-10 h-[100px] w-screen sticky top-0 bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <img className="scale-90" src={logo.src} alt="logo" />
        <p className="text-4xl font-bold">FoodHub</p>
      </div>
      <div></div>
      <div></div>
    </nav>
  )
}

export default Navbar
