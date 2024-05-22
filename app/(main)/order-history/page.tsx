import React from 'react'
import RouteBreadcrumb from '@/components/RouteBreadcrumb'
import Table from './components/Table'

const OrderHistoryPage = () => {
  return (
    <div>
      <RouteBreadcrumb />
      <div className="flex justify-center">
        <Table />
      </div>
    </div>
  )
}

export default OrderHistoryPage
