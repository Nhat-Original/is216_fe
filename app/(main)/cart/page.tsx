import RouteBreadcrumb from '@/components/RouteBreadcrumb'
import React from 'react'
import Table from './components/Table'
import PaymentPanel from './components/PaymentPanel'

const CartPage = () => {
  return (
    <div>
      <RouteBreadcrumb />
      <div className="flex flex-col sm:flex-row sm:justify-center gap-10">
        <Table />
        <PaymentPanel />
      </div>
    </div>
  )
}

export default CartPage
