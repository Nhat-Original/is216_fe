'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

const RouteBreadcrumb = () => {
  const path = usePathname()
  const routeElements = path.split('/').filter((el) => el !== '')
  return (
    <div className="h-fit w-screen p-2 flex items-center">
      <div>
        <span>HOME</span>
        <span className="text-2xl text-primary font-bold">{' > '}</span>
      </div>
      {routeElements.map((el) => (
        <div key={el}>
          <span className="uppercase">{el}</span>
          <span className="text-2xl text-primary font-bold">{' > '}</span>
        </div>
      ))}
    </div>
  )
}

export default RouteBreadcrumb
