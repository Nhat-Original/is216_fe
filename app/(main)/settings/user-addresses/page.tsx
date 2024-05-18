import React from 'react'

import Table from './components/Table'
import CreateModal from './components/CreateModal'
import RouteBreadcrumb from '@/components/RouteBreadcrumb'

const UserAdressesPage = () => {
  return (
    <div>
      <RouteBreadcrumb />
      <div className="flex justify-center">
        <div>
          <CreateModal />
          <Table />
        </div>
      </div>
    </div>
  )
}

export default UserAdressesPage
