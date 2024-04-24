import React from 'react'
import FunctionBar from './components/FunctionBar'
import RouteBreadcrumb from '@/components/routeBreadcrumb'
import Gallery from './components/Gallery'
import Pagnition from './components/Pagnition'

const FoodPage = () => {
  return (
    <div>
      <RouteBreadcrumb />
      <FunctionBar />
      <Gallery />
      <Pagnition />
    </div>
  )
}

export default FoodPage
