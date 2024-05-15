import React from 'react'
import FoodDetail from './components/FoodDetail'
import RouteBreadcrumb from '@/components/RouteBreadcrumb'
import LatestReviews from './components/LatestReviews'
import Seperator from '@/components/Seperator'
import ReviewForm from './components/ReviewForm'
import DataProvider from './components/DataProvider'

const FoodDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <DataProvider id={params.id}>
      <RouteBreadcrumb />
      <FoodDetail />
      <Seperator />
      <LatestReviews />
      <Seperator />
      <ReviewForm />
    </DataProvider>
  )
}

export default FoodDetailPage
