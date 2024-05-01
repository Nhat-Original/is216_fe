import React from 'react'
import FoodDetail from './components/FoodDetail'
import RouteBreadcrumb from '@/components/RouteBreadcrumb'
import LatestReviews from './components/LatestReviews'
import Seperator from '@/components/Seperator'
import ReviewForm from './components/ReviewForm'

const FoodDetailPage = () => {
  return (
    <>
      <RouteBreadcrumb />
      <FoodDetail />
      <Seperator />
      <LatestReviews />
      <Seperator />
      <ReviewForm />
    </>
  )
}

export default FoodDetailPage
