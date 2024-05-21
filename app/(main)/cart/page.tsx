import RouteBreadcrumb from '@/components/RouteBreadcrumb'
import React from 'react'
import Table from './components/Table'
import PaymentPanel from './components/PaymentPanel'
import PaymentModal from './components/PaymentModal'

const CartPage = () => {
  return (
    <div>
      <RouteBreadcrumb />
      <div className="flex flex-col md:flex-row sm:justify-center gap-10">
        <Table />
        <PaymentPanel />
        <PaymentModal />
      </div>
    </div>
  )
}

export default CartPage
