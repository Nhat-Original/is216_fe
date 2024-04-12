import React from 'react'

const RouteBreadcrumb = ({ route }: { route: string }) => {
  const routeElements = route.split('/').filter((el) => el !== '')
  return (
    <div className="h-fit w-screen p-2">
      <span>Home</span>
      <span className="text-2xl font-bold">{' > '}</span>
      {routeElements.map((el) => (
        <>
          <span>{el}</span>
          <span className="text-2xl font-bold">{' > '}</span>
        </>
      ))}
    </div>
  )
}

export default RouteBreadcrumb
